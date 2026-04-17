import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useSoldOut } from "@/hooks/useSoldOut";
import { toast } from "sonner";
import { ShoppingCart, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSearchParams } from "react-router-dom";

const ShopPage = () => {
  const { addItem } = useCart();
  const { soldOutIds } = useSoldOut();
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const filteredProducts = categoryFilter
    ? products.filter((p) => p.category === categoryFilter)
    : products;

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <main>
      <Navbar />
      <div className="pt-14 min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-display text-foreground tracking-tight mb-3">
              {categoryFilter ? `${categoryFilter} Watches` : "All Watches"}
            </h1>
            <p className="text-muted-foreground text-sm font-light max-w-md mx-auto">
              Premium automatic watches with free next-day delivery across Cyprus.
            </p>
          </motion.div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Link
              to="/shop"
              className={`text-xs tracking-[0.1em] uppercase font-medium px-4 py-2 border rounded-sm transition-colors ${
                !categoryFilter ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/shop?category=${cat}`}
                className={`text-xs tracking-[0.1em] uppercase font-medium px-4 py-2 border rounded-sm transition-colors ${
                  categoryFilter === cat ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredProducts.map((product, i) => {
              const isSoldOut = soldOutIds.has(product.id);
              return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group"
              >
                <Link to={`/watches/${product.slug}`} className="block">
                  <div className="relative aspect-square overflow-hidden bg-secondary rounded-sm mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500 ${isSoldOut ? "opacity-60" : ""}`}
                      loading="lazy"
                    />
                    {isSoldOut ? (
                      <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-[9px] tracking-[0.15em] uppercase font-medium px-3 py-1 rounded-sm">
                        Sold Out
                      </div>
                    ) : product.badge && (
                      <div className="absolute top-3 left-3 bg-foreground text-background text-[9px] tracking-[0.15em] uppercase font-medium px-3 py-1 rounded-sm">
                        {product.badge}
                      </div>
                    )}
                  </div>
                </Link>
                <div className="px-1">
                  <Link to={`/watches/${product.slug}`}>
                    <h2 className="font-display text-base text-foreground mb-1 group-hover:text-accent transition-colors">
                      {product.name}
                    </h2>
                  </Link>
                  <p className="text-muted-foreground text-xs font-light mb-3">{product.shortDescription}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground font-display text-lg">€{product.price}</span>
                    <button
                      onClick={() => {
                        if (isSoldOut) return;
                        addItem(product);
                        toast.success(`${product.name} added to cart`);
                      }}
                      disabled={isSoldOut}
                      className="inline-flex items-center gap-1.5 text-accent hover:text-warm-dark text-xs font-medium transition-colors disabled:text-muted-foreground disabled:cursor-not-allowed disabled:hover:text-muted-foreground"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      {isSoldOut ? "Sold Out" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ShopPage;
