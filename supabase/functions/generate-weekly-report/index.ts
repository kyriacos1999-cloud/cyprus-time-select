import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Calculate week range (last 7 days)
    const now = new Date();
    const weekEnd = new Date(now);
    weekEnd.setHours(23, 59, 59, 999);
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - 7);
    weekStart.setHours(0, 0, 0, 0);

    const startISO = weekStart.toISOString();
    const endISO = weekEnd.toISOString();

    // Fetch all events for the week
    const { data: events, error } = await supabase
      .from("visitor_events")
      .select("*")
      .gte("created_at", startISO)
      .lte("created_at", endISO)
      .order("created_at", { ascending: true });

    if (error) throw error;

    // Filter out internal / admin / preview traffic that shouldn't count
    // toward real visitor analytics.
    const isInternalEvent = (e: any): boolean => {
      const page: string = e.page || "";
      const ref: string = e.referrer || "";
      const ua: string = e.metadata?.user_agent || "";
      if (page.startsWith("/admin")) return true;
      if (/lovable\.app|lovableproject\.com|lovable\.dev/i.test(ref)) return true;
      if (/bot|crawl|spider|slurp|facebookexternalhit|preview|lighthouse|headless/i.test(ua)) return true;
      return false;
    };
    const allEvents = (events || []).filter((e: any) => !isInternalEvent(e));

    // === ANALYTICS CALCULATIONS ===

    // Total visitors & unique sessions
    const sessions = new Set(allEvents.map((e: any) => e.session_id));
    const uniqueSessions = sessions.size;

    // Page views
    const pageViews = allEvents.filter((e: any) => e.event_type === "page_view");
    const totalVisitors = pageViews.length;

    // Product views
    const productViews = allEvents.filter((e: any) => e.event_type === "product_view");
    const productViewCount = productViews.length;

    // Checkout starts
    const checkoutStarts = allEvents.filter((e: any) => e.event_type === "checkout_start").length;

    // Average time on page
    const exitEvents = allEvents.filter((e: any) => e.event_type === "page_exit" && e.time_on_page);
    const avgTimeOnPage = exitEvents.length > 0
      ? Math.round(exitEvents.reduce((sum: number, e: any) => sum + (e.time_on_page || 0), 0) / exitEvents.length)
      : 0;

    // Average scroll depth
    const avgScrollDepth = exitEvents.length > 0
      ? Math.round(exitEvents.reduce((sum: number, e: any) => sum + (e.scroll_depth || 0), 0) / exitEvents.length)
      : 0;

    // Device breakdown
    const deviceCounts: Record<string, number> = {};
    pageViews.forEach((e: any) => {
      const device = e.device_type || "unknown";
      deviceCounts[device] = (deviceCounts[device] || 0) + 1;
    });

    // Traffic sources — use metadata.traffic_source first, then click IDs in
    // the referrer query string, then referrer host. Own-domain referrers
    // (replic8.shop → replic8.shop) are treated as "direct".
    const OWN_DOMAINS = ["replic8.shop", "www.replic8.shop"];
    const classifyHost = (host: string): string | null => {
      const h = host.toLowerCase();
      if (h.includes("google")) return "google";
      if (h.includes("facebook") || h.includes("fb.com") || h.includes("fb.me")) return "facebook";
      if (h.includes("instagram")) return "instagram";
      if (h.includes("tiktok")) return "tiktok";
      if (h.includes("youtube")) return "youtube";
      if (h.includes("twitter") || h.includes("x.com")) return "twitter/x";
      if (h.includes("pinterest")) return "pinterest";
      if (h.includes("reddit")) return "reddit";
      if (h.includes("linkedin")) return "linkedin";
      if (h.includes("whatsapp")) return "whatsapp";
      if (h.includes("t.me") || h.includes("telegram")) return "telegram";
      return null;
    };

    const sourceCounts: Record<string, number> = {};
    pageViews.forEach((e: any) => {
      let source: string = (e.metadata?.traffic_source || "").toLowerCase() || "direct";

      // Normalize: own-domain or preview hosts saved as a "source" → direct
      if (OWN_DOMAINS.includes(source) || /lovable/i.test(source)) source = "direct";

      // If still direct, attempt to recover from referrer
      if (source === "direct") {
        const ref = e.referrer || "";
        if (ref) {
          try {
            const url = new URL(ref);
            const host = url.hostname.toLowerCase();
            if (!OWN_DOMAINS.includes(host) && !/lovable/i.test(host)) {
              // Click identifiers in URL → social platform
              if (/fbclid=/i.test(ref)) source = "facebook";
              else if (/gclid=/i.test(ref)) source = "google";
              else if (/ttclid=/i.test(ref)) source = "tiktok";
              else source = classifyHost(host) || host;
            }
          } catch {
            /* ignore malformed referrer */
          }
        }
      }

      // Capitalize first letter for display
      source = source.charAt(0).toUpperCase() + source.slice(1);
      sourceCounts[source] = (sourceCounts[source] || 0) + 1;
    });
    const trafficSources = Object.entries(sourceCounts)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Product interest
    const productInterest: Record<number, number> = {};
    productViews.forEach((e: any) => {
      if (e.product_id) {
        productInterest[e.product_id] = (productInterest[e.product_id] || 0) + 1;
      }
    });
    const productInterestArr = Object.entries(productInterest)
      .map(([id, views]) => ({ product_id: Number(id), views }))
      .sort((a, b) => b.views - a.views);

    // Survey responses (exit intent)
    const surveyEvents = allEvents.filter((e: any) => e.event_type === "survey_response");
    const reasonCounts: Record<string, number> = {};
    surveyEvents.forEach((e: any) => {
      const answer = e.metadata?.answer || "Unknown";
      reasonCounts[answer] = (reasonCounts[answer] || 0) + 1;
    });
    const topExitReasons = Object.entries(reasonCounts)
      .map(([reason, count]) => ({ reason, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // High-intent behaviors
    const highIntentBehaviors: Array<{ behavior: string; count: number }> = [];

    // Users who viewed 3+ products
    const sessionProductViews: Record<string, Set<number>> = {};
    productViews.forEach((e: any) => {
      if (!sessionProductViews[e.session_id]) sessionProductViews[e.session_id] = new Set();
      if (e.product_id) sessionProductViews[e.session_id].add(e.product_id);
    });
    const multiProductViewers = Object.values(sessionProductViews).filter((s) => s.size >= 3).length;
    if (multiProductViewers > 0) {
      highIntentBehaviors.push({ behavior: "Viewed 3+ products", count: multiProductViewers });
    }

    // Users who scrolled 80%+
    const deepScrollers = exitEvents.filter((e: any) => (e.scroll_depth || 0) >= 80).length;
    if (deepScrollers > 0) {
      highIntentBehaviors.push({ behavior: "Scrolled 80%+ of page", count: deepScrollers });
    }

    // Users who spent 3+ minutes
    const longVisitors = exitEvents.filter((e: any) => (e.time_on_page || 0) >= 180).length;
    if (longVisitors > 0) {
      highIntentBehaviors.push({ behavior: "Spent 3+ minutes on site", count: longVisitors });
    }

    // Users who selected a product
    const productSelections = allEvents.filter((e: any) => e.event_type === "product_select").length;
    if (productSelections > 0) {
      highIntentBehaviors.push({ behavior: "Selected a product for checkout", count: productSelections });
    }

    // Cart abandonment reminders shown
    const cartReminders = allEvents.filter((e: any) => e.event_type === "cart_abandonment_reminder").length;
    if (cartReminders > 0) {
      highIntentBehaviors.push({ behavior: "Triggered cart abandonment reminder", count: cartReminders });
    }

    highIntentBehaviors.sort((a, b) => b.count - a.count);

    // Conversion funnel
    const conversionFunnel = {
      page_views: totalVisitors,
      product_views: productViewCount,
      product_selections: productSelections,
      checkout_starts: checkoutStarts,
      conversion_rate: totalVisitors > 0
        ? `${((checkoutStarts / totalVisitors) * 100).toFixed(1)}%`
        : "0%",
    };

    // AI-powered recommendations
    const recommendations: string[] = [];

    if (avgScrollDepth < 50) {
      recommendations.push("Most users don't scroll past 50% — consider moving key selling points and CTA higher on the page.");
    }
    if (deviceCounts["mobile"] > (deviceCounts["desktop"] || 0)) {
      recommendations.push("Mobile traffic dominates — prioritize mobile UX improvements and faster load times.");
    }
    if (topExitReasons.find((r) => r.reason === "Price too high")) {
      recommendations.push("'Price too high' is a top concern — test showing value comparisons (genuine vs clone price) or introduce a payment plan.");
    }
    if (topExitReasons.find((r) => r.reason === "Not sure about quality")) {
      recommendations.push("Quality concern is high — add more close-up product photos, video reviews, or a satisfaction guarantee badge.");
    }
    if (multiProductViewers > 0 && checkoutStarts === 0) {
      recommendations.push("Users viewing multiple products but not checking out — consider adding a comparison table or bundle discounts.");
    }
    if (productSelections > checkoutStarts * 2) {
      recommendations.push("Many product selections but few checkout completions — simplify the checkout form or add guest checkout.");
    }
    if (recommendations.length === 0) {
      recommendations.push("Continue monitoring — not enough data yet for strong recommendations. Focus on driving more traffic.");
    }

    // Summary text
    const rawSummary = `Weekly Report: ${weekStart.toLocaleDateString()} – ${weekEnd.toLocaleDateString()}
    
📊 Overview:
- ${uniqueSessions} unique visitors (${totalVisitors} page views)
- ${productViewCount} product views → ${productSelections} selections → ${checkoutStarts} checkouts
- Conversion rate: ${conversionFunnel.conversion_rate}
- Avg time on page: ${avgTimeOnPage}s | Avg scroll depth: ${avgScrollDepth}%

🔍 Top Reasons Users Don't Convert:
${topExitReasons.map((r, i) => `${i + 1}. ${r.reason} (${r.count} responses)`).join("\n") || "No survey data yet"}

🎯 High-Intent Behaviors:
${highIntentBehaviors.map((b, i) => `${i + 1}. ${b.behavior} (${b.count} users)`).join("\n") || "No high-intent signals yet"}

💡 Recommendations:
${recommendations.map((r, i) => `${i + 1}. ${r}`).join("\n")}`;

    // Store report
    const { error: insertError } = await supabase.from("weekly_reports").insert({
      week_start: weekStart.toISOString().split("T")[0],
      week_end: weekEnd.toISOString().split("T")[0],
      total_visitors: totalVisitors,
      unique_sessions: uniqueSessions,
      product_views: productViewCount,
      checkout_starts: checkoutStarts,
      avg_time_on_page: avgTimeOnPage,
      avg_scroll_depth: avgScrollDepth,
      top_exit_reasons: topExitReasons,
      high_intent_behaviors: highIntentBehaviors,
      device_breakdown: deviceCounts,
      traffic_sources: trafficSources,
      product_interest: productInterestArr,
      conversion_funnel: conversionFunnel,
      recommendations,
      raw_summary: rawSummary,
    });

    if (insertError) throw insertError;

    // Send email report via queue
    const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e0e0e0;">
  <div style="background:#006039;padding:28px 32px;">
    <h1 style="margin:0;color:#ffffff;font-size:22px;letter-spacing:1px;">Replic8 Weekly Report</h1>
    <p style="margin:6px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">
      ${weekStart.toLocaleDateString("en-GB",{day:"numeric",month:"short"})} – ${weekEnd.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}
    </p>
  </div>

  <div style="padding:28px 32px;">
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr>
        <td style="padding:12px;text-align:center;border:1px solid #eee;">
          <div style="font-size:28px;font-weight:bold;color:#1a1a1a;">${uniqueSessions}</div>
          <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">Visitors</div>
        </td>
        <td style="padding:12px;text-align:center;border:1px solid #eee;">
          <div style="font-size:28px;font-weight:bold;color:#1a1a1a;">${productViewCount}</div>
          <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">Product Views</div>
        </td>
        <td style="padding:12px;text-align:center;border:1px solid #eee;">
          <div style="font-size:28px;font-weight:bold;color:#1a1a1a;">${checkoutStarts}</div>
          <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">Checkouts</div>
        </td>
      </tr>
      <tr>
        <td style="padding:12px;text-align:center;border:1px solid #eee;">
          <div style="font-size:28px;font-weight:bold;color:#006039;">${conversionFunnel.conversion_rate}</div>
          <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">Conversion</div>
        </td>
        <td style="padding:12px;text-align:center;border:1px solid #eee;">
          <div style="font-size:28px;font-weight:bold;color:#1a1a1a;">${avgTimeOnPage}s</div>
          <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">Avg Time</div>
        </td>
        <td style="padding:12px;text-align:center;border:1px solid #eee;">
          <div style="font-size:28px;font-weight:bold;color:#1a1a1a;">${avgScrollDepth}%</div>
          <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">Scroll Depth</div>
        </td>
      </tr>
    </table>

    <h2 style="font-size:15px;color:#1a1a1a;margin:24px 0 12px;border-bottom:2px solid #006039;padding-bottom:6px;">
      🔍 Top Reasons Users Don't Convert
    </h2>
    ${topExitReasons.length > 0
      ? `<ol style="margin:0;padding-left:20px;color:#333;font-size:14px;line-height:1.8;">
          ${topExitReasons.map((r: any) => `<li>${r.reason} <span style="color:#888;">(${r.count})</span></li>`).join("")}
        </ol>`
      : `<p style="color:#888;font-size:14px;">No survey data yet — more responses needed</p>`}

    <h2 style="font-size:15px;color:#1a1a1a;margin:24px 0 12px;border-bottom:2px solid #006039;padding-bottom:6px;">
      🎯 High-Intent Behaviors
    </h2>
    ${highIntentBehaviors.length > 0
      ? `<ol style="margin:0;padding-left:20px;color:#333;font-size:14px;line-height:1.8;">
          ${highIntentBehaviors.map((b: any) => `<li>${b.behavior} <span style="color:#888;">(${b.count} users)</span></li>`).join("")}
        </ol>`
      : `<p style="color:#888;font-size:14px;">No high-intent signals yet</p>`}

    <h2 style="font-size:15px;color:#1a1a1a;margin:24px 0 12px;border-bottom:2px solid #006039;padding-bottom:6px;">
      💡 Recommendations
    </h2>
    <ol style="margin:0;padding-left:20px;color:#333;font-size:14px;line-height:1.8;">
      ${recommendations.map((r: string) => `<li>${r}</li>`).join("")}
    </ol>

    <div style="margin-top:28px;text-align:center;">
      <a href="https://replic8.shop/admin" style="display:inline-block;background:#006039;color:#ffffff;text-decoration:none;padding:12px 28px;font-size:13px;letter-spacing:1px;text-transform:uppercase;">
        View Full Dashboard
      </a>
    </div>
  </div>

  <div style="background:#f8f8f8;padding:16px 32px;border-top:1px solid #eee;">
    <p style="margin:0;color:#999;font-size:11px;text-align:center;">
      Replic8 — Weekly Analytics Report · replic8.shop
    </p>
  </div>
</div>
</body>
</html>`;

    try {
      await supabase.rpc("enqueue_email", {
        queue_name: "transactional_emails",
        message_body: JSON.stringify({
          to: "kyriacos1999@gmail.com",
          subject: `Replic8 Weekly Report — ${weekStart.toLocaleDateString("en-GB", { day: "numeric", month: "short" })} to ${weekEnd.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`,
          html: emailHtml,
          from_name: "Replic8 Analytics",
          message_id: `weekly-report-${weekStart.toISOString().split("T")[0]}`,
          template_name: "weekly_report",
        }),
      });
    } catch (emailErr: any) {
      console.error("Email enqueue failed:", emailErr);
      // Don't throw — report is already saved, email is optional
    }

    return new Response(
      JSON.stringify({ success: true, summary: rawSummary }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Report generation error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
