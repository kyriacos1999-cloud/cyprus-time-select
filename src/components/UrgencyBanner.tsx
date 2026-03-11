import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TARGET_HOURS = 24;

const getEndTime = () => {
  const stored = localStorage.getItem("replic8_offer_end");
  if (stored) {
    const end = parseInt(stored, 10);
    if (end > Date.now()) return end;
  }
  const end = Date.now() + TARGET_HOURS * 60 * 60 * 1000;
  localStorage.setItem("replic8_offer_end", String(end));
  return end;
};

const pad = (n: number) => String(n).padStart(2, "0");

const UrgencyBanner = () => {
  const [endTime] = useState(getEndTime);
  const [remaining, setRemaining] = useState(endTime - Date.now());

  useEffect(() => {
    const tick = setInterval(() => {
      const diff = endTime - Date.now();
      setRemaining(diff > 0 ? diff : 0);
    }, 1000);
    return () => clearInterval(tick);
  }, [endTime]);

  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  if (remaining <= 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-foreground text-background py-2.5 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-3 text-xs md:text-sm"
        >
          <span className="tracking-wide font-medium uppercase text-[10px] md:text-xs">
            🔥 Free delivery ends in
          </span>
          <div className="flex items-center gap-1 font-mono">
            <span className="bg-background/15 px-2 py-1 rounded-sm text-sm md:text-base font-semibold">
              {pad(hours)}
            </span>
            <span className="text-background/50">:</span>
            <span className="bg-background/15 px-2 py-1 rounded-sm text-sm md:text-base font-semibold">
              {pad(minutes)}
            </span>
            <span className="text-background/50">:</span>
            <span className="bg-background/15 px-2 py-1 rounded-sm text-sm md:text-base font-semibold">
              {pad(seconds)}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UrgencyBanner;
