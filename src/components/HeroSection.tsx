import heroImage from "@/assets/watch-hero.jpg";
import { Button } from "@/components/ui/button";
import { Clock, Truck, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const scrollToOrder = () => {
    document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,_hsl(40_65%_50%_/_0.06),_transparent_70%)]" />

      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-10 bg-gold/50" />
              <p className="text-gold font-body text-xs tracking-[0.4em] uppercase font-light">
                Exclusive to Cyprus
              </p>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-light text-foreground leading-[0.95] mb-6 tracking-tight">
              Timeless
              <br />
              <span className="text-gradient-gold font-medium italic">Elegance</span>
              <br />
              <span className="text-muted-foreground text-4xl md:text-5xl lg:text-6xl">Delivered</span>
            </h1>

            <p className="text-muted-foreground font-body text-base md:text-lg mb-10 leading-relaxed max-w-md font-light">
              Premium timepieces with complimentary next-day delivery across Cyprus. Pay online or upon delivery.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                onClick={scrollToOrder}
                className="bg-gold hover:bg-gold-dark text-accent-foreground font-body font-medium text-sm tracking-wider uppercase px-10 py-6 rounded-none transition-all duration-300 hover:shadow-[0_0_30px_-5px_hsl(40_65%_50%_/_0.4)]"
              >
                Order Now
              </Button>
              <Button
                onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                variant="outline"
                className="border-border text-foreground hover:border-gold hover:text-gold font-body font-light text-sm tracking-wider uppercase px-10 py-6 rounded-none bg-transparent transition-all duration-300"
              >
                View Collection
              </Button>
            </div>

            <div className="flex flex-wrap gap-8 text-muted-foreground font-body text-xs tracking-wide">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-gold/70" />
                <span className="font-light">Free Next-Day Delivery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4 text-gold/70" />
                <span className="font-light">Secure Online Payment</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gold/70" />
                <span className="font-light">Cash on Delivery (+€30)</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(40_65%_50%_/_0.12),_transparent_70%)]" />
              <img
                src={heroImage}
                alt="Luxury timepiece"
                className="w-full h-full object-cover rounded-sm"
              />
              {/* Decorative border */}
              <div className="absolute -inset-4 border border-gold/10 rounded-sm pointer-events-none" />
              <div className="absolute -inset-8 border border-gold/5 rounded-sm pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
};

export default HeroSection;
