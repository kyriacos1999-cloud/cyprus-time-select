import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle } from "lucide-react";

type FunnelData = {
  page_views: number;
  product_views: number;
  product_selections: number;
  checkout_starts: number;
  conversion_rate: string;
};

type Props = { funnel: FunnelData };

const ConversionFunnel = ({ funnel }: Props) => {
  const steps = [
    { label: "Visitors", value: funnel.page_views },
    { label: "Product Views", value: funnel.product_views },
    { label: "Add to Cart", value: funnel.product_selections },
    { label: "Checkout", value: funnel.checkout_starts },
  ];

  const maxVal = Math.max(funnel.page_views, 1);

  // Find biggest drop-off
  let biggestDropIdx = -1;
  let biggestDropPct = 0;
  for (let i = 1; i < steps.length; i++) {
    const prev = steps[i - 1].value;
    if (prev === 0) continue;
    const dropPct = Math.round(((prev - steps[i].value) / prev) * 100);
    if (dropPct > biggestDropPct) {
      biggestDropPct = dropPct;
      biggestDropIdx = i;
    }
  }

  return (
    <div className="bg-background border border-border p-5 md:p-6">
      <h2 className="font-display text-lg text-foreground mb-5 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        Conversion Funnel
      </h2>

      <div className="space-y-3">
        {steps.map((step, i) => {
          const widthPct = Math.max(8, (step.value / maxVal) * 100);
          const dropPct = i > 0 && steps[i - 1].value > 0
            ? Math.round(((steps[i - 1].value - step.value) / steps[i - 1].value) * 100)
            : 0;
          const isBiggestDrop = i === biggestDropIdx;

          return (
            <div key={i}>
              {i > 0 && dropPct > 0 && (
                <div className={`flex items-center gap-2 py-1.5 px-3 mb-1 text-[10px] tracking-wide ${
                  isBiggestDrop
                    ? "text-destructive bg-destructive/5 border-l-2 border-destructive"
                    : "text-muted-foreground"
                }`}>
                  {isBiggestDrop && <AlertTriangle className="w-3 h-3" />}
                  <span>↓ {dropPct}% drop-off{isBiggestDrop ? " — biggest loss" : ""}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <span className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground font-medium w-24 shrink-0">
                  {step.label}
                </span>
                <div className="flex-1 h-8 bg-muted/50 relative overflow-hidden rounded-sm">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${widthPct}%` }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="h-full bg-primary relative"
                    style={{ opacity: 1 - i * 0.15 }}
                  />
                </div>
                <span className="text-sm font-display text-foreground w-12 text-right">{step.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Overall Conversion Rate</span>
        <span className="text-lg font-display text-primary">{funnel.conversion_rate || "0%"}</span>
      </div>
    </div>
  );
};

export default ConversionFunnel;
