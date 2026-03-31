import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  { name: "Andreas K.", city: "Nicosia", rating: 5, text: "Excellent quality and incredibly fast delivery. The watch arrived next day, beautifully packaged." },
  { name: "Maria L.", city: "Limassol", rating: 5, text: "Bought this as a birthday gift — the presentation box made it look even more impressive. Very happy." },
  { name: "Giorgos P.", city: "Larnaca", rating: 5, text: "Solid build quality and the automatic movement is smooth. Great value for the price." },
  { name: "Elena S.", city: "Paphos", rating: 5, text: "Customer service was responsive and helpful. The watch exceeded my expectations." },
  { name: "Christos M.", city: "Nicosia", rating: 4, text: "Good quality watch, delivery was next day as promised. Professional experience overall." },
  { name: "Anna D.", city: "Limassol", rating: 5, text: "Third purchase from Replic8 — consistent quality every time. Highly recommend." },
];

const SocialProof = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const visible = [
    reviews[current % reviews.length],
    reviews[(current + 1) % reviews.length],
    reviews[(current + 2) % reviews.length],
  ];

  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4 font-medium">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-5xl font-display text-foreground tracking-tight">
            What Our Customers Say
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
                className="bg-background border border-border p-6 md:p-8 rounded-sm"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s < review.rating ? "fill-accent text-accent" : "text-border"}`}
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
                i === current ? "bg-accent w-6" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
