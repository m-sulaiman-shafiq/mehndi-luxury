"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, ShoppingBag } from "lucide-react";
import Container from "@/components/ui/Container";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/shop" },
  { label: "Mehndi Edit", href: "/collections/mehndi" },
  { label: "Luxury Formals", href: "/collections/formals" },
  { label: "Our Story", href: "/about" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-ivory/95 backdrop-blur-md">
      <Container>
        <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center gap-4">
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <nav className="hidden items-center justify-end gap-5 xl:gap-7 lg:flex">
            {navigation.slice(0, 3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[10px] font-medium uppercase tracking-[0.15em] transition hover:text-antique-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/" className="text-center whitespace-nowrap">
            <span className="block font-heading text-2xl tracking-wide sm:text-3xl">
              The Mehndi Edit
            </span>
            <span className="hidden text-[8px] uppercase tracking-[0.35em] text-muted-olive sm:block">
              A celebration of craftsmanship
            </span>
          </Link>

          <nav className="hidden items-center justify-end gap-5 xl:gap-7 lg:flex">
            {navigation.slice(3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[10px] font-medium uppercase tracking-[0.15em] transition hover:text-antique-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-4 lg:ml-0">
            <button
              aria-label="Search"
              className="transition hover:text-antique-gold"
            >
              <Search size={19} strokeWidth={1.5} />
            </button>
            <Link href="/cart" aria-label="Shopping bag">
              <ShoppingBag size={19} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </Container>

      {menuOpen && (
        <div className="border-t border-border bg-ivory px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-5">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-xs font-medium uppercase tracking-[0.15em]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
