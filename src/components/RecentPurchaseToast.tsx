import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

const cities = ["Limassol", "Nicosia", "Larnaca", "Paphos", "Ayia Napa", "Paralimni"];
const watches = [
  "Submariner No Date",
  "Submariner Hulk",
  "Datejust 36mm",
  "Submariner Blue/Gold",
  "GMT-Master II Sprite",
  "Daytona Black",
];
const times = ["2 minutes ago", "5 minutes ago", "8 minutes ago", "12 minutes ago", "just now"];

const getRandomPurchase = () => ({
  city: cities[Math.floor(Math.random() * cities.length)],
  watch: watches[Math.floor(Math.random() * watches.length)],
  time: times[Math.floor(Math.random() * times.length)],
});

const RecentPurchaseToast = () => {
  const [purchase, setPurchase] = useState<ReturnType<typeof getRandomPurchase> | null>(null);

  useEffect(() => {
    // Show first toast after 15-25 seconds
    const initialDelay = setTimeout(() => {
      showToast();
    }, 15000 + Math.random() * 10000);

    return () => clearTimeout(initialDelay);
  }, []);

  const showToast = () => {
    setPurchase(getRandomPurchase());

    // Hide after 5 seconds
    setTimeout(() => {
      setPurchase(null);
      // Schedule next toast after 30-60 seconds
      setTimeout(showToast, 30000 + Math.random() * 30000);
    }, 5000);
  };

  return (
    <AnimatePresence>
      {purchase && (
        <motion.div
          initial={{ opacity: 0, y: 80, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 z-50 max-w-[280px] bg-background border border-border shadow-lg p-3 rounded-sm"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <ShoppingBag className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-foreground font-medium leading-snug">
                Someone in {purchase.city} ordered a {purchase.watch}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{purchase.time}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RecentPurchaseToast;
