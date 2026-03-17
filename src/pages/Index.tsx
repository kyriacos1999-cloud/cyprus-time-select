import Navbar from "@/components/Navbar";
import UrgencyBanner from "@/components/UrgencyBanner";
import HeroSection from "@/components/HeroSection";
import PromoPopup from "@/components/PromoPopup";
import TrustBar from "@/components/TrustBar";
import CollectionGrid from "@/components/CollectionGrid";
import ProductSection from "@/components/ProductSection";
import WhyBuySection from "@/components/WhyBuySection";
import SocialProof from "@/components/SocialProof";
import OrderForm from "@/components/OrderForm";
import FAQSection from "@/components/FAQSection";
import SEOContentBlock from "@/components/SEOContentBlock";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

const Index = () => (
  <main>
    <PromoPopup />
    <UrgencyBanner />
    <Navbar />
    <HeroSection />
    <TrustBar />
    <CollectionGrid />
    <ProductSection />
    <WhyBuySection />
    <SocialProof />
    <OrderForm />
    <FAQSection />
    <SEOContentBlock />
    <FinalCTA />
    <Footer />
  </main>
);

export default Index;
