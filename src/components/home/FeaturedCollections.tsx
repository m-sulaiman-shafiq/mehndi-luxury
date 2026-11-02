import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const collections = [
  {
    title: "The Mehndi Edit",
    subtitle: "Celebrating festive traditions",
    image: "/images/collections/mehndi.jpeg",
    href: "/collections/mehndi",
  },
  {
    title: "Luxury Formals",
    subtitle: "Elegance in every detail",
    image: "/images/collections/formals.jpeg",
    href: "/collections/formals",
  },
  {
    title: "Unstitched Luxury",
    subtitle: "Your vision, beautifully crafted",
    image: "/images/collections/unstitched.jpeg",
    href: "/collections/unstitched",
  },
];

export default function FeaturedCollections() {
  return (
    <section className="bg-[#FAF8F4] py-24">
      <Container>
        <SectionHeading
          eyebrow="Discover Our World"
          title="Collections Made for Moments"
          description="Explore thoughtfully curated designs where timeless craftsmanship meets contemporary elegance."
          centered
        />

        <div className="mt-16 grid gap-7 md:grid-cols-3">
          {collections.map((collection) => (
            <Link
              key={collection.title}
              href={collection.href}
              className="group relative block h-[420px] overflow-hidden bg-[#E8E2D9] sm:h-[500px] lg:h-[560px]"
            >
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 w-full p-7 text-white">
                <p className="mb-3 text-[9px] uppercase tracking-[0.25em] text-white/75">
                  {collection.subtitle}
                </p>

                <h3 className="font-heading text-3xl sm:text-4xl">
                  {collection.title}
                </h3>

                <span className="mt-5 inline-block border-b border-[#B49A65] pb-1 text-[10px] uppercase tracking-[0.2em]">
                  Explore Collection →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
