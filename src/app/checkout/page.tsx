"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Order submission will be connected to the backend in the next stage.
    alert(
      "Your checkout details have been captured. Order placement is coming next.",
    );
  }

  if (items.length === 0) {
    return (
      <>
        <AnnouncementBar />
        <Header />
        <main className="min-h-screen bg-[#FFF9E9] py-20">
          <Container>
            <div className="rounded-2xl border border-[#EADFCB] bg-white px-6 py-16 text-center">
              <h1>Your bag is empty</h1>
              <p className="mt-3 text-[#77704E]">
                Please add a design before proceeding to checkout.
              </p>
              <Link
                href="/shop"
                className="mt-7 inline-block rounded-full bg-button-gradient px-8 py-3 font-semibold text-[#59402F]"
              >
                Explore The Collection
              </Link>
            </div>
          </Container>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="min-h-screen bg-[#FFF9E9] py-12 md:py-20">
        <Container>
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[#A47743]">
              Almost Yours
            </p>
            <h1 className="mt-3">Checkout</h1>
            <p className="mt-3 text-sm text-[#77704E]">
              Please provide your details for your made-to-order creation.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-2xl border border-[#EADFCB] bg-white p-6 md:p-8"
            >
              <h2 className="text-xl">Customer & Delivery Details</h2>

              {[
                { name: "fullName", label: "Full Name", type: "text" },
                { name: "email", label: "Email Address", type: "email" },
                { name: "phone", label: "Phone Number", type: "tel" },
                { name: "city", label: "City", type: "text" },
                { name: "postalCode", label: "Postal Code", type: "text" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="mb-2 block text-sm font-medium text-[#59402F]">
                    {field.label}
                  </label>
                  <input
                    required
                    name={field.name}
                    type={field.type}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#EADFCB] bg-[#FFFDF8] px-4 py-3 text-sm outline-none focus:border-[#B49A65]"
                  />
                </div>
              ))}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#59402F]">
                  Complete Delivery Address
                </label>
                <textarea
                  required
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-xl border border-[#EADFCB] bg-[#FFFDF8] px-4 py-3 text-sm outline-none focus:border-[#B49A65]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#59402F]">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-xl border border-[#EADFCB] bg-[#FFFDF8] px-4 py-3 text-sm outline-none focus:border-[#B49A65]"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-button-gradient px-6 py-4 font-semibold text-[#59402F] transition hover:opacity-90"
              >
                Continue to Order Review
              </button>
            </form>

            <aside className="h-fit rounded-2xl border border-[#EADFCB] bg-white p-6">
              <h2 className="text-xl">Your Order</h2>

              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.cartId}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <div>
                      <p className="font-medium text-[#59402F]">
                        {item.product.name}
                      </p>
                      <p className="mt-1 text-xs text-[#77704E]">
                        {item.stitching === "stitched"
                          ? "Custom Stitched"
                          : "Unstitched"}{" "}
                        × {item.quantity}
                      </p>
                    </div>
                    <p className="whitespace-nowrap text-[#59402F]">
                      PKR{" "}
                      {(item.product.price * item.quantity).toLocaleString(
                        "en-PK",
                      )}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between border-t border-[#EADFCB] pt-5 font-semibold">
                <span>Total</span>
                <span>PKR {subtotal.toLocaleString("en-PK")}</span>
              </div>

              <p className="mt-4 text-xs leading-6 text-[#77704E]">
                Delivery charges and applicable taxes will be confirmed before
                order placement.
              </p>
            </aside>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}
