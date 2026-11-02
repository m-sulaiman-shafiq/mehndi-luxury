import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";

export default function BrandStory() {
  return (
    <section className="bg-[#F8F5EF] py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Craftsmanship Image */}
          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute -bottom-4 -right-4 h-full w-full border border-[#B49A65]/50" />

            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/brand-craftsmanship.png"
                alt="Intricate gold embroidery on luxurious bridal fabric"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Brand Story */}
          <div className="relative py-6 lg:py-12">
            <p className="mb-7 flex items-center gap-4 text-[10px] uppercase tracking-[0.35em] text-[#A7834D]">
              <span className="h-px w-10 bg-[#B49A65]" />
              Our Story
              <span className="h-px w-10 bg-[#B49A65]" />
            </p>

            <h2 className="font-heading text-4xl leading-[1.15] text-[#211D19] sm:text-5xl lg:text-[58px]">
              The Art of
              <br />
              <span className="italic text-[#A7834D]">Timeless Elegance</span>
            </h2>

            <div className="mt-8 max-w-[520px] space-y-5 text-[14px] leading-8 text-[#686159] sm:text-base">
              <p>
                At Luxury Mehndi, we believe in more than just fashion. We
                celebrate culture, tradition and the beauty of self-expression.
              </p>

              <p>
                Every design brings together exquisite craftsmanship, luxurious
                fabrics and intricate detailing, thoughtfully created for the
                moments that matter most.
              </p>
            </div>

            <p className="mt-8 font-heading text-xl italic text-[#302820]">
              Because every detail tells a story.
            </p>

            <Link
              href="/our-story"
              className="mt-10 inline-flex items-center gap-5 border border-[#A7834D] px-8 py-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[#806039] transition-all duration-300 hover:bg-[#211D19] hover:text-white"
            >
              Discover Our Story
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
