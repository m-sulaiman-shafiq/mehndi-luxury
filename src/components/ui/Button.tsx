import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-charcoal text-white hover:bg-antique-gold hover:text-charcoal"
      : "border border-charcoal text-charcoal hover:bg-charcoal hover:text-white";

  const classes = `inline-flex items-center justify-center px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${styles} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes}>
      {children}
    </button>
  );
}
