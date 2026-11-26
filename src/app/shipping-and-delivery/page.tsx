import Link from "next/link";
import InfoPageLayout from "@/components/layout/InfoPageLayout";

const sections = [
  {
    title: "Order preparation and delivery time",
    text: "The estimated delivery time for orders from The Mehndi Edit is 5–15 working days after order confirmation. This timeframe includes the preparation of your outfit and delivery to your provided address. Made-to-order and custom-stitched outfits require careful preparation, so the exact timing may vary depending on the design, fabric availability, tailoring requirements and destination.",
  },
  {
    title: "Dispatch and delivery updates",
    text: "We aim to deliver your order within the communicated 5–15 working day timeframe. Once your outfit is ready and dispatched, we will share tracking information where available. Delivery may occasionally take longer due to courier delays, weather, public holidays or circumstances outside our control. If we anticipate a significant delay, we will do our best to keep you informed.",
  },
  {
    title: "Shipping charges",
    text: "Any applicable shipping charges will be communicated or displayed before your order is finalized. If a special delivery arrangement is required, we will confirm the cost with you before proceeding.",
  },
  {
    title: "Delivery address",
    text: "Please provide a complete and accurate delivery address, including city, area, postal code where applicable, and a reachable phone number. If you need to update your address, contact us as early as possible. Address changes may not be possible after dispatch.",
  },
  {
    title: "Tracking and delivery attempts",
    text: "Where courier tracking is available, we will share the tracking information after dispatch. Please keep your phone available for courier communication and delivery attempts.",
  },
  {
    title: "Delayed, damaged or missing parcels",
    text: "If your parcel appears delayed, damaged or has not arrived within the communicated estimate, contact us with your order number. If the package is visibly damaged at delivery, please take photographs and inform us promptly.",
  },
  {
    title: "Delivery availability",
    text: "Delivery availability and timelines depend on your destination and courier coverage. Please confirm your delivery location with us if you are unsure whether we can ship to your area.",
  },
];

export default function ShippingPage() {
  return (
    <InfoPageLayout
      eyebrow="From our hands to yours"
      title="Shipping & Delivery"
      intro="We want your Mehndi Edit outfit to reach you safely and with care. Here is what to expect after placing your order."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {sections.map((section, index) => (
          <section
            key={section.title}
            className={`rounded-2xl border border-[#EADFCB] bg-white p-6 sm:p-8 ${
              index === 0 ? "md:col-span-2" : ""
            }`}
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F6CE69]/30 text-sm font-semibold">
              {String(index + 1).padStart(2, "0")}
            </div>
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="mt-3 leading-7 text-[#77704E]">{section.text}</p>
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-[#EADFCB] bg-white p-6 text-center sm:p-8">
        <h2 className="text-2xl font-semibold">Have a delivery question?</h2>
        <p className="mt-3 leading-7 text-[#77704E]">
          Send us your order number and delivery city, and we will help you
          check the latest information.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex rounded-full bg-button-gradient px-7 py-3 font-semibold text-[#59402F] transition hover:opacity-90"
        >
          Ask About Delivery
        </Link>
      </div>
    </InfoPageLayout>
  );
}
