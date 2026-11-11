import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "../products/ProductCard";
import { products } from "@/data/products";

export default function FeaturedProducts() {
  return (
    <section className="bg-[#FAF8F4] py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="THE COLLECTION"
          title="Mehndi, Made Memorable"
          description="Discover thoughtfully crafted outfits for your most special celebrations."
        />

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
