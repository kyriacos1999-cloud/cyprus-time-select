import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhyBuySection from "@/components/WhyBuySection";

const WhyUsPage = () => (
  <main>
    <Navbar />
    <div className="pt-14">
      <WhyBuySection />
    </div>
    <Footer />
  </main>
);

export default WhyUsPage;
