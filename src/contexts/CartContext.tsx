import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/components/ProductSection";

export type CartItem = {
  product: Product;
  quantity: number;
  withBox: boolean;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, withBox?: boolean) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  toggleBox: (productId: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, withBox = true) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.withBox === withBox);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.withBox === withBox
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1, withBox }];
    });
  };

  const removeItem = (productId: number) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return removeItem(productId);
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const toggleBox = (productId: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, withBox: !i.withBox } : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => {
    const price = i.withBox ? i.product.price : i.product.price - 80;
    return sum + price * i.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, toggleBox, clearCart, itemCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
