import { motion } from "framer-motion";
import { products } from "@/components/ProductSection";

const CollectionGrid = () => {

  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary text-xs tracking-[0.5em] uppercase mb-4 font-medium">
            Explore
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-foreground tracking-tight">
            The Collection
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group cursor-pointer"
              onClick={() => {
                document.getElementById(`product-${product.id}`)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div className="relative aspect-square overflow-hidden bg-white mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[8px] md:text-[10px] tracking-[0.15em] uppercase font-medium px-2.5 py-1">
                    {product.badge}
                  </div>
                )}
              </div>
              <div className="text-center">
                <h3 className="font-display text-sm md:text-base text-foreground tracking-wide mb-1">
                  {product.name}
                </h3>
                <span className="text-primary text-sm md:text-base font-display">
                  €{product.price}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionGrid;
