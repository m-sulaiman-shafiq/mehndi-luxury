import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Safepay from "@sfpy/node-core";

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const publicKey = process.env.SAFEPAY_PUBLIC_KEY;
    const secretKey = process.env.SAFEPAY_SECRET_KEY;
    const host = process.env.SAFEPAY_HOST;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    if (
      !supabaseUrl ||
      !serviceRoleKey ||
      !publicKey ||
      !secretKey ||
      !host ||
      !siteUrl
    ) {
      console.error("Payment configuration is incomplete.");

      return NextResponse.json(
        { error: "Payment service configuration is incomplete." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const orderNumber = body.orderNumber;

    if (typeof orderNumber !== "string" || !orderNumber.trim()) {
      return NextResponse.json(
        { error: "A valid order number is required." },
        { status: 400 },
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Retrieve the order and its trusted amount from Supabase.
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, order_number, subtotal, currency, payment_status, status")
      .eq("order_number", orderNumber.trim())
      .single();

    if (orderError || !order) {
      console.error("Payment order lookup failed:", orderError);

      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    if (order.payment_status === "paid") {
      return NextResponse.json(
        { error: "This order has already been paid." },
        { status: 409 },
      );
    }

    if (order.status === "cancelled") {
      return NextResponse.json(
        { error: "This order has been cancelled." },
        { status: 400 },
      );
    }

    const subtotal = Number(order.subtotal);

    if (!Number.isFinite(subtotal) || subtotal <= 0) {
      return NextResponse.json(
        { error: "Invalid order amount." },
        { status: 400 },
      );
    }

    if (order.currency !== "PKR") {
      return NextResponse.json(
        { error: "Unsupported order currency." },
        { status: 400 },
      );
    }

    // Convert PKR to paisa.
    const amountInPaisa = Math.round(subtotal * 100);

    const safepay = new Safepay(secretKey, {
      authType: "secret",
      host,
    });

    // Step 1: Create a payment tracker.
    const sessionResponse = await safepay.payments.session.setup({
      merchant_api_key: publicKey,
      intent: "CYBERSOURCE",
      mode: "payment",
      entry_mode: "raw",
      currency: "PKR",
      amount: amountInPaisa,
      metadata: {
        order_id: order.order_number,
        source: "the-mehndi-edit",
      },
      include_fees: false,
    });

    const trackerToken = sessionResponse?.data?.tracker?.token;

    const { error: trackerSaveError } = await supabase
      .from("orders")
      .update({
        safepay_tracker: trackerToken,
        payment_provider: "safepay",
      })
      .eq("order_number", order.order_number);

    if (trackerSaveError) {
      console.error("Unable to save Safepay tracker:", trackerSaveError);

      return NextResponse.json(
        { error: "Unable to save payment information." },
        { status: 500 },
      );
    }

    if (!trackerToken || typeof trackerToken !== "string") {
      console.error("Safepay tracker token was not returned.");

      return NextResponse.json(
        { error: "Unable to create payment session." },
        { status: 502 },
      );
    }

    // Step 2: Generate the temporary passport authentication token.
    const authResponse = await safepay.client.passport.create();
    const authToken = authResponse?.data;

    if (!authToken || typeof authToken !== "string") {
      console.error("Safepay passport token was not returned.");

      return NextResponse.json(
        { error: "Unable to authenticate payment session." },
        { status: 502 },
      );
    }

    // Step 3: Prepare the return URL.
    const resultUrl = new URL("/payment/result", siteUrl);
    resultUrl.searchParams.set("order", order.order_number);

    // Step 4: Generate the hosted checkout URL.
    const checkoutUrl = safepay.checkout.createCheckoutUrl({
      env: "sandbox",
      tbt: authToken,
      tracker: trackerToken,
      source: "hosted",
      order_id: order.order_number,
      redirect_url: resultUrl.toString(),
      cancel_url: resultUrl.toString(),
    });

    if (!checkoutUrl || typeof checkoutUrl !== "string") {
      console.error("Safepay checkout URL was not generated.");

      return NextResponse.json(
        { error: "Unable to generate checkout URL." },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        checkoutUrl,
        orderNumber: order.order_number,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Safepay payment creation error:", error);

    return NextResponse.json(
      { error: "Unable to initiate payment. Please try again." },
      { status: 500 },
    );
  }
}
