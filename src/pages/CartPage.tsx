import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, Shield, Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CartPage = () => {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  const suggestedProducts = products.filter(
    (p) => !items.some((i) => i.product.id === p.id)
  ).slice(0, 3);

  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-secondary pt-14">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-display text-foreground tracking-tight">Your Cart</h1>
                <p className="text-sm text-muted-foreground font-light mt-1">
                  {items.length === 0 ? "Your cart is empty" : `${items.length} item${items.length > 1 ? "s" : ""}`}
                </p>
              </div>
              <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
            </div>

            {items.length === 0 ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-background border border-border p-12 text-center rounded-sm">
                <ShoppingBag className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
                <h2 className="font-display text-xl text-foreground mb-2">Your cart is empty</h2>
                <p className="text-sm text-muted-foreground font-light mb-6">Explore our collection and find the perfect watch.</p>
                <Button onClick={() => navigate("/shop")} className="bg-foreground hover:bg-foreground/90 text-background text-xs tracking-[0.2em] uppercase font-medium px-8 py-5">
                  Browse Collection
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-4">
                  {items.map((item, idx) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-background border border-border p-4 md:p-6 flex gap-4 rounded-sm"
                    >
                      <Link to={`/watches/${item.product.slug}`}>
                        <img src={item.product.image} alt={item.product.name} className="w-24 h-24 md:w-32 md:h-32 object-cover border border-border rounded-sm" />
                      </Link>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-display text-sm md:text-base text-foreground tracking-wide">{item.product.name}</h3>
                            <p className="text-[11px] text-muted-foreground font-light mt-0.5">{item.product.shortDescription}</p>
                          </div>
                          <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 border border-border flex items-center justify-center hover:bg-muted transition-colors rounded-sm">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 border border-border flex items-center justify-center hover:bg-muted transition-colors rounded-sm">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-lg font-display text-foreground">€{item.product.price * item.quantity}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="lg:col-span-4">
                  <div className="bg-background border border-border p-6 lg:sticky lg:top-20 rounded-sm">
                    <h2 className="font-display text-lg text-foreground tracking-wide mb-6">Order Summary</h2>
                    <div className="space-y-3 text-sm font-light mb-6">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex justify-between">
                          <span className="text-muted-foreground truncate mr-2">{item.product.name} × {item.quantity}</span>
                          <span className="text-foreground shrink-0">€{item.product.price * item.quantity}</span>
                        </div>
                      ))}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Delivery</span>
                        <span className="text-accent font-medium">FREE</span>
                      </div>
                    </div>
                    <div className="border-t border-border pt-4 flex justify-between items-end mb-6">
                      <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-medium">Total</span>
                      <span className="text-2xl font-display text-foreground">€{subtotal}</span>
                    </div>
                    <Button onClick={() => navigate("/checkout")} className="w-full bg-foreground hover:bg-foreground/90 text-background text-xs tracking-[0.2em] uppercase font-medium py-6">
                      Proceed to Checkout
                    </Button>
                    <div className="grid grid-cols-3 gap-2 mt-6">
                      {[
                        { icon: Shield, label: "Secure" },
                        { icon: Truck, label: "Free Delivery" },
                        { icon: RotateCcw, label: "Returns" },
                      ].map(({ icon: Icon, label }) => (
                        <div key={label} className="text-center">
                          <Icon className="w-4 h-4 text-accent mx-auto mb-1" />
                          <p className="text-[9px] text-muted-foreground font-light">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {suggestedProducts.length > 0 && (
              <div className="mt-16">
                <h2 className="font-display text-xl text-foreground tracking-wide mb-6">You May Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {suggestedProducts.map((p) => (
                    <Link key={p.id} to={`/watches/${p.slug}`} className="bg-background border border-border p-4 hover:border-accent transition-colors group rounded-sm">
                      <img src={p.image} alt={p.name} className="w-full aspect-square object-contain bg-background mb-3 p-4" />
                      <p className="font-display text-sm text-foreground tracking-wide group-hover:text-accent transition-colors">{p.name}</p>
                      <p className="text-sm font-display text-foreground mt-1">€{p.price}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default CartPage;
