import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

type PaymentResultProps = {
  searchParams: Promise<{
    order_id?: string;
    tracker?: string;
  }>;
};

export default async function PaymentResultPage({
  searchParams,
}: PaymentResultProps) {
  const { order_id, tracker } = await searchParams;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!order_id || !tracker || !supabaseUrl || !serviceRoleKey) {
    return (
      <ResultMessage
        title="Unable to verify your payment"
        message="We could not verify the payment details. Please contact our support team."
      />
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { data: order, error } = await supabase
    .from("orders")
    .select("order_number, subtotal, currency, payment_status, safepay_tracker")
    .eq("order_number", order_id)
    .maybeSingle();

  if (error || !order || order.safepay_tracker !== tracker) {
    return (
      <ResultMessage
        title="Unable to verify your payment"
        message="We could not match this payment with your order. Please contact our support team."
      />
    );
  }

  const isPaid = order.payment_status === "paid";

  return (
    <main className="min-h-screen bg-[#FFF9E9] px-5 py-16">
      <div className="mx-auto max-w-xl">
        <div className="overflow-hidden rounded-3xl border border-[#EADFCB] bg-white shadow-sm">
          <div className="h-2 bg-gradient-to-r from-[#F49A62] via-[#F6CE69] to-[#F3A9B5]" />

          <div className="px-7 py-12 text-center sm:px-12">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#F6CE69]/20 text-4xl">
              {isPaid ? "✓" : "…"}
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#A17C52]">
              The Mehndi Edit
            </p>

            <h1 className="mb-4 text-3xl font-semibold tracking-tight text-[#59402F]">
              {isPaid
                ? "Your order is confirmed!"
                : "Payment verification in progress"}
            </h1>

            <p className="mb-8 leading-7 text-[#77704E]">
              {isPaid
                ? "Thank you for shopping with us. Your payment has been verified successfully. We look forward to creating something beautiful for you."
                : "We have not yet received a verified payment confirmation. If you completed checkout, please wait briefly and refresh this page."}
            </p>

            <div className="mb-8 rounded-2xl bg-[#FFF9E9] p-5 text-left">
              <div className="mb-3 flex justify-between gap-4">
                <span className="text-sm text-[#77704E]">Order number</span>
                <span className="text-sm font-semibold text-[#59402F]">
                  {order.order_number}
                </span>
              </div>

              <div className="mb-3 flex justify-between gap-4">
                <span className="text-sm text-[#77704E]">Order total</span>
                <span className="text-sm font-semibold text-[#59402F]">
                  PKR {Number(order.subtotal).toLocaleString("en-PK")}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-sm text-[#77704E]">Payment status</span>
                <span
                  className={`text-sm font-semibold ${
                    isPaid ? "text-green-700" : "text-amber-700"
                  }`}
                >
                  {isPaid ? "Paid" : "Pending verification"}
                </span>
              </div>
            </div>

            {isPaid ? (
              <Link
                href="/"
                className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#F49A62] via-[#F6CE69] to-[#F3A9B5] px-7 py-4 font-semibold text-[#59402F] transition hover:opacity-90"
              >
                Continue Shopping
              </Link>
            ) : (
              <a
                href={`/payment/result?order_id=${encodeURIComponent(order_id)}&tracker=${encodeURIComponent(tracker)}`}
                className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#F49A62] via-[#F6CE69] to-[#F3A9B5] px-7 py-4 font-semibold text-[#59402F] transition hover:opacity-90"
              >
                Refresh Payment Status
              </a>
            )}

            <p className="mt-6 text-xs leading-5 text-[#999080]">
              {isPaid
                ? "Your order has been recorded. Thank you for choosing The Mehndi Edit."
                : "Please do not attempt another payment while your current payment is being verified."}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function ResultMessage({ title, message }: { title: string; message: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFF9E9] px-5 py-16">
      <div className="w-full max-w-lg rounded-3xl border border-[#EADFCB] bg-white p-10 text-center">
        <h1 className="mb-4 text-2xl font-semibold text-[#59402F]">{title}</h1>
        <p className="mb-7 leading-7 text-[#77704E]">{message}</p>
        <Link
          href="/"
          className="inline-flex rounded-full bg-gradient-to-r from-[#F49A62] via-[#F6CE69] to-[#F3A9B5] px-8 py-3 font-semibold text-[#59402F]"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
}
