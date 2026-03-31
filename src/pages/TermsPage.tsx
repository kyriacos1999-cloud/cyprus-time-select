import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const TermsPage = () => (
  <main>
    <Navbar />
    <div className="pt-14 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl md:text-5xl font-display text-foreground tracking-tight mb-6">Terms & Conditions</h1>
          <p className="text-muted-foreground text-xs font-light mb-8">Last updated: March 2026</p>

          <div className="space-y-8 text-sm text-muted-foreground font-light leading-relaxed">
            <div>
              <h2 className="text-xl font-display text-foreground mb-3">1. General</h2>
              <p>By using replic8.shop and placing an order, you agree to these terms. Replic8 operates as an online men's watch store serving customers in Cyprus.</p>
            </div>
            <div>
              <h2 className="text-xl font-display text-foreground mb-3">2. Products</h2>
              <p>We make every effort to ensure product descriptions, images, and specifications are accurate. Minor variations in colour or finish may occur between product photos and the actual item.</p>
            </div>
            <div>
              <h2 className="text-xl font-display text-foreground mb-3">3. Pricing</h2>
              <p>All prices are displayed in Euros (€) and include applicable taxes. We reserve the right to update prices at any time. The price at the time of order confirmation is the price you pay.</p>
            </div>
            <div>
              <h2 className="text-xl font-display text-foreground mb-3">4. Orders & Payment</h2>
              <p>Orders are confirmed upon successful payment or, for cash on delivery orders, upon dispatch. We accept Visa, Mastercard, Apple Pay, Google Pay, and cash on delivery (with a €30 surcharge).</p>
            </div>
            <div>
              <h2 className="text-xl font-display text-foreground mb-3">5. Delivery</h2>
              <p>We offer free delivery across Cyprus. Estimated delivery time is 1–2 business days. While we strive to meet delivery estimates, occasional delays may occur due to circumstances beyond our control.</p>
            </div>
            <div>
              <h2 className="text-xl font-display text-foreground mb-3">6. Returns & Refunds</h2>
              <p>Returns are accepted within 14 days of delivery. Items must be unworn and in original packaging. Refunds are processed within 5 business days of receiving the returned item. See our Returns & Refunds page for full details.</p>
            </div>
            <div>
              <h2 className="text-xl font-display text-foreground mb-3">7. Warranty</h2>
              <p>All watches include a 1-year warranty covering manufacturing defects. The warranty does not cover damage caused by misuse, accidents, or unauthorized modifications.</p>
            </div>
            <div>
              <h2 className="text-xl font-display text-foreground mb-3">8. Limitation of Liability</h2>
              <p>Replic8's liability is limited to the purchase price of the product. We are not liable for indirect or consequential damages.</p>
            </div>
            <div>
              <h2 className="text-xl font-display text-foreground mb-3">9. Contact</h2>
              <p>For questions about these terms, contact us at <a href="mailto:support@replic8.shop" className="text-accent hover:underline">support@replic8.shop</a>.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    <Footer />
  </main>
);

export default TermsPage;
