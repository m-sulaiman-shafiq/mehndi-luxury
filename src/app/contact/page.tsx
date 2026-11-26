import InfoPageLayout from "@/components/layout/InfoPageLayout";
import ContactForm from "@/components/content/ContactForm";

export default function ContactPage() {
  return (
    <InfoPageLayout
      eyebrow="We are here for you"
      title="Contact Us"
      intro="Have a question about a design, custom stitching, your order or delivery? Send us a message and our team will be happy to assist."
    >
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <aside className="space-y-5">
          <div className="rounded-2xl border border-[#EADFCB] bg-white p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A47743]">
              Email us
            </p>

            <h2 className="mt-3 text-2xl font-semibold">Customer Support</h2>

            <p className="mt-3 leading-7 text-[#77704E]">
              For product questions, order assistance, stitching inquiries and
              delivery support, please email us.
            </p>

            <a
              href="mailto:theroyalfabrics.fsd@gmail.com"
              className="mt-5 block break-all font-semibold text-[#A47743] underline underline-offset-4"
            >
              theroyalfabrics.fsd@gmail.com
            </a>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[#F49A62]/20 via-[#F6CE69]/25 to-[#F3A9B5]/25 p-6 sm:p-8">
            <h2 className="text-xl font-semibold">Shopping with us?</h2>

            <p className="mt-3 leading-7 text-[#77704E]">
              If you have already placed an order, include your order number in
              your message so we can assist you more efficiently.
            </p>
          </div>
        </aside>

        <ContactForm />
      </div>
    </InfoPageLayout>
  );
}
