import { Truck, ShieldCheck, Banknote, ListChecks, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  { icon: Truck, title: "Complimentary Delivery", desc: "Next-day, anywhere in Cyprus" },
  { icon: ShieldCheck, title: "Secure Payments", desc: "Encrypted & protected checkout" },
  { icon: Banknote, title: "Cash on Delivery", desc: "Pay upon receipt for +€30" },
  { icon: ListChecks, title: "Effortless Ordering", desc: "No account needed, takes 2 min" },
  { icon: MapPin, title: "Cyprus Exclusive", desc: "Dedicated local service" },
];

const WhyBuySection = () => (
  <section className="py-24 md:py-32 bg-background relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(40_65%_50%_/_0.03),_transparent_60%)]" />
    <div className="container mx-auto px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-12 bg-gold/30" />
          <p className="text-gold font-body text-xs tracking-[0.4em] uppercase font-light">The Experience</p>
          <div className="h-px w-12 bg-gold/30" />
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-light text-foreground tracking-tight">
          Why <span className="italic text-gradient-gold">Choose Us</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center p-6 border border-border bg-surface-elevated hover:border-gold/20 transition-all duration-500 group"
          >
            <div className="w-10 h-10 mx-auto mb-4 border border-gold/20 flex items-center justify-center group-hover:border-gold/50 transition-colors duration-500">
              <r.icon className="w-4 h-4 text-gold/70 group-hover:text-gold transition-colors duration-500" />
            </div>
            <h3 className="font-display text-sm font-medium text-foreground mb-1 tracking-wide">{r.title}</h3>
            <p className="text-[11px] text-muted-foreground font-body font-light">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyBuySection;
