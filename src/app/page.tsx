import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import BrandStory from "@/components/home/BrandStory";

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Header />

      <main>
        <Hero />
        <FeaturedCollections />
        <BrandStory />
      </main>

      <Footer />
    </>
  );
}
