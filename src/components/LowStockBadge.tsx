import { Flame } from "lucide-react";

const LowStockBadge = ({ productId }: { productId: number }) => {
  // Simulate low stock for specific products to feel authentic
  const lowStockProducts: Record<number, number> = {
    1: 3, // Best seller - always feels scarce
    5: 2,
    6: 4,
  };

  const stock = lowStockProducts[productId];
  if (!stock) return null;

  return (
    <div className="flex items-center gap-1.5 text-[11px] text-amber-600 dark:text-amber-400 tracking-wide font-medium">
      <Flame className="w-3 h-3" />
      <span>Only {stock} left in stock</span>
    </div>
  );
};

export default LowStockBadge;
