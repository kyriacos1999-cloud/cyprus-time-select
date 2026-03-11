import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

const PROMO_KEY = "replic8_promo_seen";

const PromoPopup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(PROMO_KEY);
    if (!seen) {
      const timer = setTimeout(() => setVisible(true), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(PROMO_KEY, "1");
  };

  const copyCode = () => {
    navigator.clipboard.writeText("WELCOME10");
    dismiss();
    document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-[60]"
            onClick={dismiss}
          />
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-background border border-border p-8 md:p-10 max-w-sm w-full text-center relative pointer-events-auto shadow-2xl">
              <button
                onClick={dismiss}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Gift className="w-7 h-7 text-primary" />
              </div>

              <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-medium mb-2">
                Exclusive Offer
              </p>
              <h3 className="font-display text-2xl md:text-3xl text-foreground tracking-tight mb-2">
                10% Off Your First Order
              </h3>
              <p className="text-muted-foreground text-sm font-light mb-6 leading-relaxed">
                Welcome to Replic8. Use the code below at checkout to enjoy 10% off your first timepiece.
              </p>

              <div className="bg-secondary border border-border px-5 py-3 mb-6">
                <span className="font-display text-xl tracking-[0.2em] text-foreground">WELCOME10</span>
              </div>

              <Button
                onClick={copyCode}
                className="w-full bg-primary hover:bg-rolex-green-light text-primary-foreground font-medium tracking-wider uppercase text-xs py-5 rounded-none transition-all duration-300"
              >
                Copy Code & Shop Now
              </Button>

              <p className="text-muted-foreground/60 text-[10px] mt-4 font-light">
                First-time customers only · Limited time
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PromoPopup;
