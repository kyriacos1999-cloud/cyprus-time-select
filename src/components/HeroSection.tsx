import heroImage from "@/assets/watch-hero.jpg";
import { Button } from "@/components/ui/button";
import { Clock, Truck, CreditCard } from "lucide-react";

const HeroSection = () => {
  const scrollToOrder = () => {
    document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center bg-primary overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Luxury watch" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/50" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-4">
            Serving Cyprus Only
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6">
            Timeless Style,
            <br />
            <span className="text-gold">Delivered Tomorrow</span>
          </h1>
          <p className="text-primary-foreground/80 font-body text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
            Premium watches with free next-day delivery anywhere in Cyprus. Pay online or cash on delivery (+€30).
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button
              onClick={scrollToOrder}
              className="bg-gold hover:bg-gold-dark text-accent-foreground font-body font-semibold text-lg px-8 py-6 rounded-sm"
            >
              Order Now
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 text-primary-foreground/70 font-body text-sm">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-gold" />
              <span>Free Next-Day Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-gold" />
              <span>Secure Online Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold" />
              <span>Cash on Delivery Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
