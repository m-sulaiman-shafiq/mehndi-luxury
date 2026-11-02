import StaticPageLayout from "@/components/ui/StaticPageLayout";

export default function ShippingPage() {
  return (
    <StaticPageLayout
      eyebrow="Delivery Information"
      title="Shipping & Delivery"
      description="Everything you need to know about receiving your order."
    >
      <div>
        <h2 className="font-heading text-2xl text-[#211D19]">
          Order Processing
        </h2>
        <p className="mt-4">
          Orders are processed after confirmation. Processing times may vary
          depending on product availability and customisation.
        </p>
      </div>

      <div>
        <h2 className="font-heading text-2xl text-[#211D19]">Delivery</h2>
        <p className="mt-4">
          Delivery timelines, shipping charges and available destinations will
          be communicated during order confirmation.
        </p>
      </div>
    </StaticPageLayout>
  );
}
