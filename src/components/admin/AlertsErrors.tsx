import { AlertTriangle, ShieldAlert, XCircle } from "lucide-react";

type ReportData = {
  conversion_funnel: {
    conversion_rate: string;
    checkout_starts: number;
  };
  avg_time_on_page: number;
  checkout_starts: number;
  product_views: number;
  unique_sessions: number;
};

type Props = { report: ReportData };

type Alert = {
  title: string;
  description: string;
  type: "error" | "warning";
};

const AlertsErrors = ({ report }: Props) => {
  const alerts: Alert[] = [];
  const convRate = parseFloat(report.conversion_funnel?.conversion_rate || "0");

  if (convRate === 0 && report.unique_sessions > 0) {
    alerts.push({
      title: "0% Conversion Rate",
      description: "No visitors completed a purchase this period. This is a critical issue requiring immediate attention.",
      type: "error",
    });
  }

  if (report.avg_time_on_page === 0 && report.unique_sessions > 0) {
    alerts.push({
      title: "Session Time = 0s",
      description: "This likely indicates a tracking issue. Verify that the time-on-page tracker is firing correctly.",
      type: "warning",
    });
  }

  if (report.checkout_starts === 0 && report.product_views > 5) {
    alerts.push({
      title: "No Checkout Activity",
      description: `${report.product_views} product views but zero checkout starts. The product-to-checkout flow is broken.`,
      type: "error",
    });
  }

  if (report.unique_sessions > 0 && report.product_views === 0) {
    alerts.push({
      title: "No Product Views",
      description: "Visitors are landing on the site but not viewing any products. Check page layout and navigation.",
      type: "warning",
    });
  }

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="font-display text-lg text-foreground flex items-center gap-2">
        <ShieldAlert className="w-5 h-5 text-destructive" />
        Alerts & Issues
      </h2>
      {alerts.map((alert, i) => (
        <div
          key={i}
          className={`p-4 border rounded-sm flex items-start gap-3 ${
            alert.type === "error"
              ? "bg-destructive/5 border-destructive/20"
              : "bg-amber-500/5 border-amber-500/20"
          }`}
        >
          {alert.type === "error" ? (
            <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          )}
          <div>
            <p className="text-sm font-medium text-foreground">{alert.title}</p>
            <p className="text-xs text-muted-foreground font-light mt-0.5 leading-relaxed">{alert.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertsErrors;
