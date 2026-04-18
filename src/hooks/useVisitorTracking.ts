import { useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

const PRODUCTION_HOSTS = ["replic8.shop", "www.replic8.shop"];

/**
 * Returns true when the current page should NOT be tracked
 * (admin views, Lovable preview/editor, localhost, or bots).
 */
const shouldSkipTracking = (): boolean => {
  if (typeof window === "undefined") return true;

  const path = window.location.pathname || "";
  const host = window.location.hostname || "";
  const ua = navigator.userAgent || "";

  // 1. Admin pages — never count own admin sessions as visitors
  if (path.startsWith("/admin")) return true;

  // 2. Lovable preview / editor / localhost — only track real production traffic
  if (
    host.includes("lovable.app") ||
    host.includes("lovableproject.com") ||
    host.includes("lovable.dev") ||
    host === "localhost" ||
    host === "127.0.0.1"
  ) {
    return true;
  }

  // 3. Persistent admin flag — once you log into admin in this browser,
  // skip your own visits for the rest of the session.
  try {
    if (sessionStorage.getItem("admin_authed") === "1") return true;
    if (localStorage.getItem("is_internal_user") === "1") return true;
  } catch { /* ignore */ }

  // 4. Common bots / crawlers
  if (/bot|crawl|spider|slurp|facebookexternalhit|preview|lighthouse|headless/i.test(ua)) {
    return true;
  }

  return false;
};

const getSessionId = (): string => {
  let id = sessionStorage.getItem("visitor_session_id");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("visitor_session_id", id);
  }
  return id;
};

const getDeviceType = (): string => {
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
};

const getVisitorType = (): "new" | "returning" => {
  const visited = localStorage.getItem("has_visited");
  if (visited) return "returning";
  localStorage.setItem("has_visited", "1");
  return "new";
};

const getVisitCount = (): number => {
  const count = parseInt(localStorage.getItem("visit_count") || "0", 10) + 1;
  localStorage.setItem("visit_count", String(count));
  return count;
};

const getUtmParams = (): Record<string, string> => {
  const params = new URLSearchParams(window.location.search);
  const utms: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const val = params.get(key);
    if (val) utms[key] = val;
  }
  // Persist UTMs for the session so they survive page navigations
  if (Object.keys(utms).length > 0) {
    sessionStorage.setItem("utm_params", JSON.stringify(utms));
  }
  const stored = sessionStorage.getItem("utm_params");
  return stored ? JSON.parse(stored) : {};
};

/**
 * Determine traffic source. Improvements:
 *  - Detect fbclid / gclid / ttclid click identifiers as facebook/google/tiktok
 *  - Treat own-domain referrers (replic8.shop → replic8.shop) as "direct"
 *  - UTMs always win
 */
const getTrafficSource = (): string => {
  const utms = getUtmParams();
  if (utms.utm_source) return utms.utm_source.toLowerCase();

  // Click identifiers — these survive even when the referrer is stripped
  const search = window.location.search || "";
  if (/[?&]fbclid=/i.test(search)) return "facebook";
  if (/[?&]gclid=/i.test(search)) return "google";
  if (/[?&]ttclid=/i.test(search)) return "tiktok";
  if (/[?&]igshid=/i.test(search)) return "instagram";

  const ref = document.referrer || "";
  if (!ref) return "direct";

  try {
    const host = new URL(ref).hostname.toLowerCase();
    const currentHost = window.location.hostname.toLowerCase();

    // Internal navigation on our own domain → not a real source
    if (host === currentHost || PRODUCTION_HOSTS.includes(host)) return "direct";

    if (host.includes("google")) return "google";
    if (host.includes("facebook") || host.includes("fb.com") || host.includes("fb.me")) return "facebook";
    if (host.includes("instagram")) return "instagram";
    if (host.includes("tiktok")) return "tiktok";
    if (host.includes("youtube")) return "youtube";
    if (host.includes("twitter") || host.includes("x.com")) return "twitter/x";
    if (host.includes("pinterest")) return "pinterest";
    if (host.includes("reddit")) return "reddit";
    if (host.includes("linkedin")) return "linkedin";
    if (host.includes("whatsapp")) return "whatsapp";
    if (host.includes("t.me") || host.includes("telegram")) return "telegram";
    return host;
  } catch {
    return ref;
  }
};

const trackEvent = async (
  eventType: string,
  data: Record<string, unknown> = {}
) => {
  if (shouldSkipTracking()) return;
  try {
    const utms = getUtmParams();
    const metadata = {
      ...(typeof data.metadata === "object" && data.metadata !== null ? data.metadata : {}),
      traffic_source: getTrafficSource(),
      ...(Object.keys(utms).length > 0 ? { utm: utms } : {}),
    };
    await (supabase as any).from("visitor_events").insert({
      session_id: getSessionId(),
      event_type: eventType,
      page: window.location.pathname,
      device_type: getDeviceType(),
      referrer: document.referrer || null,
      ...data,
      metadata,
    });
  } catch {
    // silent fail — analytics should never break the site
  }
};

export const useVisitorTracking = () => {
  const startTime = useRef(Date.now());
  const maxScroll = useRef(0);
  const tracked = useRef(false);

  // Track page view on mount
  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    if (shouldSkipTracking()) return;

    const visitorType = getVisitorType();
    const visitCount = getVisitCount();

    trackEvent("page_view", {
      metadata: {
        visitor_type: visitorType,
        visit_count: visitCount,
        screen_width: window.innerWidth,
        screen_height: window.innerHeight,
        user_agent: navigator.userAgent,
      },
    });
  }, []);

  // Track scroll depth
  useEffect(() => {
    if (shouldSkipTracking()) return;
    const handler = () => {
      const scrolled = Math.round(
        ((window.scrollY + window.innerHeight) /
          document.documentElement.scrollHeight) *
          100
      );
      if (scrolled > maxScroll.current) {
        maxScroll.current = scrolled;
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Track time on page + scroll depth on unmount / tab close
  useEffect(() => {
    if (shouldSkipTracking()) return;
    const handler = () => {
      const timeOnPage = Math.round((Date.now() - startTime.current) / 1000);
      trackEvent("page_exit", {
        time_on_page: timeOnPage,
        scroll_depth: maxScroll.current,
        metadata: { exit_page: window.location.pathname },
      });
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  // Track product views when they scroll into view
  useEffect(() => {
    if (shouldSkipTracking()) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const productId = entry.target.getAttribute("data-product-id");
            if (productId) {
              trackEvent("product_view", {
                product_id: parseInt(productId, 10),
              });
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe product elements
    setTimeout(() => {
      document.querySelectorAll("[data-product-id]").forEach((el) => {
        observer.observe(el);
      });
    }, 1000);

    return () => observer.disconnect();
  }, []);

  const trackProductSelect = useCallback((productId: number) => {
    trackEvent("product_select", { product_id: productId });
  }, []);

  const trackCheckoutStart = useCallback(() => {
    trackEvent("checkout_start");
  }, []);

  const trackSurveyResponse = useCallback(
    (question: string, answer: string) => {
      trackEvent("survey_response", {
        metadata: { question, answer },
      });
    },
    []
  );

  return {
    trackEvent,
    trackProductSelect,
    trackCheckoutStart,
    trackSurveyResponse,
    visitorType: getVisitorType(),
    visitCount: parseInt(localStorage.getItem("visit_count") || "1", 10),
  };
};

export { trackEvent, getVisitorType };
