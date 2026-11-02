import StaticPageLayout from "@/components/ui/StaticPageLayout";

export default function ReturnsPage() {
  return (
    <StaticPageLayout
      eyebrow="Customer Care"
      title="Returns & Exchanges"
      description="Our approach to making your shopping experience seamless."
    >
      <div>
        <h2 className="font-heading text-2xl text-[#211D19]">Our Policy</h2>
        <p className="mt-4">
          Return and exchange eligibility depends on the product, its condition
          and the terms confirmed at the time of purchase. Please contact our
          team before sending an item back.
        </p>
      </div>

      <div>
        <h2 className="font-heading text-2xl text-[#211D19]">Custom Orders</h2>
        <p className="mt-4">
          Customised and made-to-order pieces may have different return and
          exchange conditions. These will be communicated before your order is
          confirmed.
        </p>
      </div>
    </StaticPageLayout>
  );
}
