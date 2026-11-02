import Link from "next/link";
import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="bg-[#24211F] py-16 text-white">
      <Container>
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Link href="/" className="font-heading text-3xl">
              The Mehndi Edit
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/60">
              Celebrating timeless traditions through thoughtful design, premium
              fabrics and exceptional craftsmanship.
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em]">
              Explore
            </h3>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              <Link href="/shop" className="hover:text-antique-gold">
                Shop All
              </Link>
              <Link
                href="/collections/mehndi"
                className="hover:text-antique-gold"
              >
                Mehndi Collection
              </Link>
              <Link
                href="/collections/formals"
                className="hover:text-antique-gold"
              >
                Luxury Formals
              </Link>
              <Link href="/about" className="hover:text-antique-gold">
                Our Story
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em]">
              Customer Care
            </h3>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              <Link href="/contact" className="hover:text-antique-gold">
                Contact Us
              </Link>
              <Link href="/faqs" className="hover:text-antique-gold">
                FAQs
              </Link>
              <Link href="/shipping" className="hover:text-antique-gold">
                Shipping & Delivery
              </Link>
              <Link href="/policies" className="hover:text-antique-gold">
                Order Policies
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/15 pt-7 text-center text-xs text-white/40">
          © 2026 The Mehndi Edit. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
