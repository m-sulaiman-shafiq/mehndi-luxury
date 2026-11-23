"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Container from "@/components/ui/Container";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <main className="min-h-screen bg-[#FFF9E9] py-20">
      <Container>
        <div className="mx-auto max-w-xl rounded-2xl border border-[#EADFCB] bg-white px-6 py-14 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F6CE69] text-3xl text-[#59402F]">
            ✓
          </div>

          <p className="mt-7 text-xs uppercase tracking-[0.2em] text-[#A47743]">
            The Mehndi Edit
          </p>

          <h1 className="mt-3 text-3xl">Thank You for Your Order</h1>

          <p className="mt-4 leading-7 text-[#77704E]">
            Your order has been received. Our team will review your details and
            contact you regarding the next steps.
          </p>

          {orderNumber && (
            <div className="mt-8 rounded-xl bg-[#FFF9E9] p-5">
              <p className="text-xs uppercase tracking-widest text-[#77704E]">
                Your Order Number
              </p>
              <p className="mt-2 text-xl font-semibold text-[#59402F]">
                {orderNumber}
              </p>
            </div>
          )}

          <Link
            href="/shop"
            className="mt-9 inline-block rounded-full bg-button-gradient px-8 py-4 font-semibold text-[#59402F]"
          >
            Continue Exploring
          </Link>
        </div>
      </Container>
    </main>
  );
}

export default function OrderConfirmationPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <Suspense fallback={<main className="min-h-screen bg-[#FFF9E9]" />}>
        <ConfirmationContent />
      </Suspense>
      <Footer />
    </>
  );
}
