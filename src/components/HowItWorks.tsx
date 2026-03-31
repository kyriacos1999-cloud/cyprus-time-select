import { motion } from "framer-motion";
import { Search, CreditCard, Package } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Browse & Choose",
    desc: "Explore our curated collection and find the watch that suits your style.",
  },
  {
    icon: CreditCard,
    step: "02",
    title: "Order Securely",
    desc: "Check out with card, Apple Pay, Google Pay, or choose cash on delivery.",
  },
  {
    icon: Package,
    step: "03",
    title: "Receive Fast in Cyprus",
    desc: "Free next-day delivery to your door. Beautifully packaged and ready to wear.",
  },
];

const HowItWorks = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4 font-medium">
          Simple & Fast
        </p>
        <h2 className="text-3xl md:text-4xl font-display text-foreground tracking-tight">
          How Ordering Works
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-5 bg-secondary rounded-full flex items-center justify-center">
              <s.icon className="w-6 h-6 text-accent" />
            </div>
            <span className="text-accent text-[11px] tracking-[0.3em] uppercase font-medium">
              Step {s.step}
            </span>
            <h3 className="font-display text-lg text-foreground mt-2 mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm font-light leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
