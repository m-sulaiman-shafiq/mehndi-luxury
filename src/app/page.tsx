import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import BrandStory from "@/components/home/BrandStory";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Header />

      <main>
        <Hero />
        <FeaturedCollections />
        <FeaturedProducts />
        <BrandStory />
      </main>

      <Footer />
    </>
  );
}
