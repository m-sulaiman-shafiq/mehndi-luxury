import StaticPageLayout from "@/components/ui/StaticPageLayout";

export default function AboutPage() {
  return (
    <StaticPageLayout
      eyebrow="The People Behind The Mehndi Edit"
      title="A Story of Two Hearts & One Vision"
      description="Founded by M. Sulaiman Shafiq and Hifza Sulaiman — with a simple belief that elegance should be within everyone's reach."
    >
      <div>
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#A7834D]">
          Where It All Began
        </p>

        <h2 className="font-heading text-3xl text-[#211D19]">
          A Little Dream, A Beautiful Beginning
        </h2>

        <p className="mt-5">
          Every meaningful journey begins with an idea. Ours began with a simple
          conversation between two people, M. Sulaiman Shafiq and his wife,
          Hifza Sulaiman.
        </p>

        <p className="mt-5">
          They shared a vision of making the experience of finding beautiful,
          luxurious fashion simpler, more enjoyable and accessible. They
          believed that looking and feeling extraordinary should not mean
          spending beyond one's means or losing precious hours visiting shop
          after shop.
        </p>
      </div>

      <div>
        <h2 className="font-heading text-3xl text-[#211D19]">
          Luxury Without the Hassle
        </h2>

        <p className="mt-5">
          They imagined a place where customers could discover thoughtfully
          selected outfits, appreciate beautiful craftsmanship and explore
          elegant designs from the comfort of their own homes.
        </p>

        <p className="mt-5">
          No unnecessary shopping trips. No endless searching. Just a more
          convenient way to discover fashion that feels special, without making
          luxury feel out of reach.
        </p>
      </div>

      <div>
        <h2 className="font-heading text-3xl text-[#211D19]">
          More Than Just Fashion
        </h2>

        <p className="mt-5">
          The Mehndi Edit was born from this shared vision: to bring together
          the charm of traditional South Asian fashion, contemporary elegance
          and a thoughtful shopping experience.
        </p>

        <p className="mt-5">
          Every collection reflects a love for detail, an appreciation for
          individuality and a belief that beautiful things should be enjoyed,
          not made complicated.
        </p>
      </div>

      <div className="border-t border-[#D8C9B2] pt-10 text-center">
        <p className="font-heading text-3xl italic text-[#A7834D]">
          "Elegance should never feel out of reach."
        </p>

        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[#211D19]">
          M. Sulaiman Shafiq & Hifza Sulaiman
        </p>

        <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-[#A7834D]">
          Founders · The Mehndi Edit
        </p>
      </div>
    </StaticPageLayout>
  );
}
