import Link from "next/link";
import InfoPageLayout from "@/components/layout/InfoPageLayout";

const sections = [
  {
    title: "1. Made-to-order craftsmanship",
    text: "Many of our outfits are prepared especially for your order. Production begins after your order details and selected stitching option have been confirmed. Because each piece is prepared for an individual customer, processing may take longer than ready-to-ship items.",
  },
  {
    title: "2. Order confirmation and advance payment",
    text: "A 35% advance payment of the total order value is required to confirm your order and begin processing. The remaining balance is payable according to the payment instructions shared with you before dispatch or delivery. Please review your product, stitching option, measurements and contact details carefully before making payment. We may contact you to confirm your order details.",
  },
  {
    title: "3. Stitching and measurements",
    text: "Choose Unstitched if you would like to receive the fabric without stitching. Choose Stitched if you would like custom tailoring. For stitched orders, please provide accurate measurements in inches. If you are unsure about a measurement, contact us before submitting your order.",
  },
  {
    title: "4. Order changes and cancellations",
    text: "Cancellation requests are accepted within 24 hours after your order has been confirmed. To request a cancellation, contact us with your order number within this period. Once your cancellation is accepted, your refund will be processed within 24 hours. A deduction equal to 10% of the advance payment received will be applied, and the remaining 90% of the advance paid will be refunded. Cancellation requests made after the 24-hour window may not be accepted, particularly once fabric preparation, cutting or stitching has begun. Please contact us as soon as possible if you need to make a change to your order.",
  },
  {
    title: "5. Returns, exchanges and order issues",
    text: "Made-to-order and custom-stitched outfits are prepared specifically for you and generally cannot be returned or exchanged because of a change of mind or incorrect customer-provided measurements. If your order arrives damaged, incorrect or with a manufacturing issue, contact us promptly with your order number and clear photographs so we can review it.",
  },
  {
    title: "6. Product colours and details",
    text: "We make every effort to show product colours and details accurately. Actual shades may vary slightly due to lighting, photography and individual screen settings. Please read the product description and review the available photographs before ordering.",
  },
  {
    title: "7. Payments",
    text: "A 35% advance payment of the total order value is required to confirm your order. The remaining balance will be payable according to the payment instructions communicated to you. Your payment status is confirmed through the payment method used for your order. Please keep your order number and payment confirmation for reference. Never share your card PIN, password or one-time verification code with anyone claiming to represent us.",
  },
];

export default function OrderPoliciesPage() {
  return (
    <InfoPageLayout
      eyebrow="Before you order"
      title="Order Policies"
      intro="Every outfit from The Mehndi Edit is chosen with care and prepared with craftsmanship. Please review these guidelines before placing your order."
    >
      <div className="space-y-5">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-2xl border border-[#EADFCB] bg-white p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold sm:text-2xl">
              {section.title}
            </h2>
            <p className="mt-3 leading-7 text-[#77704E]">{section.text}</p>
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-gradient-to-r from-[#F49A62]/20 via-[#F6CE69]/25 to-[#F3A9B5]/20 p-6 text-center sm:p-8">
        <h2 className="text-2xl font-semibold">Need help with an order?</h2>
        <p className="mt-3 leading-7 text-[#77704E]">
          We are happy to help you understand your options before you order.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex rounded-full bg-button-gradient px-7 py-3 font-semibold text-[#59402F] transition hover:opacity-90"
        >
          Contact Us
        </Link>
      </div>
    </InfoPageLayout>
  );
}
