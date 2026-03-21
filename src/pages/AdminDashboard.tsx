import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  Eye,
  ShoppingCart,
  Clock,
  ArrowDown,
  Smartphone,
  Monitor,
  Tablet,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Loader2,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

type WeeklyReport = {
  id: string;
  week_start: string;
  week_end: string;
  total_visitors: number;
  unique_sessions: number;
  product_views: number;
  checkout_starts: number;
  avg_time_on_page: number;
  avg_scroll_depth: number;
  top_exit_reasons: Array<{ reason: string; count: number }>;
  high_intent_behaviors: Array<{ behavior: string; count: number }>;
  device_breakdown: Record<string, number>;
  traffic_sources: Array<{ source: string; count: number }>;
  product_interest: Array<{ product_id: number; views: number }>;
  conversion_funnel: {
    page_views: number;
    product_views: number;
    product_selections: number;
    checkout_starts: number;
    conversion_rate: string;
  };
  recommendations: string[];
  raw_summary: string;
  created_at: string;
};

const productNames: Record<number, string> = {
  1: "Rolex No Date",
  2: "Rolex Hulk",
  3: "Rolex Datejust 36mm",
  4: "Rolex Submariner Blue/Gold",
  5: "Rolex GMT-Master II Sprite",
  6: "Rolex Daytona Black",
};

const StatCard = ({
  icon: Icon,
  label,
  value,
  subtext,
}: {
  icon: any;
  label: string;
  value: string | number;
  subtext?: string;
}) => (
  <div className="bg-background border border-border p-5">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-9 h-9 bg-primary/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">
        {label}
      </span>
    </div>
    <p className="text-3xl font-display text-foreground">{value}</p>
    {subtext && (
      <p className="text-xs text-muted-foreground font-light mt-1">{subtext}</p>
    )}
  </div>
);

const DeviceIcon = ({ type }: { type: string }) => {
  if (type === "mobile") return <Smartphone className="w-4 h-4" />;
  if (type === "tablet") return <Tablet className="w-4 h-4" />;
  return <Monitor className="w-4 h-4" />;
};

const ADMIN_PASSWORD_HASH = "replic8admin2025";

