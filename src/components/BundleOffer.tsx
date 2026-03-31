import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Tag, Check, ChevronDown, ChevronUp, ShoppingCart } from "lucide-react";
import { products, Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const bundles = [
  {
    name: "Duo Collection",
    count: 2,
    discount: 50,
    description: "Pick any 2 watches and save €50",
    popular: false,
  },
  {
    name: "Triple Set",
    count: 3,
    discount: 100,
    description: "Pick any 3 watches and save €100",
    popular: true,
  },
];

const BundleOffer = () => {
  const navigate = useNavigate();
  const { addItem, clearCart } = useCart();
  const [activeBundle, setActiveBundle] = useState<number | null>(null);
  const [selected, setSelected] = useState<number[]>([]);

  const toggleProduct = (productId: number, maxCount: number) => {
    setSelected((prev) => {
      if (prev.includes(productId)) return prev.filter((id) => id !== productId);
      if (prev.length >= maxCount) return prev;
      return [...prev, productId];
    });
  };

  const handleAddBundle = (bundle: typeof bundles[0]) => {
    // Clear cart and add selected watches
    clearCart();
    selected.forEach((id) => {
      const product = products.find((p) => p.id === id);
      if (product) addItem(product);
    });
    toast.success(`${bundle.name} added — ${bundle.discount > 0 ? `€${bundle.discount} saved!` : ""}`);
    navigate("/cart");
  };

  const getEstimatedTotal = (bundle: typeof bundles[0]) => {
    const itemsTotal = selected.reduce((sum, id) => {
      const p = products.find((pr) => pr.id === id);
      return sum + (p?.price || 300);
    }, 0);
    // If not all selected yet, estimate with €300 avg
    const remaining = bundle.count - selected.length;
    const estimated = itemsTotal + remaining * 300;
    return estimated - bundle.discount;
  };

  return (
    <section className="py-16 md:py-24 bg-secondary/30 border-y border-border/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] tracking-[0.3em] uppercase font-medium px-4 py-1.5 rounded-full mb-4">
            <Gift className="w-3 h-3" />
            Bundle & Save
          </div>
          <h2 className="text-3xl md:text-4xl font-display text-foreground tracking-tight mb-2">
            Buy More, Save More
          </h2>
          <p className="text-muted-foreground text-sm font-light max-w-md mx-auto">
            Can't decide on just one? Grab a bundle and save — perfect for gifting or building your collection.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {bundles.map((b, i) => {
            const isActive = activeBundle === b.count;
            const isComplete = isActive && selected.length === b.count;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative border transition-colors ${
                  b.popular
                    ? "border-primary bg-primary/5"
                    : "border-border bg-background"
                }`}
              >
                {b.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[9px] tracking-[0.2em] uppercase font-medium px-3 py-1">
                    Most Popular
                  </div>
                )}

                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="text-primary text-[10px] tracking-[0.2em] uppercase font-medium">
                      €{b.discount} OFF
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-1">{b.name}</h3>
                  <p className="text-muted-foreground text-xs mb-4 font-light">{b.description}</p>
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="text-2xl font-display text-foreground">
                      from €{b.count * 300 - b.discount}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      €{b.count * 300}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (isActive) {
                        setActiveBundle(null);
                        setSelected([]);
                      } else {
                        setActiveBundle(b.count);
                        setSelected([]);
                      }
                    }}
                    className="w-full bg-primary text-primary-foreground text-[10px] tracking-[0.2em] uppercase font-medium py-3 hover:bg-rolex-green-light transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    {isActive ? (
                      <>
                        Close
                        <ChevronUp className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        Select {b.count} Watches
                        <ChevronDown className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Watch picker */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border p-4 space-y-2">
                        <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium mb-3">
                          Choose {b.count} watches ({selected.length}/{b.count} selected)
                        </p>
                        {products.map((product) => {
                          const isSelected = selected.includes(product.id);
                          const isDisabled = !isSelected && selected.length >= b.count;
                          return (
                            <button
                              key={product.id}
                              onClick={() => toggleProduct(product.id, b.count)}
                              disabled={isDisabled}
                              className={`w-full flex items-center gap-3 p-2.5 border transition-all text-left ${
                                isSelected
                                  ? "border-primary bg-primary/5"
                                  : isDisabled
                                  ? "border-border/50 opacity-40 cursor-not-allowed"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover bg-white border border-border"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-foreground truncate">
                                  {product.name}
                                </p>
                                <p className="text-[10px] text-muted-foreground font-light">€{product.price}</p>
                              </div>
                              {isSelected && (
                                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center shrink-0">
                                  <Check className="w-3 h-3 text-primary-foreground" />
                                </div>
                              )}
                            </button>
                          );
                        })}

                        {isComplete && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="pt-3 space-y-3"
                          >
                            <div className="flex justify-between items-baseline text-sm">
                              <span className="text-muted-foreground font-light">Bundle total</span>
                              <div className="flex items-baseline gap-2">
                                <span className="font-display text-lg text-foreground">
                                  €{getEstimatedTotal(b)}
                                </span>
                                <span className="text-xs text-muted-foreground line-through">
                                  €{selected.reduce((s, id) => s + (products.find((p) => p.id === id)?.price || 300), 0)}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleAddBundle(b)}
                              className="w-full bg-primary text-primary-foreground text-[10px] tracking-[0.2em] uppercase font-medium py-3.5 hover:bg-rolex-green-light transition-colors duration-300 flex items-center justify-center gap-2"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                              Add Bundle to Cart
                            </button>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-muted-foreground/60 text-[11px] mt-4 font-light tracking-wide">
          Mix & match any models · Full sets included · Free next-day delivery
        </p>
      </div>
    </section>
  );
};

export default BundleOffer;
