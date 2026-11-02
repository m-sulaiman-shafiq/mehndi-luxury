
import Container from "@/components/ui/Container";

interface StaticPageLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function StaticPageLayout({
  eyebrow,
  title,
  description,
  children,
}: StaticPageLayoutProps) {
  return (
    <main className="bg-[#FAF8F4]">
      <section className="border-b border-[#E8E0D5] py-20 text-center sm:py-28">
        <Container>
          <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-[#A7834D]">
            {eyebrow}
          </p>
          <h1 className="font-heading text-4xl text-[#211D19] sm:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#777068] sm:text-base">
            {description}
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl space-y-10 text-sm leading-8 text-[#625B53] sm:text-base">
            {children}
          </div>
        </Container>
      </section>
    </main>
  );
}
