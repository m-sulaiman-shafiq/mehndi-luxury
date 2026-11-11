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
      ? "bg-button-gradient text-[#59402F] shadow-sm hover:shadow-md hover:-translate-y-0.5"
      : "border border-[#D9C69B] bg-transparent text-[#59402F] hover:bg-[#FFF0D0]";

  const classes = `
    inline-flex items-center justify-center
    rounded-full px-7 py-3.5
    text-sm font-semibold
    tracking-wide
    transition-all duration-300
    focus-visible:outline-2
    focus-visible:outline-offset-4
    focus-visible:outline-[#E8B65F]
    ${styles}
    ${className}
  `;

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
