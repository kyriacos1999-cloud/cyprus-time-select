import { Truck, ShieldCheck, Banknote, Award } from "lucide-react";
import { motion } from "framer-motion";

const props = [
  { icon: Truck, text: "Free Next-Day Delivery" },
  { icon: Award, text: "1-Year Warranty" },
  { icon: Banknote, text: "Cash on Delivery" },
  { icon: ShieldCheck, text: "Secure Checkout" },
];

const ValuePropsStrip = () => (
  <section className="py-6 md:py-8 bg-secondary/50 border-y border-border/30">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-center gap-6 md:gap-12">
        {props.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex items-center gap-2"
          >
            <p.icon className="w-4 h-4 text-primary shrink-0" />
            <span className="text-foreground text-xs md:text-sm font-medium tracking-wide">
              {p.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ValuePropsStrip;
