import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Loader2,
  Lock,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import ExecutiveSummary from "@/components/admin/ExecutiveSummary";
import ConversionFunnel from "@/components/admin/ConversionFunnel";
import BehaviorInsights from "@/components/admin/BehaviorInsights";
import HighIntentUsers from "@/components/admin/HighIntentUsers";
import TrafficQuality from "@/components/admin/TrafficQuality";
import DeviceOptimization from "@/components/admin/DeviceOptimization";
import ProductPerformance from "@/components/admin/ProductPerformance";
import ActionableRecommendations from "@/components/admin/ActionableRecommendations";
import AlertsErrors from "@/components/admin/AlertsErrors";

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

const ADMIN_PASSWORD_HASH = "Antriana99";

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
  const prevReport = reports[currentIndex + 1];

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
      <header className="bg-background border-b border-border sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <Link to="/" className="text-muted-foreground text-xs hover:text-foreground transition-colors mb-1 inline-block">
              ← Back to site
            </Link>
            <h1 className="text-xl md:text-2xl font-display text-foreground tracking-tight flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Analytics
            </h1>
          </div>
          <button
            onClick={generateNow}
            disabled={generating}
            className="flex items-center gap-2 bg-primary text-primary-foreground text-[10px] md:text-xs tracking-[0.15em] uppercase font-medium px-4 md:px-5 py-2.5 md:py-3 hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {generating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">Generate Report</span>
            <span className="sm:hidden">Generate</span>
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-8 max-w-5xl">
        {reports.length === 0 ? (
          <div className="text-center py-20">
            <BarChart3 className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="font-display text-xl text-foreground mb-2">No Reports Yet</h2>
            <p className="text-muted-foreground text-sm font-light mb-6">
              Click "Generate Report" to create your first weekly analytics report.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Week navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentIndex(Math.min(currentIndex + 1, reports.length - 1))}
                disabled={currentIndex >= reports.length - 1}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> <span className="hidden sm:inline">Previous</span>
              </button>
              <div className="text-center">
                <p className="font-display text-base md:text-lg text-foreground">
                  {new Date(report.week_start).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  {" – "}
                  {new Date(report.week_end).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </p>
                <p className="text-[10px] text-muted-foreground font-light">
                  Report {currentIndex + 1} of {reports.length}
                </p>
              </div>
              <button
                onClick={() => setCurrentIndex(Math.max(currentIndex - 1, 0))}
                disabled={currentIndex <= 0}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                <span className="hidden sm:inline">Next</span> <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* 1. Executive Summary */}
            <ExecutiveSummary current={report} previous={prevReport} />

            {/* 9. Alerts (shown early if critical) */}
            <AlertsErrors report={report} />

            {/* 2. Conversion Funnel */}
            <ConversionFunnel funnel={report.conversion_funnel || { page_views: 0, product_views: 0, product_selections: 0, checkout_starts: 0, conversion_rate: "0%" }} />

            {/* 3 + 4. Behavior + High Intent side by side */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <BehaviorInsights
                avgTime={report.avg_time_on_page}
                avgScrollDepth={report.avg_scroll_depth}
                totalVisitors={report.total_visitors}
                uniqueSessions={report.unique_sessions}
              />
              <HighIntentUsers highIntentBehaviors={report.high_intent_behaviors || []} />
            </div>

            {/* 5 + 6. Traffic + Devices side by side */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <TrafficQuality
                trafficSources={report.traffic_sources || []}
                totalVisitors={report.total_visitors}
              />
              <DeviceOptimization deviceBreakdown={report.device_breakdown || {}} />
            </div>

            {/* 7. Product Performance */}
            <ProductPerformance
              productInterest={report.product_interest || []}
              checkoutStarts={report.checkout_starts}
            />

            {/* Top Exit Reasons */}
            {(report.top_exit_reasons || []).length > 0 && (
              <div className="bg-background border border-border p-5 md:p-6">
                <h2 className="font-display text-lg text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  Why Users Don't Convert
                </h2>
                <div className="space-y-3">
                  {report.top_exit_reasons.map((r, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-destructive/10 text-destructive text-xs flex items-center justify-center font-medium rounded-sm">
                          {i + 1}
                        </span>
                        <span className="text-sm text-foreground">{r.reason}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{r.count} response{r.count !== 1 ? "s" : ""}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. Actionable Recommendations */}
            <ActionableRecommendations report={report} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
