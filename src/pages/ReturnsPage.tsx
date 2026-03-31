import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const ReturnsPage = () => (
  <main>
    <Navbar />
    <div className="pt-14 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl md:text-5xl font-display text-foreground tracking-tight mb-6">Returns & Refunds</h1>
          <p className="text-muted-foreground text-base leading-relaxed font-light mb-8">
            We want you to be completely happy with your purchase. If something isn't right, we make returns simple.
          </p>

          <h2 className="text-2xl font-display text-foreground mb-4">14-Day Return Window</h2>
          <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
            You have 14 days from the date of delivery to request a return. The watch must be unworn and in its original packaging with all accessories included.
          </p>

          <h2 className="text-2xl font-display text-foreground mb-4">How to Return</h2>
          <ol className="space-y-4 text-sm text-muted-foreground font-light mb-8">
            <li className="flex gap-3">
              <span className="text-accent font-display text-base">1.</span>
              <span>Email us at <a href="mailto:support@replic8.shop" className="text-accent hover:underline">support@replic8.shop</a> with your order details and reason for return.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-display text-base">2.</span>
              <span>We'll send you a prepaid return label within 24 hours.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-display text-base">3.</span>
              <span>Pack the watch securely in its original box and drop it off at a courier point.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-display text-base">4.</span>
              <span>Once we receive the watch and confirm its condition, we'll process your full refund within 5 business days.</span>
            </li>
          </ol>

          <h2 className="text-2xl font-display text-foreground mb-4">Refund Method</h2>
          <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8">
            Refunds are issued to your original payment method. For card payments, allow 5–10 business days for the refund to appear on your statement. Cash on delivery returns are refunded via bank transfer.
          </p>

          <h2 className="text-2xl font-display text-foreground mb-4">Exceptions</h2>
          <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8">
            Watches that show signs of wear, damage, or missing accessories may not be eligible for a full refund. In such cases, we'll contact you to discuss options.
          </p>

          <div className="bg-secondary/50 p-6 rounded-sm">
            <p className="text-sm text-muted-foreground font-light">
              Questions about returns? Contact us at <a href="mailto:support@replic8.shop" className="text-accent hover:underline">support@replic8.shop</a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
    <Footer />
  </main>
);

export default ReturnsPage;
