import { motion } from "framer-motion";
import { Gift, Tag } from "lucide-react";

const bundles = [
  {
    name: "Duo Collection",
    count: 2,
    discount: "€50 OFF",
    price: "€550",
    originalPrice: "€600",
    description: "Pick any 2 watches",
  },
  {
    name: "Triple Set",
    count: 3,
    discount: "€100 OFF",
    price: "€800",
    originalPrice: "€900",
    description: "Pick any 3 watches",
    popular: true,
  },
];

const BundleOffer = () => (
  <section className="py-16 md:py-24 bg-secondary/30 border-y border-border/30">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] tracking-[0.3em] uppercase font-medium px-4 py-1.5 rounded-full mb-4">
          <Gift className="w-3 h-3" />
          Bundle & Save
        </div>
        <h2 className="text-3xl md:text-4xl font-display text-foreground tracking-tight mb-2">
          Buy More, Save More
        </h2>
        <p className="text-muted-foreground text-sm font-light max-w-md mx-auto">
          Can't decide on just one? Grab a bundle and save — perfect for gifting or building your collection.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {bundles.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`relative p-6 md:p-8 border transition-colors ${
              b.popular
                ? "border-primary bg-primary/5"
                : "border-border bg-background"
            }`}
          >
            {b.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[9px] tracking-[0.2em] uppercase font-medium px-3 py-1">
                Most Popular
              </div>
            )}
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-primary" />
              <span className="text-primary text-[10px] tracking-[0.2em] uppercase font-medium">
                {b.discount}
              </span>
            </div>
            <h3 className="font-display text-xl text-foreground mb-1">{b.name}</h3>
            <p className="text-muted-foreground text-xs mb-4 font-light">{b.description}</p>
            <div className="flex items-baseline gap-2 mb-5">
              <span className="text-2xl font-display text-foreground">{b.price}</span>
              <span className="text-sm text-muted-foreground line-through">{b.originalPrice}</span>
            </div>
            <button
              onClick={() => {
                const params = new URLSearchParams(window.location.search);
                params.set("bundle", String(b.count));
                window.history.replaceState({}, "", `?${params.toString()}`);
                document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full bg-primary text-primary-foreground text-[10px] tracking-[0.2em] uppercase font-medium py-3 hover:bg-rolex-green-light transition-colors duration-300"
            >
              Select {b.count} Watches
            </button>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-muted-foreground/60 text-[11px] mt-4 font-light tracking-wide">
        Mix & match any models · Full sets included · Free next-day delivery
      </p>
    </div>
  </section>
);

export default BundleOffer;
