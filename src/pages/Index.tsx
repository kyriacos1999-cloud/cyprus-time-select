import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import CollectionGrid from "@/components/CollectionGrid";
import ProductSection from "@/components/ProductSection";
import WhyBuySection from "@/components/WhyBuySection";
import HowItWorks from "@/components/HowItWorks";
import TikTokGrid from "@/components/TikTokGrid";
import SocialProof from "@/components/SocialProof";
import DeliveryReturnsBlock from "@/components/DeliveryReturnsBlock";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <TrustBar />
      <CollectionGrid />
      <ProductSection />
      <WhyBuySection />
      <HowItWorks />
      <TikTokGrid />
      <SocialProof />
      <DeliveryReturnsBlock />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Index;
