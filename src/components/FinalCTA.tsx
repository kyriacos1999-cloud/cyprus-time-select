import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const FinalCTA = () => {
  const scrollToOrder = () => {
    document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 md:py-32 bg-surface-sunken relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(40_65%_50%_/_0.06),_transparent_60%)]" />
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container mx-auto px-4 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-light text-foreground mb-4 tracking-tight">
            Order Today,
            <br />
            <span className="italic text-gradient-gold">Wear Tomorrow</span>
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg max-w-md mx-auto mb-10 font-light">
            Complimentary next-day delivery anywhere in Cyprus. Your timepiece awaits.
          </p>
          <Button
            onClick={scrollToOrder}
            className="bg-gold hover:bg-gold-dark text-accent-foreground font-body font-medium text-xs tracking-[0.2em] uppercase px-12 py-7 rounded-none transition-all duration-300 hover:shadow-[0_0_40px_-5px_hsl(40_65%_50%_/_0.4)]"
          >
            Complete My Order
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
