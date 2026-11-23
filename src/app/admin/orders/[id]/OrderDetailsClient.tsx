"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type OrderItem = {
  id: string;
  product_name: string;
  product_slug: string;
  category: string;
  image_url: string | null;
  unit_price: number;
  quantity: number;
  stitching: string;
  wearer_age: number | null;
  measurements: Record<string, unknown> | null;
};

type Order = {
  id: string;
  order_number: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string | null;
  notes: string | null;
  subtotal: number;
  currency: string;
  status: string;
  payment_status: string;
  created_at: string;
  order_items: OrderItem[];
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  in_production: "In Production",
  dispatched: "Dispatched",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

function formatPrice(amount: number, currency = "PKR") {
  return `${currency} ${amount.toLocaleString("en-PK")}`;
}

function formatLabel(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function OrderDetailsClient({ orderId }: { orderId: string }) {
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrder() {
      try {
        const response = await fetch(`/api/admin/orders/${orderId}`, {
          cache: "no-store",
        });

        if (response.status === 401) {
          router.replace("/admin/login");
          return;
        }

        if (response.status === 403) {
          setError("You are not authorised to view this order.");
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to load order.");
        }

        setOrder(data.order);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [orderId, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FFF9E9] p-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[#77704E]">Loading order details...</p>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-screen bg-[#FFF9E9] p-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/admin"
            className="text-sm font-medium text-[#77704E] hover:text-[#59402F]"
          >
            ← Back to dashboard
          </Link>

          <div className="mt-8 rounded-2xl border border-[#EADFCB] bg-white p-8">
            <h1 className="text-xl font-semibold text-[#59402F]">
              Unable to display order
            </h1>
            <p className="mt-2 text-sm text-red-600">
              {error || "Order not found."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const orderDate = new Date(order.created_at);

  return (
    <main className="min-h-screen bg-[#FFF9E9] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="text-sm font-medium text-[#77704E] hover:text-[#59402F]"
          >
            ← Back to dashboard
          </Link>

          <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-[#A18A69]">
                THE MEHNDI EDIT · ADMIN
              </p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#59402F]">
                Order Details
              </h1>
              <p className="mt-2 text-sm text-[#77704E]">
                Order #{order.order_number}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#F6CE69]/40 px-4 py-2 text-sm font-medium text-[#59402F]">
                {statusLabels[order.status] || formatLabel(order.status)}
              </span>

              <span
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  order.payment_status === "paid"
                    ? "bg-green-100 text-green-800"
                    : order.payment_status === "refunded"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-700"
                }`}
              >
                {formatLabel(order.payment_status)}
              </span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#EADFCB] bg-white p-5">
            <p className="text-sm text-[#77704E]">Order Total</p>
            <p className="mt-2 text-2xl font-semibold text-[#59402F]">
              {formatPrice(order.subtotal, order.currency)}
            </p>
          </div>

          <div className="rounded-2xl border border-[#EADFCB] bg-white p-5">
            <p className="text-sm text-[#77704E]">Items Ordered</p>
            <p className="mt-2 text-2xl font-semibold text-[#59402F]">
              {order.order_items.reduce(
                (total, item) => total + item.quantity,
                0,
              )}
            </p>
          </div>

          <div className="rounded-2xl border border-[#EADFCB] bg-white p-5">
            <p className="text-sm text-[#77704E]">Order Date</p>
            <p className="mt-2 text-lg font-semibold text-[#59402F]">
              {orderDate.toLocaleDateString("en-PK", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="mt-1 text-xs text-[#77704E]">
              {orderDate.toLocaleTimeString("en-PK", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Customer information */}
          <section className="rounded-2xl border border-[#EADFCB] bg-white p-6 lg:col-span-1">
            <h2 className="text-lg font-semibold text-[#59402F]">
              Customer Information
            </h2>

            <div className="mt-5 space-y-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[#A18A69]">
                  Customer Name
                </p>
                <p className="mt-1 text-sm font-medium text-[#59402F]">
                  {order.customer_name}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[#A18A69]">
                  Email Address
                </p>
                <a
                  href={`mailto:${order.email}`}
                  className="mt-1 block break-all text-sm text-[#59402F] hover:underline"
                >
                  {order.email}
                </a>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[#A18A69]">
                  Phone Number
                </p>
                <a
                  href={`tel:${order.phone}`}
                  className="mt-1 block text-sm text-[#59402F] hover:underline"
                >
                  {order.phone}
                </a>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[#A18A69]">
                  Delivery Address
                </p>
                <p className="mt-1 text-sm leading-6 text-[#59402F]">
                  {order.address}
                  <br />
                  {order.city}
                  {order.postal_code ? `, ${order.postal_code}` : ""}
                </p>
              </div>

              {order.notes && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-[#A18A69]">
                    Customer Notes
                  </p>
                  <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-[#59402F]">
                    {order.notes}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Products and stitching */}
          <section className="rounded-2xl border border-[#EADFCB] bg-white p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-[#59402F]">
              Ordered Products
            </h2>

            <div className="mt-5 space-y-6">
              {order.order_items.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-[#EADFCB] pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex flex-col gap-4 sm:flex-row">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.product_name}
                        className="h-28 w-24 rounded-xl border border-[#EADFCB] object-cover"
                      />
                    ) : (
                      <div className="flex h-28 w-24 items-center justify-center rounded-xl bg-[#FFF9E9] text-xs text-[#A18A69]">
                        No image
                      </div>
                    )}

                    <div className="flex-1">
                      <p className="text-lg font-semibold text-[#59402F]">
                        {item.product_name}
                      </p>

                      <p className="mt-1 text-sm text-[#77704E]">
                        {item.category}
                      </p>

                      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-xs text-[#A18A69]">Quantity</p>
                          <p className="mt-1 font-medium text-[#59402F]">
                            {item.quantity}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-[#A18A69]">Unit Price</p>
                          <p className="mt-1 font-medium text-[#59402F]">
                            {formatPrice(item.unit_price, order.currency)}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-[#A18A69]">Stitching</p>
                          <p className="mt-1 font-medium text-[#59402F]">
                            {formatLabel(item.stitching)}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-[#A18A69]">Line Total</p>
                          <p className="mt-1 font-semibold text-[#59402F]">
                            {formatPrice(
                              item.unit_price * item.quantity,
                              order.currency,
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Measurements */}
                  {item.stitching === "stitched" && (
                    <div className="mt-5 rounded-xl bg-[#FFF9E9] p-4">
                      <h3 className="font-semibold text-[#59402F]">
                        Stitching Details
                      </h3>

                      {item.wearer_age !== null && (
                        <p className="mt-2 text-sm text-[#77704E]">
                          Wearer Age: {item.wearer_age} years
                        </p>
                      )}

                      {item.measurements &&
                      Object.keys(item.measurements).length > 0 ? (
                        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                          {Object.entries(item.measurements).map(
                            ([key, value]) => (
                              <div key={key}>
                                <p className="text-xs text-[#A18A69]">
                                  {formatLabel(key)}
                                </p>
                                <p className="mt-1 text-sm font-medium text-[#59402F]">
                                  {String(value)} inches
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      ) : (
                        <p className="mt-3 text-sm text-[#77704E]">
                          No measurements were provided.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Order total */}
        <div className="mt-6 flex justify-end">
          <div className="w-full rounded-2xl border border-[#EADFCB] bg-white p-6 sm:max-w-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#77704E]">Subtotal</span>
              <span className="font-medium text-[#59402F]">
                {formatPrice(order.subtotal, order.currency)}
              </span>
            </div>

            <div className="my-4 border-t border-[#EADFCB]" />

            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#59402F]">Order Total</span>
              <span className="text-xl font-semibold text-[#59402F]">
                {formatPrice(order.subtotal, order.currency)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
