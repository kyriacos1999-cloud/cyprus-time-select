import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const PrivacyPage = () => (
  <main>
    <Navbar />
    <div className="pt-14 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl md:text-5xl font-display text-foreground tracking-tight mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground text-xs font-light mb-8">Last updated: March 2026</p>

          <div className="space-y-8 text-sm text-muted-foreground font-light leading-relaxed">
            <div>
              <h2 className="text-xl font-display text-foreground mb-3">1. Information We Collect</h2>
              <p>When you place an order, we collect your name, email address, phone number (optional), billing address, and payment information. Payment details are processed securely by our payment partner and never stored on our servers.</p>
            </div>
            <div>
              <h2 className="text-xl font-display text-foreground mb-3">2. How We Use Your Information</h2>
              <p>We use your information to process orders, arrange delivery, communicate about your purchase, and improve our service. We do not sell or share your personal data with third parties for marketing purposes.</p>
            </div>
            <div>
              <h2 className="text-xl font-display text-foreground mb-3">3. Data Security</h2>
              <p>We use 256-bit SSL encryption to protect your data during transmission. We implement appropriate technical and organizational measures to protect your personal information.</p>
            </div>
            <div>
              <h2 className="text-xl font-display text-foreground mb-3">4. Cookies</h2>
              <p>We use essential cookies to maintain your shopping cart and session. We may use analytics cookies to understand how visitors interact with our website. You can disable cookies through your browser settings.</p>
            </div>
            <div>
              <h2 className="text-xl font-display text-foreground mb-3">5. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at <a href="mailto:support@replic8.shop" className="text-accent hover:underline">support@replic8.shop</a>.</p>
            </div>
            <div>
              <h2 className="text-xl font-display text-foreground mb-3">6. Contact</h2>
              <p>For privacy-related inquiries, email us at <a href="mailto:support@replic8.shop" className="text-accent hover:underline">support@replic8.shop</a>.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    <Footer />
  </main>
);

export default PrivacyPage;
