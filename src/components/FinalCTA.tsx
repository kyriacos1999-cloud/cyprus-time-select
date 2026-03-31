import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FinalCTA = () => (
  <section className="relative py-28 md:py-40 overflow-hidden bg-foreground">
    <div className="container mx-auto px-4 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display text-primary-foreground mb-4 tracking-tight">
          Buy with Confidence
        </h2>
        <p className="text-primary-foreground/50 text-base md:text-lg max-w-md mx-auto mb-10 font-light">
          Quality watches, secure checkout, and free next-day delivery across Cyprus. Your satisfaction is guaranteed.
        </p>
        <div className="flex flex-col items-center gap-3">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground text-xs tracking-[0.2em] uppercase font-medium px-12 py-4 hover:bg-warm-dark transition-colors duration-300 rounded-sm"
          >
            Shop Now
          </Link>
          <p className="text-primary-foreground/30 text-[11px] tracking-wide font-light">
            Secure payment · Free delivery · 14-day returns
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;
