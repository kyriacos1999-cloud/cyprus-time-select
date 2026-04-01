import { Clock, ArrowDown, AlertTriangle, Layers } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Props = {
  avgTime: number;
  avgScrollDepth: number;
  totalVisitors: number;
  uniqueSessions: number;
};

const BehaviorInsights = ({ avgTime, avgScrollDepth, totalVisitors, uniqueSessions }: Props) => {
  const pagesPerSession = uniqueSessions > 0 ? (totalVisitors / uniqueSessions).toFixed(1) : "0";
  const timeWarning = avgTime === 0;
  const scrollLow = avgScrollDepth < 30 && avgScrollDepth > 0;

  return (
    <div className="bg-background border border-border p-5 md:p-6">
      <h2 className="font-display text-lg text-foreground mb-5">User Behavior</h2>

      <div className="space-y-5">
        {/* Scroll Depth */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5 cursor-help">
                    <ArrowDown className="w-3.5 h-3.5" /> Avg Scroll Depth
                  </span>
                </TooltipTrigger>
                <TooltipContent><p className="text-xs">How far down the page visitors scroll on average</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-sm font-display text-foreground">{avgScrollDepth}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${scrollLow ? "bg-amber-500" : "bg-primary"}`}
              style={{ width: `${Math.min(avgScrollDepth, 100)}%` }}
            />
          </div>
          {scrollLow && (
            <p className="text-[10px] text-amber-600 mt-1.5 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Low scroll depth — move key content higher
            </p>
          )}
        </div>

        {/* Avg Session Time */}
        <div className="flex items-center justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-xs text-muted-foreground flex items-center gap-1.5 cursor-help">
                  <Clock className="w-3.5 h-3.5" /> Avg Session Time
                </span>
              </TooltipTrigger>
              <TooltipContent><p className="text-xs">Average time visitors spend on your site</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex items-center gap-2">
            <span className="text-sm font-display text-foreground">
              {avgTime > 60 ? `${Math.floor(avgTime / 60)}m ${avgTime % 60}s` : `${avgTime}s`}
            </span>
            {timeWarning && (
              <span className="text-[10px] text-destructive bg-destructive/10 px-1.5 py-0.5 rounded-sm">
                ⚠ Check tracking
              </span>
            )}
          </div>
        </div>

        {/* Pages per Session */}
        <div className="flex items-center justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-xs text-muted-foreground flex items-center gap-1.5 cursor-help">
                  <Layers className="w-3.5 h-3.5" /> Pages per Session
                </span>
              </TooltipTrigger>
              <TooltipContent><p className="text-xs">Average number of pages viewed per visit</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-sm font-display text-foreground">{pagesPerSession}</span>
        </div>
      </div>
    </div>
  );
};

export default BehaviorInsights;
