import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { icon: Truck, text: "Next-Day Cyprus Delivery" },
  { icon: ShieldCheck, text: "Secure Payments" },
  { icon: RotateCcw, text: "Easy Returns" },
  { icon: Headphones, text: "Local Customer Support" },
];

const TrustBar = () => (
  <section className="bg-secondary py-5 border-y border-border">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex items-center gap-3 justify-center"
          >
            <item.icon className="w-4 h-4 text-accent shrink-0" />
            <span className="text-foreground text-xs md:text-sm font-medium tracking-wide">
              {item.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBar;
