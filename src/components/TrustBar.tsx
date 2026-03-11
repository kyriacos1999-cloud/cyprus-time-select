import { Package, Truck, ShieldCheck, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { icon: Package, text: "Premium box & papers included" },
  { icon: Truck, text: "Next-day delivery in Cyprus" },
  { icon: ShieldCheck, text: "Secure checkout" },
  { icon: CheckCircle, text: "Quality checked before shipping" },
];

const TrustBar = () => (
  <section className="bg-rolex-green py-4">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex items-center gap-3 justify-center text-center md:text-left"
          >
            <item.icon className="w-5 h-5 text-[hsl(var(--rolex-gold))] shrink-0" />
            <span className="text-primary-foreground text-xs md:text-sm font-medium tracking-wide">
              {item.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBar;
