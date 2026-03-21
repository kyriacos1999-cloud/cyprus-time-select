import { useState, useEffect } from "react";
import { Eye } from "lucide-react";

const LiveViewerCount = () => {
  const [viewers, setViewers] = useState(() => Math.floor(Math.random() * 8) + 12);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(8, Math.min(28, prev + change));
      });
    }, 5000 + Math.random() * 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] tracking-wide">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
      </span>
      <Eye className="w-3 h-3" />
      <span>{viewers} people viewing right now</span>
    </div>
  );
};

export default LiveViewerCount;
