import { Gem, Truck, ShieldCheck, RotateCcw, ListChecks, Award } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  { icon: Gem, title: "Quality Materials", desc: "316L stainless steel cases, mineral glass crystals, and reliable automatic movements." },
  { icon: Truck, title: "Reliable Local Shipping", desc: "Free next-day delivery to every city and village across Cyprus." },
  { icon: ShieldCheck, title: "Secure Ordering", desc: "256-bit SSL encrypted checkout with Visa, Mastercard, Apple Pay, and Google Pay." },
  { icon: RotateCcw, title: "Straightforward Returns", desc: "Not satisfied? Return within 14 days for a full refund — no questions asked." },
  { icon: ListChecks, title: "Curated Selection", desc: "Every watch is hand-selected and quality-checked before it reaches you." },
  { icon: Award, title: "Warranty Included", desc: "All watches come with a 1-year warranty for your peace of mind." },
];

const WhyBuySection = () => (
  <section id="why-choose-us" className="py-24 md:py-32 bg-foreground">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4 font-medium">
          Trust & Quality
        </p>
        <h2 className="text-3xl md:text-5xl font-display text-primary-foreground tracking-tight">
          Why Choose Replic8
        </h2>
        <p className="text-primary-foreground/50 text-sm md:text-base mt-4 max-w-xl mx-auto font-light">
          We understand you need confidence when buying online. Here's why hundreds of customers across Cyprus trust us.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-center"
          >
            <div className="w-14 h-14 mx-auto mb-5 border border-primary-foreground/15 rounded-sm flex items-center justify-center">
              <r.icon className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-display text-base text-primary-foreground mb-2">{r.title}</h3>
            <p className="text-xs text-primary-foreground/50 leading-relaxed font-light">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyBuySection;
