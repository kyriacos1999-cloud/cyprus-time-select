import { motion } from "framer-motion";
import { Truck, RotateCcw, Clock, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

const items = [
  { icon: Truck, title: "Delivery Coverage", desc: "We deliver to every city and village across Cyprus — completely free." },
  { icon: Clock, title: "Delivery Timing", desc: "Orders placed before 3 PM ship same day. Expect delivery within 1–2 business days." },
  { icon: RotateCcw, title: "Returns", desc: "14-day return window. Contact us for a prepaid return label — hassle free." },
  { icon: Headphones, title: "Support", desc: "Reach us via email any time. We typically respond within a few hours." },
];

const DeliveryReturnsBlock = () => (
  <section className="py-20 md:py-28 bg-secondary/30">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4 font-medium">
          Policies
        </p>
        <h2 className="text-3xl md:text-4xl font-display text-foreground tracking-tight">
          Delivery & Returns
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-10">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="bg-background border border-border rounded-sm p-6 text-center"
          >
            <item.icon className="w-5 h-5 text-accent mx-auto mb-4" />
            <h3 className="font-display text-sm text-foreground mb-2">{item.title}</h3>
            <p className="text-muted-foreground text-xs font-light leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/delivery"
            className="text-xs text-accent border border-accent/30 px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors rounded-sm font-medium"
          >
            Full Delivery Info
          </Link>
          <Link
            to="/returns"
            className="text-xs text-accent border border-accent/30 px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors rounded-sm font-medium"
          >
            Returns & Refunds Policy
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default DeliveryReturnsBlock;
