import { motion } from "framer-motion";
import { Users, Eye, ShoppingCart, MousePointerClick, CreditCard, AlertTriangle, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type WeeklyReport = {
  total_visitors: number;
  unique_sessions: number;
  product_views: number;
  checkout_starts: number;
  conversion_funnel: {
    page_views: number;
    product_views: number;
    product_selections: number;
    checkout_starts: number;
    conversion_rate: string;
  };
};

type Props = {
  current: WeeklyReport;
  previous?: WeeklyReport;
};

const calcChange = (curr: number, prev: number) => {
  if (prev === 0) return curr > 0 ? 100 : 0;
  return Math.round(((curr - prev) / prev) * 100);
};

const ChangeIndicator = ({ change }: { change: number }) => {
  if (change === 0) return <span className="text-muted-foreground text-[10px] flex items-center gap-0.5"><Minus className="w-3 h-3" />0%</span>;
  if (change > 0) return <span className="text-emerald-600 text-[10px] flex items-center gap-0.5"><TrendingUp className="w-3 h-3" />+{change}%</span>;
  return <span className="text-destructive text-[10px] flex items-center gap-0.5"><TrendingDown className="w-3 h-3" />{change}%</span>;
};

const MetricCard = ({
  icon: Icon,
  label,
  value,
  change,
  tooltip,
}: {
  icon: any;
  label: string;
  value: string | number;
  change?: number;
  tooltip: string;
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="bg-background border border-border p-4 md:p-5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-primary/8 flex items-center justify-center rounded-sm">
                <Icon className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium">
                {label}
              </span>
            </div>
            {change !== undefined && <ChangeIndicator change={change} />}
          </div>
          <p className="text-2xl md:text-3xl font-display text-foreground">{value}</p>
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-[200px]">
        <p className="text-xs">{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const ExecutiveSummary = ({ current, previous }: Props) => {
  const convRate = parseFloat(current.conversion_funnel?.conversion_rate || "0");
  const addToCartRate = current.total_visitors > 0
    ? ((current.conversion_funnel?.product_selections || 0) / current.total_visitors * 100).toFixed(1)
    : "0";
  const checkoutRate = current.total_visitors > 0
    ? ((current.checkout_starts || 0) / current.total_visitors * 100).toFixed(1)
    : "0";

  const prevConvRate = previous ? parseFloat(previous.conversion_funnel?.conversion_rate || "0") : undefined;
  const prevAddToCart = previous && previous.total_visitors > 0
    ? (previous.conversion_funnel?.product_selections || 0) / previous.total_visitors * 100
    : undefined;
  const prevCheckoutRate = previous && previous.total_visitors > 0
    ? (previous.checkout_starts || 0) / previous.total_visitors * 100
    : undefined;

  // Detect biggest problem
  const problems: { message: string; severity: "critical" | "warning" }[] = [];
  if (convRate === 0 && current.total_visitors > 0) {
    problems.push({ message: "0% conversion rate — no visitors are purchasing", severity: "critical" });
  }
  if (current.checkout_starts === 0 && current.product_views > 0) {
    problems.push({ message: "No checkout activity despite product views", severity: "critical" });
  }
  if (parseFloat(addToCartRate) === 0 && current.product_views > 0) {
    problems.push({ message: "Users view products but never add to cart", severity: "warning" });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
        <MetricCard
          icon={Users}
          label="Visitors"
          value={current.unique_sessions}
          change={previous ? calcChange(current.unique_sessions, previous.unique_sessions) : undefined}
          tooltip="Unique sessions tracked this period"
        />
        <MetricCard
          icon={Eye}
          label="Product Views"
          value={current.product_views}
          change={previous ? calcChange(current.product_views, previous.product_views) : undefined}
          tooltip="Number of times product pages were viewed"
        />
        <MetricCard
          icon={MousePointerClick}
          label="Add to Cart"
          value={`${addToCartRate}%`}
          change={prevAddToCart !== undefined ? calcChange(parseFloat(addToCartRate), prevAddToCart) : undefined}
          tooltip="% of visitors who added a product to cart"
        />
        <MetricCard
          icon={ShoppingCart}
          label="Checkout Rate"
          value={`${checkoutRate}%`}
          change={prevCheckoutRate !== undefined ? calcChange(parseFloat(checkoutRate), prevCheckoutRate) : undefined}
          tooltip="% of visitors who started checkout"
        />
        <MetricCard
          icon={CreditCard}
          label="Conversion"
          value={current.conversion_funnel?.conversion_rate || "0%"}
          change={prevConvRate !== undefined ? calcChange(convRate, prevConvRate) : undefined}
          tooltip="% of visitors who completed a purchase"
        />
      </div>

      {problems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border p-4 flex items-start gap-3 ${
            problems[0].severity === "critical"
              ? "bg-destructive/5 border-destructive/20"
              : "bg-amber-500/5 border-amber-500/20"
          }`}
        >
          <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${
            problems[0].severity === "critical" ? "text-destructive" : "text-amber-500"
          }`} />
          <div>
            <p className="text-sm font-medium text-foreground">
              {problems[0].severity === "critical" ? "Critical Issue" : "Warning"}
            </p>
            <p className="text-sm text-muted-foreground font-light mt-0.5">{problems[0].message}</p>
            {problems.length > 1 && (
              <p className="text-xs text-muted-foreground mt-2">
                +{problems.length - 1} more issue{problems.length > 2 ? "s" : ""} detected
              </p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ExecutiveSummary;
