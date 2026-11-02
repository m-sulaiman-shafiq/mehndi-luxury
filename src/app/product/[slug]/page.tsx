export const instant = false;
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="min-h-screen bg-[#FAF8F4] px-6 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-[#A7834D]">
        The Mehndi Edit
      </p>
      <h1 className="mt-5 font-heading text-4xl text-[#211D19] sm:text-6xl">
        {title}
      </h1>
      <p className="mt-6 text-sm text-[#777068]">
        Product details coming soon.
      </p>
    </main>
  );
}
