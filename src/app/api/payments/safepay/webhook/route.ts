import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const webhookSecret = process.env.SAFEPAY_WEBHOOK_SECRET;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!webhookSecret || !supabaseUrl || !serviceRoleKey) {
      console.error("Safepay webhook configuration is incomplete.");
      return NextResponse.json(
        { error: "Webhook configuration is incomplete." },
        { status: 500 },
      );
    }

    // Read the incoming webhook.
    const rawBody = await request.text();
    const signature = request.headers.get("x-sfpy-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing webhook signature." },
        { status: 401 },
      );
    }

    const event = JSON.parse(rawBody);

    // Safepay documents HMAC-SHA512 over the JSON payload.
    const payload = Buffer.from(JSON.stringify(event));

    const expectedSignature = createHmac("sha512", webhookSecret)
      .update(payload)
      .digest("hex");

    const received = Buffer.from(signature.trim().toLowerCase());
    const expected = Buffer.from(expectedSignature);

    if (
      received.length !== expected.length ||
      !timingSafeEqual(received, expected)
    ) {
      return NextResponse.json(
        { error: "Invalid webhook signature." },
        { status: 401 },
      );
    }

    // Ignore event types that do not confirm a captured payment.
    if (event.type !== "payment.succeeded") {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const payment = event.data;

    if (
      !event.token ||
      !payment?.tracker ||
      payment.state !== "TRACKER_ENDED" ||
      payment.currency !== "PKR" ||
      !payment.metadata?.order_id
    ) {
      return NextResponse.json(
        { error: "Invalid payment event data." },
        { status: 400 },
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Find the order using the metadata supplied during checkout.
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select(
        "id, order_number, subtotal, currency, payment_status, safepay_tracker, safepay_event_token",
      )
      .eq("order_number", payment.metadata.order_id)
      .single();

    if (orderError || !order) {
      console.error("Webhook order lookup failed:", orderError);
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    // Ensure this payment belongs to this exact order.
    if (order.safepay_tracker !== payment.tracker || order.currency !== "PKR") {
      return NextResponse.json(
        { error: "Payment does not match the order." },
        { status: 400 },
      );
    }

    // Safepay reports the amount in paisa.
    const expectedAmount = Math.round(Number(order.subtotal) * 100);

    if (
      !Number.isFinite(expectedAmount) ||
      Number(payment.amount) !== expectedAmount
    ) {
      return NextResponse.json(
        { error: "Payment amount does not match the order." },
        { status: 400 },
      );
    }

    // Safely acknowledge an already processed payment.
    if (
      order.payment_status === "paid" ||
      order.safepay_event_token === event.token
    ) {
      return NextResponse.json(
        { received: true, duplicate: true },
        { status: 200 },
      );
    }

    // Update only if this order has not already processed an event.
    const { data: updatedOrder, error: updateError } = await supabase
      .from("orders")
      .update({
        payment_status: "paid",
        safepay_event_token: event.token,
      })
      .eq("id", order.id)
      .eq("payment_status", "unpaid")
      .is("safepay_event_token", null)
      .select("id")
      .maybeSingle();

    if (updateError) {
      console.error("Payment status update failed:", updateError);
      return NextResponse.json(
        { error: "Unable to update payment status." },
        { status: 500 },
      );
    }

    if (!updatedOrder) {
      return NextResponse.json(
        { received: true, duplicate: true },
        { status: 200 },
      );
    }

    console.log("Safepay payment verified:", order.order_number);

    return NextResponse.json({ received: true, paid: true }, { status: 200 });
  } catch (error) {
    console.error("Safepay webhook processing error:", error);

    return NextResponse.json(
      { error: "Webhook processing failed." },
      { status: 500 },
    );
  }
}
