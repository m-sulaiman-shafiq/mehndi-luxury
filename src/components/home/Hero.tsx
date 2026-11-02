import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F4]">
      <Container>
        <div className="grid min-h-[650px] items-center gap-12 py-16 lg:grid-cols-2 lg:py-20">
          {/* Hero Content */}
          <div className="order-2 max-w-xl animate-fade-up lg:order-1">
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#77745E]">
              The Art of Celebration
            </p>

            <h1 className="font-heading text-5xl leading-[1.08] text-[#24211F] sm:text-6xl lg:text-7xl">
              Traditional
              <br />
              Craftsmanship.
              <br />
              <span className="italic text-[#B49A65]">Modern Luxury.</span>
            </h1>

            <p className="mt-7 max-w-md text-sm leading-8 text-[#77745E]">
              Bespoke and unstitched Mehndi wear tailored to perfection.
              Discover premium fabrics, intricate artistry and timeless designer
              aesthetics.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="bg-[#24211F] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#B49A65] hover:text-[#24211F]"
              >
                Explore The Mehndi Edit
              </Link>

              <Link
                href="/about"
                className="border border-[#B49A65] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#24211F] transition hover:bg-[#B49A65]"
              >
                Our Story
              </Link>
            </div>

            <p className="mt-8 text-[10px] uppercase tracking-[0.15em] text-[#77745E]">
              Thoughtfully designed · Made to order
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative order-1 h-[420px] overflow-hidden sm:h-[550px] lg:order-2 lg:h-[650px]">
            <Image
              src="/images/homepage-mehndi.jpg"
              alt="Elegant traditional South Asian festive fashion"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />

            <div className="absolute bottom-6 left-6 bg-[#FAF8F4]/90 px-6 py-4 backdrop-blur-sm">
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#77745E]">
                The Collection
              </p>
              <p className="mt-1 font-heading text-2xl text-[#24211F]">
                Made for Moments
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
