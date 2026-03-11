import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  { name: "Andreas K.", city: "Nicosia", rating: 5, text: "Excellent presentation and very fast delivery. The watch looks incredible on the wrist." },
  { name: "Maria L.", city: "Limassol", rating: 5, text: "Looks premium and feels solid. My husband couldn't tell the difference. Very impressed." },
  { name: "Giorgos P.", city: "Larnaca", rating: 5, text: "Perfect gift for my brother's birthday. He absolutely loved it. Will order again." },
  { name: "Elena S.", city: "Paphos", rating: 5, text: "Surprisingly heavy and well-made. The box packaging was a nice touch too." },
  { name: "Christos M.", city: "Nicosia", rating: 4, text: "Great quality for the price. Delivery was next day as promised. Very professional." },
  { name: "Anna D.", city: "Limassol", rating: 5, text: "Ordered the Submariner — it's stunning. Everyone at work asked about it." },
];

const SocialProof = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const visible = [
    reviews[current % reviews.length],
    reviews[(current + 1) % reviews.length],
    reviews[(current + 2) % reviews.length],
  ];

  return (
    <section className="py-20 md:py-28 bg-[hsl(var(--rolex-cream))]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3">
            What Our Customers Say
          </p>
          <h2 className="text-3xl md:text-5xl font-display text-foreground tracking-tight">
            Trusted Across <span className="italic">Cyprus</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {visible.map((review, i) => (
              <motion.div
                key={`${review.name}-${current}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background border border-border p-6 md:p-8"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s < review.rating ? "fill-[hsl(var(--rolex-gold))] text-[hsl(var(--rolex-gold))]" : "text-border"}`}
                    />
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-6 font-light">
                  "{review.text}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="text-foreground text-sm font-medium">{review.name}</p>
                  <p className="text-muted-foreground text-xs">{review.city}, Cyprus</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-1.5 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-[hsl(var(--rolex-green))] w-6" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
