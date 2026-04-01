import { Globe, BarChart3 } from "lucide-react";

type Props = {
  trafficSources: Array<{ source: string; count: number }>;
  totalVisitors: number;
};

const TrafficQuality = ({ trafficSources, totalVisitors }: Props) => {
  const maxCount = trafficSources.length > 0 ? Math.max(...trafficSources.map(s => s.count)) : 1;

  return (
    <div className="bg-background border border-border p-5 md:p-6">
      <h2 className="font-display text-lg text-foreground mb-4 flex items-center gap-2">
        <Globe className="w-5 h-5 text-primary" />
        Traffic Sources
      </h2>

      {trafficSources.length === 0 ? (
        <p className="text-muted-foreground text-sm font-light">No traffic data yet</p>
      ) : (
        <div className="space-y-3">
          {trafficSources.slice(0, 6).map((s, i) => {
            const pct = totalVisitors > 0 ? Math.round((s.count / totalVisitors) * 100) : 0;
            const barWidth = Math.max(8, (s.count / maxCount) * 100);
            return (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-foreground">{s.source}</span>
                  <span className="text-xs text-muted-foreground">{s.count} visits ({pct}%)</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${barWidth}%`, opacity: 1 - i * 0.12 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TrafficQuality;
