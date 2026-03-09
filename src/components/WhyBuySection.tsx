import { Truck, ShieldCheck, Banknote, ListChecks, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  { icon: Truck, title: "Free Next-Day Delivery", desc: "Free delivery anywhere in Cyprus" },
  { icon: ShieldCheck, title: "Secure Payments", desc: "Encrypted & protected online checkout" },
  { icon: Banknote, title: "Cash on Delivery", desc: "Pay upon receipt with a €30 surcharge" },
  { icon: ListChecks, title: "Simple Ordering", desc: "No account needed — order in minutes" },
  { icon: MapPin, title: "Cyprus Exclusive", desc: "Dedicated local service across the island" },
];

const WhyBuySection = () => (
  <section id="why-us" className="py-24 md:py-32 bg-primary">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-primary-foreground/60 text-xs tracking-[0.5em] uppercase mb-4 font-medium">
          The Experience
        </p>
        <h2 className="text-4xl md:text-5xl font-display text-primary-foreground tracking-tight">
          Why Choose Us
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="w-12 h-12 mx-auto mb-5 border border-primary-foreground/20 flex items-center justify-center">
              <r.icon className="w-5 h-5 text-primary-foreground/70" />
            </div>
            <h3 className="font-display text-sm text-primary-foreground mb-2 tracking-wide">{r.title}</h3>
            <p className="text-xs text-primary-foreground/60 leading-relaxed font-light">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyBuySection;
