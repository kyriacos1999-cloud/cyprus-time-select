import { TrendingUp, Target, Lightbulb } from "lucide-react";

type Props = {
  highIntentBehaviors: Array<{ behavior: string; count: number }>;
};

const HighIntentUsers = ({ highIntentBehaviors }: Props) => {
  const total = highIntentBehaviors.reduce((sum, b) => sum + b.count, 0);

  return (
    <div className="bg-background border border-border p-5 md:p-6">
      <h2 className="font-display text-lg text-foreground mb-4 flex items-center gap-2">
        <Target className="w-5 h-5 text-primary" />
        High-Intent Users
      </h2>

      {highIntentBehaviors.length === 0 ? (
        <p className="text-muted-foreground text-sm font-light">
          No high-intent signals yet — more traffic needed
        </p>
      ) : (
        <>
          <div className="space-y-3 mb-5">
            {highIntentBehaviors.map((b, i) => {
              const pct = total > 0 ? Math.round((b.count / total) * 100) : 0;
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-primary/10 text-primary text-[10px] flex items-center justify-center font-medium rounded-sm shrink-0">
                    {b.count}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{b.behavior}</p>
                    <div className="w-full h-1 bg-muted mt-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-primary/40 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-accent/5 border border-accent/10 p-3 rounded-sm">
            <p className="text-[10px] tracking-[0.15em] uppercase text-accent font-medium flex items-center gap-1.5 mb-1.5">
              <Lightbulb className="w-3 h-3" /> Suggestion
            </p>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              These users showed purchase intent but didn't convert. Consider retargeting with exit-intent offers or live chat prompts.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default HighIntentUsers;