const AdminDashboard = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin_authed") === "1");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);
  const [reports, setReports] = useState<WeeklyReport[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const fetchReports = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("weekly_reports")
      .select("*")
      .order("week_start", { ascending: false })
      .limit(20);
    setReports((data as any) || []);
    setLoading(false);
  };

  useEffect(() => {
    if (authed) fetchReports();
  }, [authed]);

  const generateNow = async () => {
    setGenerating(true);
    try {
      await supabase.functions.invoke("generate-weekly-report");
      await fetchReports();
      setCurrentIndex(0);
    } catch (err) {
      console.error("Failed to generate report:", err);
    }
    setGenerating(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD_HASH) {
      sessionStorage.setItem("admin_authed", "1");
      setAuthed(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-background border border-border p-10 max-w-sm w-full text-center"
        >
          <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-display text-2xl text-foreground mb-2 tracking-tight">Admin Access</h1>
          <p className="text-muted-foreground text-sm font-light mb-6">Enter your password to continue</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setAuthError(false); }}
              className="rounded-none bg-background border-border focus:border-primary focus:ring-primary/20 text-foreground h-12 text-center"
              autoFocus
            />
            {authError && (
              <p className="text-destructive text-xs">Incorrect password</p>
            )}
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase font-medium py-3.5 hover:bg-primary/90 transition-colors"
            >
              Enter Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }


  const report = reports[currentIndex];

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div>
            <Link to="/" className="text-muted-foreground text-xs hover:text-foreground transition-colors mb-2 inline-block">
              ← Back to site
            </Link>
            <h1 className="text-2xl font-display text-foreground tracking-tight flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-primary" />
              Analytics Dashboard
            </h1>
          </div>
          <button
            onClick={generateNow}
            disabled={generating}
            className="flex items-center gap-2 bg-primary text-primary-foreground text-xs tracking-[0.15em] uppercase font-medium px-5 py-3 hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {generating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Generate Report Now
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {reports.length === 0 ? (
          <div className="text-center py-20">
            <BarChart3 className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="font-display text-xl text-foreground mb-2">No Reports Yet</h2>
            <p className="text-muted-foreground text-sm font-light mb-6">
              Click "Generate Report Now" to create your first weekly analytics report.
            </p>
          </div>
        ) : (
          <>
            {/* Week navigation */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setCurrentIndex(Math.min(currentIndex + 1, reports.length - 1))}
                disabled={currentIndex >= reports.length - 1}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Previous Week
              </button>
              <div className="text-center">
                <p className="font-display text-lg text-foreground">
                  {new Date(report.week_start).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                  })}{" "}
                  –{" "}
                  {new Date(report.week_end).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p className="text-xs text-muted-foreground font-light">
                  Report {currentIndex + 1} of {reports.length}
                </p>
              </div>
              <button
                onClick={() => setCurrentIndex(Math.max(currentIndex - 1, 0))}
                disabled={currentIndex <= 0}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                Next Week <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              <StatCard icon={Users} label="Unique Visitors" value={report.unique_sessions} />
              <StatCard icon={Eye} label="Page Views" value={report.total_visitors} />
              <StatCard icon={Eye} label="Product Views" value={report.product_views} />
              <StatCard icon={ShoppingCart} label="Checkouts" value={report.checkout_starts} />
              <StatCard icon={Clock} label="Avg Time" value={`${report.avg_time_on_page}s`} />
              <StatCard icon={ArrowDown} label="Scroll Depth" value={`${report.avg_scroll_depth}%`} />
            </div>

            {/* Conversion funnel */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-background border border-border p-6 mb-6"
            >
              <h2 className="font-display text-lg text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Conversion Funnel
              </h2>
              <div className="flex items-end gap-2 h-40">
                {[
                  { label: "Views", value: report.conversion_funnel?.page_views || 0 },
                  { label: "Products", value: report.conversion_funnel?.product_views || 0 },
                  { label: "Selections", value: report.conversion_funnel?.product_selections || 0 },
                  { label: "Checkouts", value: report.conversion_funnel?.checkout_starts || 0 },
                ].map((step, i) => {
                  const maxVal = report.conversion_funnel?.page_views || 1;
                  const height = Math.max(8, (step.value / maxVal) * 100);
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-sm font-display text-foreground">{step.value}</span>
                      <div
                        className="w-full bg-primary/20 relative overflow-hidden"
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute inset-0 bg-primary" style={{ opacity: 1 - i * 0.2 }} />
                      </div>
                      <span className="text-[9px] tracking-[0.1em] uppercase text-muted-foreground font-medium">
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-center mt-4 text-sm text-primary font-medium">
                Conversion Rate: {report.conversion_funnel?.conversion_rate || "0%"}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Top exit reasons */}
              <div className="bg-background border border-border p-6">
                <h2 className="font-display text-lg text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  Top Reasons Users Don't Convert
                </h2>
                {(report.top_exit_reasons || []).length === 0 ? (
                  <p className="text-muted-foreground text-sm font-light">
                    No survey data yet — more responses needed
                  </p>
                ) : (
                  <div className="space-y-3">
                    {report.top_exit_reasons.map((r, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-destructive/10 text-destructive text-xs flex items-center justify-center font-medium">
                            {i + 1}
                          </span>
                          <span className="text-sm text-foreground">{r.reason}</span>
                        </div>
                        <span className="text-sm text-muted-foreground font-light">
                          {r.count} response{r.count !== 1 ? "s" : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* High-intent behaviors */}
              <div className="bg-background border border-border p-6">
                <h2 className="font-display text-lg text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  High-Intent Behaviors
                </h2>
                {(report.high_intent_behaviors || []).length === 0 ? (
                  <p className="text-muted-foreground text-sm font-light">
                    No high-intent signals yet — more traffic needed
                  </p>
                ) : (
                  <div className="space-y-3">
                    {report.high_intent_behaviors.map((b, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                            {i + 1}
                          </span>
                          <span className="text-sm text-foreground">{b.behavior}</span>
                        </div>
                        <span className="text-sm text-muted-foreground font-light">
                          {b.count} user{b.count !== 1 ? "s" : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Device breakdown */}
              <div className="bg-background border border-border p-6">
                <h2 className="font-display text-base text-foreground mb-4">Device Breakdown</h2>
                <div className="space-y-3">
                  {Object.entries(report.device_breakdown || {}).map(([device, count]) => {
                    const total = Object.values(report.device_breakdown).reduce((a, b) => a + b, 0);
                    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                    return (
                      <div key={device} className="flex items-center gap-3">
                        <DeviceIcon type={device} />
                        <span className="text-sm text-foreground capitalize flex-1">{device}</span>
                        <span className="text-sm text-muted-foreground">{pct}%</span>
                        <div className="w-20 h-1.5 bg-muted overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Traffic sources */}
              <div className="bg-background border border-border p-6">
                <h2 className="font-display text-base text-foreground mb-4">Traffic Sources</h2>
                {(report.traffic_sources || []).length === 0 ? (
                  <p className="text-muted-foreground text-sm font-light">No data yet</p>
                ) : (
                  <div className="space-y-3">
                    {report.traffic_sources.slice(0, 5).map((s, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{s.source}</span>
                        <span className="text-sm text-muted-foreground">{s.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product interest */}
              <div className="bg-background border border-border p-6">
                <h2 className="font-display text-base text-foreground mb-4">Most Viewed Products</h2>
                {(report.product_interest || []).length === 0 ? (
                  <p className="text-muted-foreground text-sm font-light">No data yet</p>
                ) : (
                  <div className="space-y-3">
                    {report.product_interest.slice(0, 5).map((p, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">
                          {productNames[p.product_id] || `Product ${p.product_id}`}
                        </span>
                        <span className="text-sm text-muted-foreground">{p.views} views</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-background border border-border p-6 mb-6">
              <h2 className="font-display text-lg text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[hsl(var(--rolex-gold))]" />
                Actionable Recommendations
              </h2>
              <div className="space-y-3">
                {(report.recommendations || []).map((rec, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="w-6 h-6 bg-primary/10 text-primary text-xs flex items-center justify-center font-medium shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-foreground font-light leading-relaxed">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
