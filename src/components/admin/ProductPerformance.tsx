import { Package, AlertTriangle } from "lucide-react";

type Props = {
  productInterest: Array<{ product_id: number; views: number }>;
  checkoutStarts: number;
};

const productNames: Record<number, string> = {
  1: "Rolex No Date",
  2: "Rolex Hulk",
  3: "Rolex Datejust 36mm",
  4: "Rolex Submariner Blue/Gold",
  5: "Rolex GMT-Master II Sprite",
  6: "Rolex Daytona Black",
};

const ProductPerformance = ({ productInterest, checkoutStarts }: Props) => {
  const sorted = [...productInterest].sort((a, b) => b.views - a.views);
  const maxViews = sorted.length > 0 ? sorted[0].views : 1;

  return (
    <div className="bg-background border border-border p-5 md:p-6">
      <h2 className="font-display text-lg text-foreground mb-4 flex items-center gap-2">
        <Package className="w-5 h-5 text-primary" />
        Product Performance
      </h2>

      {sorted.length === 0 ? (
        <p className="text-muted-foreground text-sm font-light">No product data yet</p>
      ) : (
        <div className="space-y-3">
          {sorted.slice(0, 6).map((p, i) => {
            const barWidth = Math.max(10, (p.views / maxViews) * 100);
            const highViewsNoPurchase = p.views > 5 && checkoutStarts === 0;
            return (
              <div key={p.product_id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-foreground">
                    {productNames[p.product_id] || `Product ${p.product_id}`}
                  </span>
                  <span className="text-xs text-muted-foreground">{p.views} views</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${highViewsNoPurchase ? "bg-amber-500" : "bg-primary"}`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
                {highViewsNoPurchase && (
                  <p className="text-[10px] text-amber-600 mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-2.5 h-2.5" /> High views, no purchases — optimize product page
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductPerformance;
