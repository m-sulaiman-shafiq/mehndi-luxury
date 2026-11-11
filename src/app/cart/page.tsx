"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="min-h-screen bg-[#FFF9E9] py-12 md:py-20">
        <Container>
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[#A47743]">
              Your Selection
            </p>
            <h1 className="mt-3">Shopping Bag</h1>
            <p className="mt-3 text-sm text-[#77704E]">
              Review your selected designs and stitching preferences.
            </p>
          </div>

          {items.length === 0 ? (
            <div className="rounded-2xl border border-[#EADFCB] bg-white px-6 py-20 text-center">
              <h2 className="text-2xl">Your bag is waiting</h2>
              <p className="mt-3 text-[#77704E]">
                You haven't added any designs yet.
              </p>
              <Link
                href="/shop"
                className="mt-7 inline-block rounded-full bg-button-gradient px-8 py-3 font-semibold text-[#59402F]"
              >
                Explore The Collection
              </Link>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
              <div className="space-y-5">
                {items.map((item) => (
                  <article
                    key={item.cartId}
                    className="rounded-2xl border border-[#EADFCB] bg-white p-4 sm:p-6"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row">
                      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#F5F0E6] sm:w-36">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="144px"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col">
                        <p className="text-xs uppercase tracking-widest text-[#A47743]">
                          {item.product.category}
                        </p>

                        <h2 className="mt-2 text-xl">{item.product.name}</h2>

                        <p className="mt-2 font-semibold text-[#59402F]">
                          PKR {item.product.price.toLocaleString("en-PK")}
                        </p>

                        <p className="mt-3 text-sm text-[#77704E]">
                          Stitching:{" "}
                          <strong className="text-[#59402F]">
                            {item.stitching === "stitched"
                              ? "Custom Stitched"
                              : "Unstitched"}
                          </strong>
                        </p>

                        {item.stitching === "stitched" && (
                          <div className="mt-3 rounded-lg bg-[#FFF9E9] p-3 text-sm text-[#59402F]">
                            <p>Wearer's age: {item.age} years</p>
                            <p className="mt-2 font-medium">
                              Custom measurements (inches)
                            </p>
                            <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-[#77704E]">
                              {Object.entries(item.measurements || {}).map(
                                ([field, value]) => (
                                  <p key={field}>
                                    {field}: {value}"
                                  </p>
                                ),
                              )}
                            </div>
                          </div>
                        )}

                        <div className="mt-auto flex flex-wrap items-center gap-4 pt-5">
                          <div className="flex items-center rounded-full border border-[#EADFCB]">
                            <button
                              onClick={() =>
                                updateQuantity(item.cartId, item.quantity - 1)
                              }
                              disabled={item.quantity === 1}
                              className="px-4 py-2 disabled:opacity-30"
                            >
                              −
                            </button>
                            <span className="text-sm">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.cartId, item.quantity + 1)
                              }
                              className="px-4 py-2"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.cartId)}
                            className="text-sm text-[#A47743] underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="h-fit rounded-2xl border border-[#EADFCB] bg-white p-6">
                <h2 className="text-xl">Order Summary</h2>

                <div className="mt-6 flex justify-between text-sm text-[#77704E]">
                  <span>Subtotal</span>
                  <span>PKR {subtotal.toLocaleString("en-PK")}</span>
                </div>

                <div className="mt-4 flex justify-between border-t border-[#EADFCB] pt-5 font-semibold">
                  <span>Total</span>
                  <span>PKR {subtotal.toLocaleString("en-PK")}</span>
                </div>

                <p className="mt-4 text-xs leading-6 text-[#77704E]">
                  Delivery charges and any applicable taxes will be confirmed
                  during checkout.
                </p>

                <Link
                  href="/checkout"
                  className="mt-7 block w-full rounded-full bg-button-gradient px-6 py-4 text-center font-semibold text-[#59402F] transition hover:opacity-90"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/shop"
                  className="mt-5 block text-center text-sm text-[#A47743] underline"
                >
                  Continue Shopping
                </Link>
              </aside>
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </>
  );
}
