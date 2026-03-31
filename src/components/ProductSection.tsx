import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const ProductSection = () => {
  const { addItem } = useCart();

  return (
    <section id="products" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4 font-medium">
            Best Sellers
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-foreground tracking-tight">
            Featured Watches
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group"
            >
              <Link to={`/watches/${product.slug}`} className="block">
                <div className="relative aspect-square overflow-hidden bg-background rounded-sm mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-foreground text-background text-[9px] tracking-[0.15em] uppercase font-medium px-3 py-1 rounded-sm">
                      {product.badge}
                    </div>
                  )}
                </div>
              </Link>
              <div className="px-1">
                <Link to={`/watches/${product.slug}`}>
                  <h3 className="font-display text-base text-foreground mb-1 group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-muted-foreground text-xs font-light mb-3">
                  {product.shortDescription}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-display text-lg">€{product.price}</span>
                  <button
                    onClick={() => {
                      addItem(product);
                      toast.success(`${product.name} added to cart`);
                    }}
                    className="inline-flex items-center gap-1.5 text-accent hover:text-warm-dark text-xs font-medium transition-colors"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 border border-foreground text-foreground text-xs tracking-[0.15em] uppercase font-medium px-8 py-3.5 hover:bg-foreground hover:text-background transition-all duration-300 rounded-sm"
          >
            View All Watches
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
