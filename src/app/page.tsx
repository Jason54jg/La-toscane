import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { MenuSection } from "@/components/sections/MenuSection";
import { OffersSection } from "@/components/sections/OffersSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { InfoSection } from "@/components/sections/InfoSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MenuSection />
        <OffersSection />
        <ReviewsSection />
        <InfoSection />
      </main>
      <Footer />
    </>
  );
}
