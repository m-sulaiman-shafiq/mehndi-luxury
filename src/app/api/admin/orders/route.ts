import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/backend/supabase";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    // 1. Verify the logged-in user
    const sessionClient = await createServerClient();

    const {
      data: { user },
    } = await sessionClient.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 2. Check administrator access
    const { data: admin } = await sessionClient
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!admin) {
      return NextResponse.json({ error: "Not authorised" }, { status: 403 });
    }

    // 3. Retrieve orders using the server-only secret key
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { data: orders, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Admin orders error:", error);
    return NextResponse.json(
      { error: "Unable to load orders." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    // 1. Verify logged-in user
    const sessionClient = await createServerClient();

    const {
      data: { user },
    } = await sessionClient.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 2. Verify admin permissions
    const { data: admin } = await sessionClient
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!admin) {
      return NextResponse.json({ error: "Not authorised" }, { status: 403 });
    }

    // 3. Validate requested status
    const { orderId, status } = await request.json();

    const allowedStatuses = [
      "pending",
      "confirmed",
      "in_production",
      "dispatched",
      "delivered",
      "cancelled",
    ];

    if (
      typeof orderId !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        orderId,
      ) ||
      !allowedStatuses.includes(status)
    ) {
      return NextResponse.json(
        { error: "Invalid order or status." },
        { status: 400 },
      );
    }

    // 4. Update order in Supabase
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { data, error } = await supabase
      .from("orders")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", orderId)
      .select("id, order_number, status")
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: data });
  } catch (error) {
    console.error("Order status update failed:", error);

    return NextResponse.json(
      { error: "Unable to update order status." },
      { status: 500 },
    );
  }
}
