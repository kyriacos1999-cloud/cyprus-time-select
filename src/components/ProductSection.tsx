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
    <section id="products" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-primary text-xs tracking-[0.5em] uppercase mb-4 font-medium">
            The Collection
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-foreground tracking-tight">
            Our Timepieces
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border max-w-6xl mx-auto">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group cursor-pointer bg-background"
              onClick={scrollToOrder}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {product.badge && (
                  <div className="absolute top-5 left-5 bg-primary text-primary-foreground text-[10px] tracking-[0.2em] uppercase font-medium px-4 py-1.5">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6 md:p-8 text-center">
                <h3 className="font-display text-xl md:text-2xl text-foreground mb-2 tracking-wide">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-5 font-light">
                  {product.description}
                </p>

                <div className="flex items-center justify-center gap-6">
                  <div>
                    <p className="text-[10px] text-primary tracking-[0.2em] uppercase mb-1 font-medium">Online</p>
                    <span className="text-xl font-display text-foreground">€{product.price}</span>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div>
                    <p className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase mb-1">COD</p>
                    <span className="text-sm text-muted-foreground">€{product.price + 30}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
