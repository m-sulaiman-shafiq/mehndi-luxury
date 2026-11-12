import { Suspense } from "react";
import ProductDetailsClient from "./ProductDetailsClient";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

async function ProductPageContent({ params }: ProductPageProps) {
  const { slug } = await params;

  return <ProductDetailsClient slug={slug} />;
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#FFF9E9]" />}>
      <ProductPageContent params={params} />
    </Suspense>
  );
}
