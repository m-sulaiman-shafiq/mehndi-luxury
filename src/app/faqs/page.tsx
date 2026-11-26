import Link from "next/link";
import InfoPageLayout from "@/components/layout/InfoPageLayout";

const faqs = [
  {
    question: "Are your outfits ready to wear or made to order?",
    answer:
      "Our collection includes made-to-order designs. The product page explains the outfit and available options. Please check the product details before placing your order.",
  },
  {
    question: "Can I order an outfit unstitched?",
    answer:
      "Yes. You can select Unstitched on the product page to receive the fabric without stitching.",
  },
  {
    question: "Can I get my outfit stitched according to my measurements?",
    answer:
      "Yes. Select Stitched and enter the required measurements in inches. Please provide accurate measurements so our tailoring team has the information needed to prepare your outfit.",
  },
  {
    question: "Do you offer standard sizes like Small, Medium or Large?",
    answer:
      "Our current product page offers Unstitched and custom Stitched options rather than standard XS, S, M or L sizing. For stitched orders, we use the measurements you provide.",
  },
  {
    question: "Can I change my measurements after placing an order?",
    answer:
      "Please contact us as soon as possible with your order number. We will check whether the measurements can still be updated. Changes may not be possible once tailoring has started.",
  },
  {
    question: "How long will my order take?",
    answer:
      "Our estimated delivery time is 5–15 working days after order confirmation. This includes outfit preparation and delivery. The exact timing may vary depending on the design, stitching requirements, destination and courier service. We will share updates when available.",
  },
  {
    question: "Do you deliver to my city?",
    answer:
      "Delivery availability depends on courier coverage. Contact us with your city and area if you would like to confirm delivery availability before ordering.",
  },
  {
    question: "How much advance payment is required?",
    answer:
      "A 35% advance payment of the total order value is required to confirm your order. The remaining balance is payable according to the payment instructions shared with you. Please keep your order number and payment confirmation for reference.",
  },
  {
    question: "Can I cancel my order after placing it?",
    answer:
      "Cancellation requests are accepted within 24 hours after order confirmation. Once your cancellation is accepted, the refund will be processed within 24 hours, after deducting 10% of the advance payment received. This means 90% of the advance paid will be refunded. Cancellation requests after the 24-hour window may not be accepted, especially once production has begun. Custom-made or custom-stitched outfits generally cannot be returned because of a change of mind or incorrect customer-provided measurements. If your order arrives damaged or incorrect, please contact us so we can review the issue.",
  },
  {
    question: "Will the colour look exactly like the photos?",
    answer:
      "We try to represent each design accurately. Slight colour differences may occur because of lighting, photography and screen settings.",
  },
  {
    question: "How do I ask about a particular design?",
    answer:
      "Visit our Contact Us page and include the product name or product code, if available. Our team can help with product details and ordering questions.",
  },
];

export default function FAQsPage() {
  return (
    <InfoPageLayout
      eyebrow="Here to help"
      title="Frequently Asked Questions"
      intro="From choosing your outfit to custom stitching and delivery, here are answers to some questions customers often have."
    >
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={faq.question}
            className="group rounded-2xl border border-[#EADFCB] bg-white p-5 sm:p-7"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold sm:text-lg">
              <span>
                <span className="mr-3 text-sm font-medium text-[#A47743]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {faq.question}
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F6CE69]/25 text-xl transition group-open:rotate-45">
                +
              </span>
            </summary>

            <p className="mt-5 border-t border-[#EADFCB] pt-5 leading-7 text-[#77704E]">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold">Still have a question?</h2>
        <p className="mt-3 text-[#77704E]">
          We would love to help you find the right outfit.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex rounded-full bg-button-gradient px-7 py-3 font-semibold text-[#59402F] transition hover:opacity-90"
        >
          Contact Our Team
        </Link>
      </div>
    </InfoPageLayout>
  );
}
