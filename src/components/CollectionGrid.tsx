import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "@/components/ProductSection";
import { productSEOData } from "@/data/productSEO";
import { useSoldOut } from "@/hooks/useSoldOut";

const CollectionGrid = () => {
  const { soldOutIds } = useSoldOut();
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
          {products.map((product, i) => {
            const seo = productSEOData[product.id];
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={seo ? `/watches/${seo.slug}` : `/#product-${product.id}`}
                  className={`group block ${soldOutIds.has(product.id) ? "pointer-events-none" : ""}`}
                >
                  <div className="relative aspect-square overflow-hidden bg-white mb-3">
                    <img
                      src={product.image}
                      alt={`${product.name} — premium automatic men's watch`}
                      className={`w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out ${soldOutIds.has(product.id) ? "grayscale opacity-50" : ""}`}
                      loading="lazy"
                    />
                    {soldOutIds.has(product.id) ? (
                      <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-[8px] md:text-[10px] tracking-[0.15em] uppercase font-medium px-2.5 py-1">
                        Sold Out
                      </div>
                    ) : product.badge ? (
                      <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[8px] md:text-[10px] tracking-[0.15em] uppercase font-medium px-2.5 py-1">
                        {product.badge}
                      </div>
                    ) : null}
                  </div>
                  <div className="text-center">
                    <h3 className="font-display text-sm md:text-base text-foreground tracking-wide mb-1">
                      {product.name}
                    </h3>
                    {soldOutIds.has(product.id) ? (
                      <span className="text-destructive text-sm md:text-base font-display">Sold Out</span>
                    ) : (
                      <span className="text-primary text-sm md:text-base font-display">
                        €{product.price}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CollectionGrid;