import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";

/**
 * Mounts visitor tracking globally and re-fires page_view on every route change.
 * Must be rendered inside <BrowserRouter>.
 */
const RouteTracker = () => {
  const location = useLocation();
  useVisitorTracking();

  // The hook itself only fires on first mount. For SPA navigations we
  // re-key this component below so the hook re-mounts per route.
  useEffect(() => {
    // no-op; presence of location ensures re-render on route change
  }, [location.pathname]);

  return null;
};

const VisitorTracker = () => {
  const location = useLocation();
  // Re-mount RouteTracker on each path change so page_view fires per route
  return <RouteTracker key={location.pathname} />;
};

export default VisitorTracker;
