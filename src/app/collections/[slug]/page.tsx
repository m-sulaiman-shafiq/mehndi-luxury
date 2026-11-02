import Container from "@/components/ui/Container";

export const instant = false;

interface CollectionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;

  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="min-h-screen bg-[#FAF8F4] py-24">
      <Container>
        <p className="text-center text-xs uppercase tracking-[0.3em] text-[#A7834D]">
          Explore Our Collection
        </p>

        <h1 className="mt-5 text-center font-heading text-4xl text-[#211D19] sm:text-5xl">
          {title}
        </h1>

        <p className="mt-6 text-center text-sm text-[#777068]">
          Beautiful pieces, thoughtfully curated. Our collection is coming soon.
        </p>
      </Container>
    </main>
  );
}
