import heroImage from "@/assets/watch-hero.jpg";
import { motion } from "framer-motion";

const HeroSection = () => {
  const scrollToOrder = () => {
    document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Premium Rolex clone watches Cyprus — AAA replica timepieces by Replic8"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Centered text overlay — Rolex style */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="text-white/70 text-xs tracking-[0.5em] uppercase mb-6 font-medium">
            Exclusive to Cyprus
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-white leading-[1.05] mb-8 tracking-tight">
            Rolex Clone
            <br />
            <span className="italic">Cyprus</span>
          </h1>

          <p className="text-white/70 text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed font-light">
            Premium AAA Rolex replica watches with free next-day delivery across Cyprus.
          </p>

          <button
            onClick={scrollToOrder}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-sm tracking-[0.15em] uppercase font-medium px-10 py-4 hover:bg-white/20 transition-all duration-300"
          >
            Order Now
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;
