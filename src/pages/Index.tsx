import { useState } from "react";
import Navbar from "@/components/Navbar";
import UrgencyBanner from "@/components/UrgencyBanner";
import HeroSection from "@/components/HeroSection";

import TrustBar from "@/components/TrustBar";
import CollectionGrid from "@/components/CollectionGrid";
import ProductSection from "@/components/ProductSection";
import WhyBuySection from "@/components/WhyBuySection";
import SocialProof from "@/components/SocialProof";
import OrderForm from "@/components/OrderForm";
import FAQSection from "@/components/FAQSection";
import SEOContentBlock from "@/components/SEOContentBlock";
import FinalCTA from "@/components/FinalCTA";
import PreorderSection from "@/components/PreorderSection";
import Footer from "@/components/Footer";
import RecentPurchaseToast from "@/components/RecentPurchaseToast";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import ReturningVisitorBanner from "@/components/ReturningVisitorBanner";
import CartAbandonmentReminder from "@/components/CartAbandonmentReminder";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";

import WatchAssemblyIntro from "@/components/WatchAssemblyIntro";

const Index = () => {
  const alreadySeen = sessionStorage.getItem("intro_seen") === "1";
  const [introComplete, setIntroComplete] = useState(alreadySeen);
  useVisitorTracking();

  const handleIntroComplete = () => {
    sessionStorage.setItem("intro_seen", "1");
    setIntroComplete(true);
  };

  return (
    <main>
      {!alreadySeen && <WatchAssemblyIntro onComplete={handleIntroComplete} />}
      
      <ReturningVisitorBanner />
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
      <PreorderSection />
      <SEOContentBlock />
      <FinalCTA />
      <Footer />
      <RecentPurchaseToast />
      <ExitIntentPopup />
      <CartAbandonmentReminder />
      
    </main>
  );
};

export default Index;
