import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Truck, Clock, MapPin, Package } from "lucide-react";

const DeliveryPage = () => (
  <main>
    <Navbar />
    <div className="pt-14 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl md:text-5xl font-display text-foreground tracking-tight mb-6">Delivery Information</h1>
          <p className="text-muted-foreground text-base leading-relaxed font-light mb-12">
            We offer fast, free delivery across all of Cyprus. Here's everything you need to know about receiving your order.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-secondary/50 p-6 rounded-sm">
              <Truck className="w-5 h-5 text-accent mb-3" />
              <h3 className="font-display text-base text-foreground mb-2">Free Next-Day Delivery</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                All orders include free delivery. We dispatch same-day for orders placed before 3 PM.
              </p>
            </div>
            <div className="bg-secondary/50 p-6 rounded-sm">
              <Clock className="w-5 h-5 text-accent mb-3" />
              <h3 className="font-display text-base text-foreground mb-2">Delivery Timing</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Most orders arrive within 1–2 business days. You'll receive tracking information via email.
              </p>
            </div>
            <div className="bg-secondary/50 p-6 rounded-sm">
              <MapPin className="w-5 h-5 text-accent mb-3" />
              <h3 className="font-display text-base text-foreground mb-2">Coverage</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                We deliver to every city and village across Cyprus — Nicosia, Limassol, Larnaca, Paphos, and beyond.
              </p>
            </div>
            <div className="bg-secondary/50 p-6 rounded-sm">
              <Package className="w-5 h-5 text-accent mb-3" />
              <h3 className="font-display text-base text-foreground mb-2">Packaging</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Every watch is carefully packaged in a premium box with protective padding to ensure it arrives in perfect condition.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-display text-foreground mb-4">Cash on Delivery</h2>
          <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8">
            We offer cash on delivery across Cyprus with a small surcharge of €30. This option allows you to inspect and pay for your watch upon receipt. Available for all products and all delivery locations.
          </p>

          <h2 className="text-2xl font-display text-foreground mb-4">Questions?</h2>
          <p className="text-sm text-muted-foreground font-light leading-relaxed">
            Contact us at <a href="mailto:support@replic8.shop" className="text-accent hover:underline">support@replic8.shop</a> for any delivery-related questions.
          </p>
        </motion.div>
      </div>
    </div>
    <Footer />
  </main>
);

export default DeliveryPage;
