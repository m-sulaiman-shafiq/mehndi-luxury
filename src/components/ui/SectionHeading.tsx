interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-olive">
          {eyebrow}
        </p>
      )}

      <h2 className="text-4xl leading-tight text-charcoal sm:text-5xl lg:text-6xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-sm leading-7 text-muted-olive sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
