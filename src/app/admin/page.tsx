"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/browser/supabase";
import Link from "next/link";

type OrderItem = {
  id: string;
  product_name: string;
  product_id: string;
  unit_price: number;
  quantity: number;
  stitching: string;
  wearer_age: number | null;
  measurements: Record<string, string> | null;
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
  subtotal: number;
  status: string;
  payment_status: string;
  created_at: string;
  order_items: OrderItem[];
};

export default function AdminDashboardPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState("");

  async function loadOrders() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/orders", {
        cache: "no-store",
      });

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      if (response.status === 403) {
        setError("Your account does not have administrator access.");
        return;
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to load orders.");
      }

      setOrders(result.orders || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function handleLogout() {
    await createClient().auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  const totalSales = orders.reduce(
    (total, order) => total + Number(order.subtotal),
    0,
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "pending",
  ).length;

  const formatPrice = (amount: number) =>
    `PKR ${Number(amount).toLocaleString("en-PK")}`;

  async function handleStatusChange(orderId: string, status: string) {
    setUpdatingOrderId(orderId);
    setError("");

    try {
      const response = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, status }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to update status.");
      }

      setOrders((current) =>
        current.map((order) =>
          order.id === orderId
            ? { ...order, status: result.order.status }
            : order,
        ),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setUpdatingOrderId("");
    }
  }

  return (
    <main className="min-h-screen bg-[#FFF9E9] p-5 md:p-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EADFCB] pb-6">
          <div>
            <p className="text-sm font-semibold tracking-widest text-[#A17B43]">
              THE MEHNDI EDIT
            </p>

            <h1 className="mt-2 text-3xl font-semibold text-[#59402F]">
              Admin Dashboard
            </h1>

            <p className="mt-1 text-sm text-[#77704E]">
              Manage your store orders and customers.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={loadOrders}
              className="rounded-lg border border-[#EADFCB] bg-white px-4 py-2 text-sm font-medium text-[#59402F] hover:bg-[#FFF5DF]"
            >
              Refresh
            </button>

            <button
              onClick={handleLogout}
              className="rounded-lg bg-[#59402F] px-4 py-2 text-sm font-medium text-white hover:bg-[#453122]"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Summary Cards */}
        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-[#EADFCB] bg-white p-6">
            <p className="text-sm text-[#77704E]">Total Orders</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#59402F]">
              {orders.length}
            </h2>
          </div>

          <div className="rounded-xl border border-[#EADFCB] bg-white p-6">
            <p className="text-sm text-[#77704E]">Pending Orders</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#D97736]">
              {pendingOrders}
            </h2>
          </div>

          <div className="rounded-xl border border-[#EADFCB] bg-white p-6">
            <p className="text-sm text-[#77704E]">Total Order Value</p>
            <h2 className="mt-3 text-2xl font-semibold text-[#59402F]">
              {formatPrice(totalSales)}
            </h2>
          </div>
        </section>

        {/* Orders */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-[#59402F]">
            Recent Orders
          </h2>

          {loading && (
            <p className="mt-6 text-sm text-[#77704E]">Loading orders...</p>
          )}

          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && orders.length === 0 && (
            <div className="mt-6 rounded-xl border border-[#EADFCB] bg-white p-8 text-center">
              <p className="font-medium text-[#59402F]">No orders yet.</p>
            </div>
          )}

          {!loading && !error && orders.length > 0 && (
            <div className="mt-6 space-y-5">
              {orders.map((order) => (
                <article
                  key={order.id}
                  className="overflow-hidden rounded-xl border border-[#EADFCB] bg-white"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EADFCB] p-5">
                    <div>
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-semibold text-[#59402F] hover:text-[#D97736] hover:underline"
                      >
                        {order.order_number} →
                      </Link>
                      <p className="mt-1 text-xs text-[#77704E]">
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-[#59402F]">
                        {formatPrice(order.subtotal)}
                      </p>
                      <div className="mt-2 flex items-center justify-end gap-2">
                        <span className="text-xs text-[#77704E]">Status:</span>

                        <select
                          value={order.status}
                          disabled={updatingOrderId === order.id}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                          className="rounded-lg border border-[#EADFCB] bg-[#FFF9E9] px-3 py-2 text-sm text-[#59402F] disabled:opacity-50"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="in_production">In Production</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 p-5 md:grid-cols-2">
                    {/* Customer */}
                    <div>
                      <h4 className="mb-3 font-semibold text-[#59402F]">
                        Customer Details
                      </h4>

                      <div className="space-y-2 text-sm text-[#77704E]">
                        <p>
                          <strong>Name:</strong> {order.customer_name}
                        </p>
                        <p>
                          <strong>Email:</strong> {order.email}
                        </p>
                        <p>
                          <strong>Phone:</strong> {order.phone}
                        </p>
                        <p>
                          <strong>Address:</strong> {order.address},{" "}
                          {order.city}
                        </p>
                        {order.postal_code && (
                          <p>
                            <strong>Postal Code:</strong> {order.postal_code}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Products */}
                    <div>
                      <h4 className="mb-3 font-semibold text-[#59402F]">
                        Ordered Products
                      </h4>

                      <div className="space-y-4">
                        {order.order_items?.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-lg bg-[#FFF9E9] p-4"
                          >
                            <p className="font-medium text-[#59402F]">
                              {item.product_name}
                            </p>

                            <p className="mt-1 text-sm text-[#77704E]">
                              Quantity: {item.quantity}
                            </p>

                            <p className="text-sm text-[#77704E]">
                              Price: {formatPrice(item.unit_price)}
                            </p>

                            <p className="text-sm capitalize text-[#77704E]">
                              Stitching: {item.stitching}
                            </p>

                            {item.stitching === "stitched" && (
                              <div className="mt-3 border-t border-[#EADFCB] pt-3">
                                <p className="text-sm font-semibold text-[#59402F]">
                                  Stitching Measurements
                                </p>

                                <p className="mt-1 text-sm text-[#77704E]">
                                  Wearer Age:{" "}
                                  {item.wearer_age ?? "Not provided"}
                                </p>

                                {item.measurements &&
                                  Object.entries(item.measurements).map(
                                    ([key, value]) => (
                                      <p
                                        key={key}
                                        className="text-sm capitalize text-[#77704E]"
                                      >
                                        {key.replaceAll("_", " ")}: {value}{" "}
                                        inches
                                      </p>
                                    ),
                                  )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
