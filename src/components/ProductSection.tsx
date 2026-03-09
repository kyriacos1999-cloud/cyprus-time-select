import watch1 from "@/assets/watch-1.jpg";
import watch2 from "@/assets/watch-2.jpg";
import watch3 from "@/assets/watch-3.jpg";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Chronos Elite",
    description: "Rose gold chronograph · Italian leather strap",
    price: 189,
    image: watch1,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Noir Minimalist",
    description: "Matte black · Japanese mesh strap",
    price: 149,
    image: watch2,
    badge: "Best Price",
  },
  {
    id: 3,
    name: "Aqua Diver Pro",
    description: "Stainless steel · Sapphire crystal",
    price: 219,
    image: watch3,
    badge: null,
  },
];

export { products };

const ProductSection = () => {
  const scrollToOrder = () => {
    document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="products" className="py-24 md:py-32 bg-surface-sunken relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,_hsl(40_65%_50%_/_0.04),_transparent_50%)]" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-gold/30" />
            <p className="text-gold font-body text-xs tracking-[0.4em] uppercase font-light">The Collection</p>
            <div className="h-px w-12 bg-gold/30" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-light text-foreground tracking-tight">
            Curated <span className="italic text-gradient-gold">Timepieces</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group cursor-pointer"
              onClick={scrollToOrder}
            >
              <div className="relative bg-surface-elevated border border-border overflow-hidden transition-all duration-500 hover:border-gold/30 hover:shadow-[0_0_40px_-15px_hsl(40_65%_50%_/_0.15)]">
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-gold/90 text-accent-foreground font-body text-[10px] tracking-[0.15em] uppercase font-medium px-3 py-1.5">
                      {product.badge}
                    </div>
                  )}

                  {/* Price overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-2xl font-light text-foreground mb-0.5 tracking-wide">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground font-body text-xs font-light">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Pricing */}
                <div className="p-5 border-t border-border">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] text-gold font-body tracking-[0.15em] uppercase mb-1">Online Price</p>
                      <span className="text-2xl font-body font-light text-foreground">€{product.price}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-muted-foreground font-body tracking-wider uppercase mb-1">COD Price</p>
                      <span className="text-sm font-body text-muted-foreground">€{product.price + 30}</span>
                    </div>
                  </div>
                </div>

                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
