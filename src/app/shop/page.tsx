"use client";

import { useMemo, useState } from "react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";

const categories = ["All", "Mehndi", "Bridal", "Formals"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("featured");

  const filteredProducts = useMemo(() => {
    let result =
      activeCategory === "All"
        ? [...products]
        : products.filter((product) => product.category === activeCategory);

    if (sortOrder === "low-high") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, sortOrder]);

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="min-h-screen bg-page-gradient">
        {/* Shop introduction */}
        <section className="bg-brand-gradient py-16 text-center md:py-24">
          <Container>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#59402F]">
              THE MEHNDI EDIT COLLECTION
            </p>

            <h1 className="text-[#59402F]">Discover Your Perfect Look</h1>

            <p className="mx-auto mt-5 max-w-2xl text-base text-[#59402F]">
              Explore thoughtfully crafted outfits for weddings, celebrations
              and unforgettable occasions.
            </p>
          </Container>
        </section>

        {/* Products */}
        <section className="py-16 md:py-24">
          <Container>
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
              {/* Category filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-button-gradient text-[#59402F] shadow-sm"
                        : "border border-[#EADFCB] bg-white text-[#59402F] hover:bg-[#FFF0D0]"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sorting */}
              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                className="rounded-full border border-[#EADFCB] bg-white px-5 py-3 text-sm text-[#59402F] outline-none"
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>

            {/* Product count */}
            <div className="mb-8">
              <p className="text-sm text-[#77704E]">
                Showing {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </p>
            </div>

            {/* Product grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <h2 className="text-2xl font-semibold">No products found</h2>
                <p className="mt-3 text-[#77704E]">
                  Try selecting another category.
                </p>
              </div>
            )}
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
