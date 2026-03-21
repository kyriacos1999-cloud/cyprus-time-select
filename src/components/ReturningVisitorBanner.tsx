import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

const ReturningVisitorBanner = () => {
  const [show, setShow] = useState(false);
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const count = parseInt(localStorage.getItem("visit_count") || "0", 10);
    setVisitCount(count);

    // Only show for returning visitors (2+ visits), not if dismissed this session
    if (count >= 2 && !sessionStorage.getItem("returning_banner_dismissed")) {
      setTimeout(() => setShow(true), 1500);
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("returning_banner_dismissed", "1");
    setShow(false);
  };

  const getMessage = () => {
    if (visitCount >= 5) {
      return {
        title: "Welcome back, watch enthusiast! 👋",
        subtitle: "Ready to make it yours? Free next-day delivery on all orders.",
        cta: "Complete Your Order",
      };
    }
    if (visitCount >= 3) {
      return {
        title: "Good to see you again! 🎯",
        subtitle: "Still thinking about that timepiece? Our watches are selling fast.",
        cta: "View the Collection",
      };
    }
    return {
      title: "Welcome back! ⌚",
      subtitle: "Pick up where you left off — explore our premium collection.",
      cta: "Browse Watches",
    };
  };

  const msg = getMessage();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="fixed top-0 left-0 right-0 z-[90] bg-primary text-primary-foreground"
        >
          <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{msg.title}</p>
              <p className="text-xs text-primary-foreground/70 font-light truncate hidden sm:block">
                {msg.subtitle}
              </p>
            </div>
            <button
              onClick={() => {
                dismiss();
                document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase font-medium bg-primary-foreground/10 hover:bg-primary-foreground/20 px-4 py-2 transition-colors whitespace-nowrap"
            >
              {msg.cta}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={dismiss}
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReturningVisitorBanner;
