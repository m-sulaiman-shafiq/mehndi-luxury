import type { ReactNode } from "react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type InfoPageLayoutProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
};

export default function InfoPageLayout({
  eyebrow,
  title,
  intro,
  children,
}: InfoPageLayoutProps) {
  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="min-h-screen bg-[#FFF9E9] px-5 py-12 text-[#59402F] sm:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#A47743]">
              {eyebrow}
            </p>

            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              {title}
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#77704E] sm:text-lg sm:leading-8">
              {intro}
            </p>

            <div className="mx-auto mt-7 h-1 w-24 rounded-full bg-gradient-to-r from-[#F49A62] via-[#F6CE69] to-[#F3A9B5]" />
          </div>

          {children}
        </div>
      </main>

      <Footer />
    </>
  );
}
