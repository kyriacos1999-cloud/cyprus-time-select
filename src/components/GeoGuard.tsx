import { useEffect, useState } from "react";

interface GeoGuardProps {
  children: React.ReactNode;
}

const GeoGuard = ({ children }: GeoGuardProps) => {
  const [status, setStatus] = useState<"loading" | "allowed" | "blocked">("loading");

  useEffect(() => {
    const checkLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data.country_code === "CY") {
          setStatus("allowed");
        } else {
          setStatus("blocked");
        }
      } catch {
        // If geo-check fails, allow access to avoid blocking real users
        setStatus("allowed");
      }
    };
    checkLocation();
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "blocked") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center max-w-md space-y-4">
          <p className="text-4xl">🇨🇾</p>
          <h1 className="text-2xl font-display text-foreground tracking-wide">
            Available in Cyprus Only
          </h1>
          <p className="text-muted-foreground font-light text-sm leading-relaxed">
            This store currently serves customers in Cyprus exclusively. We hope to expand soon.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default GeoGuard;
