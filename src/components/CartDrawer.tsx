import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CartDrawer = () => {
  const { items, itemCount, subtotal, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="relative text-primary-foreground hover:text-primary-foreground/80 transition-colors">
          <ShoppingCart className="w-5 h-5" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display tracking-wide">Your Cart</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
            <ShoppingBag className="w-12 h-12 text-muted-foreground/30" />
            <p className="text-muted-foreground font-light text-sm">Your cart is empty</p>
            <Button
              variant="outline"
              className="text-xs tracking-wider uppercase"
              onClick={() => { setOpen(false); navigate("/shop"); }}
            >
              Browse Collection
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 border border-border p-3 rounded-sm">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover border border-border rounded-sm" />
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm text-foreground tracking-wide truncate">{item.product.name}</p>
                    <p className="text-sm font-display text-foreground mt-1">€{item.product.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-6 h-6 border border-border flex items-center justify-center hover:bg-muted transition-colors rounded-sm">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-medium w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-6 h-6 border border-border flex items-center justify-center hover:bg-muted transition-colors rounded-sm">
                        <Plus className="w-3 h-3" />
                      </button>
                      <button onClick={() => removeItem(item.product.id)} className="ml-auto text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-medium">Subtotal</span>
                <span className="text-xl font-display text-foreground">€{subtotal}</span>
              </div>
              <p className="text-[10px] text-muted-foreground font-light">Free next-day delivery across Cyprus</p>
              <Button
                className="w-full bg-foreground hover:bg-foreground/90 text-background text-xs tracking-[0.2em] uppercase font-medium py-6"
                onClick={() => { setOpen(false); navigate("/checkout"); }}
              >
                Proceed to Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full text-xs tracking-[0.15em] uppercase"
                onClick={() => { setOpen(false); navigate("/cart"); }}
              >
                View Full Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
