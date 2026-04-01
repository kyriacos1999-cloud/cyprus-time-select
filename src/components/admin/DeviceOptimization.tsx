import { Smartphone, Monitor, Tablet, AlertTriangle } from "lucide-react";

type Props = {
  deviceBreakdown: Record<string, number>;
};

const DeviceIcon = ({ type }: { type: string }) => {
  if (type === "mobile") return <Smartphone className="w-4 h-4" />;
  if (type === "tablet") return <Tablet className="w-4 h-4" />;
  return <Monitor className="w-4 h-4" />;
};

const DeviceOptimization = ({ deviceBreakdown }: Props) => {
  const entries = Object.entries(deviceBreakdown);
  const total = entries.reduce((a, [, b]) => a + b, 0);
  const sorted = entries.sort(([, a], [, b]) => b - a);

  const mobilePct = total > 0 ? Math.round(((deviceBreakdown["mobile"] || 0) / total) * 100) : 0;
  const mobileHeavy = mobilePct > 60;

  return (
    <div className="bg-background border border-border p-5 md:p-6">
      <h2 className="font-display text-lg text-foreground mb-4">Device Breakdown</h2>

      <div className="space-y-4">
        {sorted.map(([device, count]) => {
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          return (
            <div key={device}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <DeviceIcon type={device} />
                  <span className="text-sm text-foreground capitalize">{device}</span>
                </div>
                <span className="text-sm font-display text-foreground">{pct}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {mobileHeavy && (
        <div className="mt-4 p-3 bg-amber-500/5 border border-amber-500/15 rounded-sm">
          <p className="text-xs text-amber-700 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            Mobile dominates traffic ({mobilePct}%) — prioritize mobile UX and page speed.
          </p>
        </div>
      )}
    </div>
  );
};

export default DeviceOptimization;
