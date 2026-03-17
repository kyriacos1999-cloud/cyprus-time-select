import { motion } from "framer-motion";
import heroImage from "@/assets/watch-hero.jpg";

const FinalCTA = () => {
  const scrollToOrder = () => {
    document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury watch"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-display text-white mb-4 tracking-tight">
            Order Today,
            <br />
            <span className="italic">Wear Tomorrow</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-md mx-auto mb-10 font-light">
            Free next-day delivery anywhere in Cyprus. No risk, no hassle.
          </p>
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={scrollToOrder}
              className="bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase font-medium px-12 py-4 hover:bg-rolex-green-light transition-colors duration-300"
            >
              Choose Your Watch
            </button>
            <p className="text-white/40 text-[11px] tracking-wide font-light">
              Secure payment · Cash on delivery available
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
