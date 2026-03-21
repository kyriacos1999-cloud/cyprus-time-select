import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, ArrowRight } from "lucide-react";
import { trackEvent } from "@/hooks/useVisitorTracking";

const CartAbandonmentReminder = () => {
  const [show, setShow] = useState(false);
  const [productName, setProductName] = useState("");

  useEffect(() => {
    // Listen for product selections
    const handleSelect = (e: Event) => {
      const id = (e as CustomEvent).detail;
      sessionStorage.setItem("selected_product_id", String(id));
      sessionStorage.setItem("product_selected_at", String(Date.now()));
      sessionStorage.setItem("reached_checkout", "1");
    };
    window.addEventListener("select-product", handleSelect);

    // Check if user selected a product but hasn't completed checkout
    const checkAbandonment = () => {
      const selectedAt = sessionStorage.getItem("product_selected_at");
      const completed = sessionStorage.getItem("checkout_completed");
      const reminderShown = sessionStorage.getItem("cart_reminder_shown");

      if (selectedAt && !completed && !reminderShown) {
        const elapsed = Date.now() - parseInt(selectedAt, 10);
        // Show reminder after 3 minutes of inactivity post-selection
        if (elapsed > 180000) {
          sessionStorage.setItem("cart_reminder_shown", "1");
          setProductName(sessionStorage.getItem("selected_product_name") || "your selected watch");
          setShow(true);
          trackEvent("cart_abandonment_reminder");
        }
      }
    };

    const interval = setInterval(checkAbandonment, 30000);

    // Also track when user scrolls away from checkout after selecting
    const handleScroll = () => {
      const orderSection = document.getElementById("order-section");
      const selectedAt = sessionStorage.getItem("product_selected_at");
      const completed = sessionStorage.getItem("checkout_completed");
      const reminderShown = sessionStorage.getItem("cart_reminder_shown");

      if (orderSection && selectedAt && !completed && !reminderShown) {
        const rect = orderSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (!isVisible) {
          const elapsed = Date.now() - parseInt(selectedAt, 10);
          if (elapsed > 60000) {
            sessionStorage.setItem("cart_reminder_shown", "1");
            setShow(true);
            trackEvent("cart_abandonment_reminder", { metadata: { trigger: "scroll_away" } });
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("select-product", handleSelect);
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const scrollToCheckout = () => {
    setShow(false);
    document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
    trackEvent("cart_reminder_clicked");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-[80]"
        >
          <div className="bg-background border border-border shadow-2xl p-5 relative">
            <button
              onClick={() => setShow(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 bg-primary/10 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-foreground text-sm font-medium mb-1">
                  Don't forget your watch! ⌚
                </p>
                <p className="text-muted-foreground text-xs font-light mb-3">
                  You were so close to completing your order. Finish checkout now and get free next-day delivery.
                </p>
                <button
                  onClick={scrollToCheckout}
                  className="flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Complete Your Order
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartAbandonmentReminder;
