import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const StickyMobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const orderSection = document.getElementById("order-section");
      const pastHero = window.scrollY > window.innerHeight * 0.85;
      const atOrderForm = orderSection
        ? window.scrollY + window.innerHeight > orderSection.offsetTop + 80
        : false;
      setVisible(pastHero && !atOrderForm);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        >
          <div className="bg-background/95 backdrop-blur-md border-t border-border px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
              className="flex-1 bg-primary text-primary-foreground text-xs tracking-[0.15em] uppercase font-medium py-3.5 hover:bg-rolex-green-light transition-colors duration-300"
            >
              View Collection
            </button>
            <button
              onClick={() => document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" })}
              className="flex-1 border border-primary text-primary text-xs tracking-[0.15em] uppercase font-medium py-3.5 hover:bg-primary/5 transition-colors duration-300"
            >
              Start Your Order
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyMobileCTA;
