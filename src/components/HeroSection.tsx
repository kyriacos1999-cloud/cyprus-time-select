import { motion } from "framer-motion";
import { Truck, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-foreground overflow-hidden">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-accent text-xs tracking-[0.4em] uppercase mb-5 font-medium">
              Premium Men's Watches — Cyprus
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-primary-foreground leading-[1.1] mb-6">
              Quality Timepieces,
              <br />
              <span className="italic">Delivered Tomorrow</span>
            </h1>
            <p className="text-primary-foreground/60 text-base md:text-lg max-w-lg leading-relaxed font-light mb-8">
              Curated automatic watches with premium materials, secure checkout, and free next-day delivery across Cyprus.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground text-xs tracking-[0.15em] uppercase font-medium px-8 py-4 hover:bg-warm-dark transition-colors duration-300 rounded-sm"
              >
                Shop Collection
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#why-choose-us"
                className="inline-flex items-center justify-center gap-2 border border-primary-foreground/20 text-primary-foreground text-xs tracking-[0.15em] uppercase font-medium px-8 py-4 hover:bg-primary-foreground/5 transition-colors duration-300 rounded-sm"
              >
                Why Choose Us
              </a>
            </div>

            {/* Trust bullets */}
            <div className="grid grid-cols-2 gap-3 text-primary-foreground/50 text-xs font-light">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-accent" />
                Free next-day delivery in Cyprus
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-accent" />
                Secure checkout
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-accent" />
                Cash on delivery available
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-accent" />
                Easy returns
              </div>
            </div>
          </motion.div>

          {/* Right — featured watch grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:grid grid-cols-2 gap-3"
          >
            {products.slice(0, 4).map((product, i) => (
              <Link
                key={product.id}
                to={`/watches/${product.slug}`}
                className="group relative aspect-square bg-primary-foreground/5 overflow-hidden rounded-sm"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-foreground/80 to-transparent">
                  <p className="text-primary-foreground text-xs font-medium">{product.name}</p>
                  <p className="text-accent text-xs">€{product.price}</p>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
