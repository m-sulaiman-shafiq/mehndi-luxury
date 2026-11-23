import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { products } from "@/data/products";

// export const runtime = "nodejs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Server database configuration is missing." },
        { status: 500 },
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const body = await request.json();
    const { fullName, email, phone, address, city, postalCode, notes, items } =
      body;

    if (
      !fullName?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !address?.trim() ||
      !city?.trim() ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: "Please provide all required details and products." },
        { status: 400 },
      );
    }

    if (items.length > 50) {
      return NextResponse.json(
        { error: "Too many items in one order." },
        { status: 400 },
      );
    }

    const orderItems = [];

    for (const item of items) {
      const product = products.find((entry) => entry.id === item.productId);

      if (
        !product ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 20 ||
        !["stitched", "unstitched"].includes(item.stitching)
      ) {
        return NextResponse.json(
          { error: "One or more order items are invalid." },
          { status: 400 },
        );
      }

      if (
        item.stitching === "stitched" &&
        (!item.age ||
          !Number.isInteger(Number(item.age)) ||
          Number(item.age) < 1 ||
          Number(item.age) > 120 ||
          !item.measurements ||
          typeof item.measurements !== "object" ||
          Object.keys(item.measurements).length === 0 ||
          Object.values(item.measurements).some(
            (value) =>
              !Number.isFinite(Number(value)) ||
              Number(value) <= 0 ||
              Number(value) > 300,
          ))
      ) {
        return NextResponse.json(
          {
            error:
              "Valid age and measurements are required for stitched items.",
          },
          { status: 400 },
        );
      }

      orderItems.push({
        product_id: product.id,
        product_slug: product.slug,
        product_name: product.name,
        category: product.category,
        image_url: product.image,
        unit_price: product.price,
        quantity: item.quantity,
        stitching: item.stitching,
        wearer_age: item.stitching === "stitched" ? Number(item.age) : null,
        measurements: item.stitching === "stitched" ? item.measurements : null,
      });
    }

    // Always calculate the total using trusted product prices on the server.
    const subtotal = orderItems.reduce(
      (total, item) => total + item.unit_price * item.quantity,
      0,
    );

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        postal_code: postalCode?.trim() || null,
        notes: notes?.trim() || null,
        subtotal,
        currency: "PKR",
        status: "pending",
        payment_status: "unpaid",
      })
      .select("id, order_number")
      .single();

    if (orderError || !order) {
      console.error("Order creation failed:", orderError);
      return NextResponse.json(
        { error: "Unable to create your order. Please try again." },
        { status: 500 },
      );
    }

    const { error: itemsError } = await supabase.from("order_items").insert(
      orderItems.map((item) => ({
        ...item,
        order_id: order.id,
      })),
    );

    if (itemsError) {
      console.error("Order items creation failed:", itemsError);

      // Remove the incomplete order if its items could not be saved.
      const { error: cleanupError } = await supabase
        .from("orders")
        .delete()
        .eq("id", order.id);

      if (cleanupError) {
        console.error("Order cleanup failed:", cleanupError);
      }

      return NextResponse.json(
        { error: "Unable to save your order items. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        orderNumber: order.order_number,
        subtotal,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Order API error:", error);

    return NextResponse.json(
      { error: "Something went wrong while processing your order." },
      { status: 500 },
    );
  }
}
