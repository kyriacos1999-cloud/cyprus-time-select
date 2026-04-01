import { Lightbulb, ArrowRight, AlertCircle, Zap, Info } from "lucide-react";

type ReportData = {
  conversion_funnel: {
    page_views: number;
    product_views: number;
    product_selections: number;
    checkout_starts: number;
    conversion_rate: string;
  };
  avg_scroll_depth: number;
  avg_time_on_page: number;
  checkout_starts: number;
  product_views: number;
  unique_sessions: number;
  recommendations: string[];
};

type Props = { report: ReportData };

type Insight = {
  text: string;
  impact: "high" | "medium" | "low";
  action?: string;
};

const generateInsights = (r: ReportData): Insight[] => {
  const insights: Insight[] = [];
  const convRate = parseFloat(r.conversion_funnel?.conversion_rate || "0");

  if (convRate === 0 && r.unique_sessions > 0) {
    insights.push({
      text: "Zero conversions despite traffic — your biggest bottleneck.",
      impact: "high",
      action: "Review checkout flow & add trust signals",
    });
  }

  if (r.product_views > 0 && r.conversion_funnel?.product_selections === 0) {
    insights.push({
      text: "Users view products but never add to cart — product pages aren't convincing enough.",
      impact: "high",
      action: "Add social proof, better images, and clearer CTAs to product pages",
    });
  }

  if (r.conversion_funnel?.product_selections > 0 && r.checkout_starts === 0) {
    insights.push({
      text: "Users add to cart but don't checkout — friction in the purchase flow.",
      impact: "high",
      action: "Simplify checkout, add payment trust badges",
    });
  }

  if (r.avg_scroll_depth > 0 && r.avg_scroll_depth < 40) {
    insights.push({
      text: `Low scroll depth (${r.avg_scroll_depth}%) — visitors leave before seeing key content.`,
      impact: "medium",
      action: "Move CTA and value propositions above the fold",
    });
  }

  if (r.avg_time_on_page > 0 && r.avg_time_on_page < 15) {
    insights.push({
      text: `Very short session times (${r.avg_time_on_page}s) — users aren't engaging.`,
      impact: "medium",
      action: "Improve hero section and loading speed",
    });
  }

  if (r.avg_time_on_page === 0) {
    insights.push({
      text: "Session time showing 0s — possible tracking issue.",
      impact: "low",
      action: "Verify analytics tracking is firing correctly",
    });
  }

  // Add server-generated recommendations as medium
  r.recommendations?.forEach((rec) => {
    if (!insights.some((i) => i.text === rec)) {
      insights.push({ text: rec, impact: "medium" });
    }
  });

  return insights;
};

const impactConfig = {
  high: { color: "text-destructive", bg: "bg-destructive/8", border: "border-destructive/15", icon: AlertCircle, label: "High Impact" },
  medium: { color: "text-amber-600", bg: "bg-amber-500/8", border: "border-amber-500/15", icon: Zap, label: "Medium Impact" },
  low: { color: "text-muted-foreground", bg: "bg-muted/50", border: "border-border", icon: Info, label: "Low Impact" },
};

const ActionableRecommendations = ({ report }: Props) => {
  const insights = generateInsights(report);

  return (
    <div className="bg-background border border-border p-5 md:p-6">
      <h2 className="font-display text-lg text-foreground mb-5 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-accent" />
        What to Do Next
      </h2>

      {insights.length === 0 ? (
        <p className="text-muted-foreground text-sm font-light">
          Not enough data to generate recommendations yet.
        </p>
      ) : (
        <div className="space-y-3">
          {insights.map((insight, i) => {
            const config = impactConfig[insight.impact];
            const Icon = config.icon;
            return (
              <div key={i} className={`p-3.5 border ${config.border} ${config.bg} rounded-sm`}>
                <div className="flex items-start gap-3">
                  <Icon className={`w-4 h-4 ${config.color} shrink-0 mt-0.5`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[9px] tracking-[0.15em] uppercase font-medium ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                    <p className="text-sm text-foreground font-light leading-relaxed">{insight.text}</p>
                    {insight.action && (
                      <p className="text-xs text-primary font-medium mt-2 flex items-center gap-1">
                        <ArrowRight className="w-3 h-3" /> {insight.action}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ActionableRecommendations;
