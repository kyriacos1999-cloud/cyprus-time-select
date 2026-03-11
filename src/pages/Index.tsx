import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import CollectionGrid from "@/components/CollectionGrid";
import ProductSection from "@/components/ProductSection";
import WhyBuySection from "@/components/WhyBuySection";
import SocialProof from "@/components/SocialProof";
import OrderForm from "@/components/OrderForm";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => (
  <main>
    <Navbar />
    <HeroSection />
    <TrustBar />
    <CollectionGrid />
    <ProductSection />
    <WhyBuySection />
    <SocialProof />
    <OrderForm />
    <FAQSection />
    <FinalCTA />
    <Footer />
  </main>
);

export default Index;
