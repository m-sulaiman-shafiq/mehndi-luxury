import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <article>
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#F0EDE7]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {product.madeToOrder && (
            <span className="absolute left-3 top-3 rounded-full bg-[#FFF9E9] px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[#59402F]">
              Made to order
            </span>
          )}
        </div>

        <div className="pt-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[#77704E]">
            {product.category}
          </p>

          <h3 className="mt-2 text-xl font-semibold text-[#59402F]">
            {product.name}
          </h3>

          <p className="mt-2 text-sm text-[#77704E]">
            PKR {product.price.toLocaleString("en-PK")}
          </p>

          <p className="mt-3 text-sm font-medium text-[#A47743] underline underline-offset-4">
            View Details
          </p>
        </div>
      </article>
    </Link>
  );
}
