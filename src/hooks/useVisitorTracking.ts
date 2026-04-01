import { useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

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

const getTrafficSource = (): string => {
  const utms = getUtmParams();
  if (utms.utm_source) return utms.utm_source;

  const ref = document.referrer || "";
  if (!ref) return "direct";
  try {
    const host = new URL(ref).hostname.toLowerCase();
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
