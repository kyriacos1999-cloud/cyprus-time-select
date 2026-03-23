import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MidPageCTA = () => {
  const navigate = useNavigate();
  return (
  <section className="py-14 md:py-20 bg-primary">
    <div className="container mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-4xl font-display text-primary-foreground mb-3 tracking-tight">
          Ready to Order?
        </h2>
        <p className="text-primary-foreground/60 text-sm md:text-base mb-8 max-w-md mx-auto font-light">
          Free next-day delivery anywhere in Cyprus. No account needed.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate("/checkout")}
            className="bg-background text-foreground text-xs tracking-[0.2em] uppercase font-medium px-10 py-4 hover:bg-background/90 transition-colors duration-300"
          >
            Start Your Order
          </button>
          <button
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            className="border border-primary-foreground/30 text-primary-foreground text-xs tracking-[0.2em] uppercase font-medium px-10 py-4 hover:bg-primary-foreground/10 transition-colors duration-300"
          >
            Browse Collection
          </button>
        </div>
      </motion.div>
    </div>
  </section>
  );
};

export default MidPageCTA;
