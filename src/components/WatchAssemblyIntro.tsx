import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WatchAssemblyIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"assembling" | "logo" | "done">("assembling");

  useEffect(() => {
    if (phase === "done") onComplete();
  }, [phase, onComplete]);

  const gold = "hsl(var(--rolex-gold))";
  const steel = "hsl(0 0% 78%)";
  const steelDark = "hsl(0 0% 55%)";
  const steelLight = "hsl(0 0% 88%)";
  const black = "hsl(0 0% 8%)";
  const green = "hsl(var(--rolex-green))";
  const greenDark = "hsl(153 80% 14%)";
  const lume = "hsl(50 60% 85%)";

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "hsl(0 0% 5%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="relative w-80 h-[480px] md:w-[400px] md:h-[600px]">
            <svg viewBox="0 0 260 380" className="w-full h-full">
              <defs>
                <linearGradient id="steelGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={steelLight} />
                  <stop offset="50%" stopColor={steel} />
                  <stop offset="100%" stopColor={steelDark} />
                </linearGradient>
                <linearGradient id="steelGradV" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={steelLight} />
                  <stop offset="100%" stopColor={steelDark} />
                </linearGradient>
                <linearGradient id="bezelGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={green} />
                  <stop offset="100%" stopColor={greenDark} />
                </linearGradient>
                <linearGradient id="dialGrad" x1="0.5" y1="0" x2="0.5" y2="1">
                  <stop offset="0%" stopColor="hsl(0 0% 14%)" />
                  <stop offset="100%" stopColor={black} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <clipPath id="caseClip">
                  <circle cx="130" cy="190" r="72" />
                </clipPath>
              </defs>

              {/* ═══ BRACELET TOP ═══ */}
              <motion.g
                initial={{ y: -160, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              >
                {/* Oyster-style 3-link bracelet */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                  const y = 115 - i * 14;
                  const w = 56 - Math.min(i, 3) * 1.5;
                  const x = 130 - w / 2;
                  return (
                    <g key={`bt-${i}`}>
                      {/* Outer links */}
                      <rect x={x} y={y} width={w} height="12" rx="1.5" fill="url(#steelGradV)" opacity={1 - i * 0.08} />
                      {/* Center link */}
                      <rect x={x + w * 0.28} y={y + 0.5} width={w * 0.44} height="11" rx="1" fill={steelLight} opacity={0.6 - i * 0.05} />
                      {/* Link gap lines */}
                      <line x1={x + 2} y1={y + 12} x2={x + w - 2} y2={y + 12} stroke={steelDark} strokeWidth="0.5" opacity="0.4" />
                      {/* Side grooves */}
                      <line x1={x + w * 0.28} y1={y + 1} x2={x + w * 0.28} y2={y + 11} stroke={steelDark} strokeWidth="0.3" opacity="0.3" />
                      <line x1={x + w * 0.72} y1={y + 1} x2={x + w * 0.72} y2={y + 11} stroke={steelDark} strokeWidth="0.3" opacity="0.3" />
                    </g>
                  );
                })}
              </motion.g>

              {/* ═══ BRACELET BOTTOM ═══ */}
              <motion.g
                initial={{ y: 160, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                  const y = 263 + i * 14;
                  const w = 56 - Math.min(i, 3) * 1.5;
                  const x = 130 - w / 2;
                  return (
                    <g key={`bb-${i}`}>
                      <rect x={x} y={y} width={w} height="12" rx="1.5" fill="url(#steelGradV)" opacity={1 - i * 0.08} />
                      <rect x={x + w * 0.28} y={y + 0.5} width={w * 0.44} height="11" rx="1" fill={steelLight} opacity={0.6 - i * 0.05} />
                      <line x1={x + 2} y1={y} x2={x + w - 2} y2={y} stroke={steelDark} strokeWidth="0.5" opacity="0.4" />
                      <line x1={x + w * 0.28} y1={y + 1} x2={x + w * 0.28} y2={y + 11} stroke={steelDark} strokeWidth="0.3" opacity="0.3" />
                      <line x1={x + w * 0.72} y1={y + 1} x2={x + w * 0.72} y2={y + 11} stroke={steelDark} strokeWidth="0.3" opacity="0.3" />
                    </g>
                  );
                })}
              </motion.g>

              {/* ═══ CASE ═══ */}
              <motion.g
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                style={{ transformOrigin: "130px 190px" }}
              >
                {/* Case body */}
                <circle cx="130" cy="190" r="78" fill="url(#steelGrad)" />
                <circle cx="130" cy="190" r="76" fill="none" stroke={steelDark} strokeWidth="0.5" opacity="0.4" />
                {/* Lug connectors top */}
                <rect x="107" y="114" width="12" height="10" rx="2" fill={steel} />
                <rect x="141" y="114" width="12" height="10" rx="2" fill={steel} />
                {/* Lug connectors bottom */}
                <rect x="107" y="256" width="12" height="10" rx="2" fill={steel} />
                <rect x="141" y="256" width="12" height="10" rx="2" fill={steel} />
              </motion.g>

              {/* ═══ CROWN ═══ */}
              <motion.g
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
              >
                {/* Crown guard */}
                <path d="M206 182 Q214 184 214 190 Q214 196 206 198" fill="none" stroke={steel} strokeWidth="3" />
                {/* Crown body */}
                <rect x="210" y="183" width="12" height="14" rx="2.5" fill="url(#steelGrad)" />
                {/* Crown grip notches */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line key={`cg-${i}`} x1={212 + i * 1.8} y1="184.5" x2={212 + i * 1.8} y2="196.5" stroke={steelDark} strokeWidth="0.6" opacity="0.5" />
                ))}
                {/* Crown logo dot */}
                <circle cx="216" cy="190" r="1.5" fill={gold} opacity="0.7" />
              </motion.g>

              {/* ═══ BEZEL ═══ */}
              <motion.g
                initial={{ scale: 1.6, opacity: 0, rotate: 120 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                style={{ transformOrigin: "130px 190px" }}
              >
                {/* Bezel ring — Submariner green ceramic style */}
                <circle cx="130" cy="190" r="74" fill="none" stroke="url(#bezelGrad)" strokeWidth="9" />
                <circle cx="130" cy="190" r="69" fill="none" stroke={steelDark} strokeWidth="0.5" opacity="0.3" />

                {/* Bezel minute markers */}
                {Array.from({ length: 120 }).map((_, i) => {
                  const angle = ((i * 3 - 90) * Math.PI) / 180;
                  const isMajor = i % 10 === 0;
                  const isMid = i % 5 === 0 && !isMajor;
                  const r1 = isMajor ? 69.5 : isMid ? 71 : 72;
                  const r2 = 78;
                  return (
                    <line
                      key={`bz-${i}`}
                      x1={130 + r1 * Math.cos(angle)}
                      y1={190 + r1 * Math.sin(angle)}
                      x2={130 + r2 * Math.cos(angle)}
                      y2={190 + r2 * Math.sin(angle)}
                      stroke={i <= 20 ? lume : "hsl(0 0% 90%)"}
                      strokeWidth={isMajor ? 1.8 : isMid ? 0.8 : 0.3}
                      opacity={isMajor ? 0.9 : isMid ? 0.6 : 0.25}
                    />
                  );
                })}

                {/* Bezel numbers at key positions */}
                {[
                  { val: "10", angle: -60 }, { val: "20", angle: -30 },
                  { val: "30", angle: 0 }, { val: "40", angle: 30 },
                  { val: "50", angle: 60 },
                ].map(({ val, angle }) => {
                  const a = ((angle - 90) * Math.PI) / 180;
                  const r = 73.5;
                  return (
                    <text
                      key={val}
                      x={130 + r * Math.cos(a)}
                      y={190 + r * Math.sin(a) + 1.5}
                      textAnchor="middle"
                      fill="hsl(0 0% 92%)"
                      fontSize="4.5"
                      fontFamily="Arial, sans-serif"
                      fontWeight="bold"
                    >
                      {val}
                    </text>
                  );
                })}

                {/* Triangle at 12 o'clock */}
                <polygon
                  points="130,117 127,122 133,122"
                  fill={lume}
                  opacity="0.9"
                />
              </motion.g>

              {/* ═══ DIAL ═══ */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
                style={{ transformOrigin: "130px 190px" }}
              >
                {/* Dial face */}
                <circle cx="130" cy="190" r="62" fill="url(#dialGrad)" />
                {/* Subtle sunburst texture */}
                {Array.from({ length: 72 }).map((_, i) => {
                  const angle = ((i * 5) * Math.PI) / 180;
                  return (
                    <line
                      key={`sb-${i}`}
                      x1="130" y1="190"
                      x2={130 + 62 * Math.cos(angle)}
                      y2={190 + 62 * Math.sin(angle)}
                      stroke="hsl(0 0% 18%)"
                      strokeWidth="0.3"
                      opacity="0.15"
                    />
                  );
                })}

                {/* Inner chapter ring */}
                <circle cx="130" cy="190" r="58" fill="none" stroke="hsl(0 0% 20%)" strokeWidth="0.3" />

                {/* Hour markers — Rolex Submariner style (applied indices) */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = ((i * 30 - 90) * Math.PI) / 180;
                  const isTriangle = i === 0; // 12 o'clock triangle
                  const isCircle = i === 3 || i === 6 || i === 9;
                  const r1 = 49;
                  const r2 = 57;

                  if (isTriangle) {
                    return (
                      <g key={`hr-${i}`}>
                        <polygon
                          points="130,133.5 127,140 133,140"
                          fill={lume}
                          stroke={gold}
                          strokeWidth="0.3"
                        />
                      </g>
                    );
                  }
                  if (isCircle) {
                    const cx = 130 + 53 * Math.cos(angle);
                    const cy = 190 + 53 * Math.sin(angle);
                    return (
                      <g key={`hr-${i}`}>
                        <circle cx={cx} cy={cy} r="3" fill={lume} stroke={gold} strokeWidth="0.3" />
                      </g>
                    );
                  }
                  return (
                    <g key={`hr-${i}`}>
                      <line
                        x1={130 + r1 * Math.cos(angle)}
                        y1={190 + r1 * Math.sin(angle)}
                        x2={130 + r2 * Math.cos(angle)}
                        y2={190 + r2 * Math.sin(angle)}
                        stroke={lume}
                        strokeWidth="3"
                        strokeLinecap="butt"
                      />
                      <line
                        x1={130 + r1 * Math.cos(angle)}
                        y1={190 + r1 * Math.sin(angle)}
                        x2={130 + r2 * Math.cos(angle)}
                        y2={190 + r2 * Math.sin(angle)}
                        stroke={gold}
                        strokeWidth="0.3"
                        opacity="0.5"
                      />
                    </g>
                  );
                })}

                {/* Dial text — brand name */}
                <text x="130" y="165" textAnchor="middle" fill={lume} fontSize="3.2" fontFamily="serif" letterSpacing="0.25em" opacity="0.8">
                  REPLIC8
                </text>
                <text x="130" y="170" textAnchor="middle" fill={lume} fontSize="2" fontFamily="Arial, sans-serif" letterSpacing="0.1em" opacity="0.5">
                  SUBMARINER
                </text>

                {/* Depth rating */}
                <text x="130" y="220" textAnchor="middle" fill={lume} fontSize="2" fontFamily="Arial, sans-serif" opacity="0.4">
                  300m / 1000ft
                </text>
              </motion.g>

              {/* ═══ HANDS ═══ */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.5 }}
              >
                {/* Hour hand — Mercedes style */}
                <motion.g
                  initial={{ rotate: -240 }}
                  animate={{ rotate: -30 }}
                  transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "130px 190px" }}
                >
                  <path
                    d="M128,190 L128,168 L126.5,162 L130,155 L133.5,162 L132,168 L132,190 Z"
                    fill={lume}
                    stroke={gold}
                    strokeWidth="0.3"
                  />
                  {/* Mercedes circle cutout */}
                  <circle cx="130" cy="166" r="4" fill="none" stroke={gold} strokeWidth="0.5" />
                  <line x1="130" y1="162" x2="130" y2="166" stroke={gold} strokeWidth="0.4" />
                  <line x1="130" y1="166" x2="126.5" y2="168.5" stroke={gold} strokeWidth="0.4" />
                  <line x1="130" y1="166" x2="133.5" y2="168.5" stroke={gold} strokeWidth="0.4" />
                </motion.g>

                {/* Minute hand */}
                <motion.g
                  initial={{ rotate: 180 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 1.2, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "130px 190px" }}
                >
                  <path
                    d="M129,190 L129,148 L128,142 L130,135 L132,142 L131,148 L131,190 Z"
                    fill={lume}
                    stroke={gold}
                    strokeWidth="0.3"
                  />
                </motion.g>

                {/* Seconds hand — green Rolex style */}
                <motion.g
                  initial={{ rotate: -360 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 1.5, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "130px 190px" }}
                >
                  <line x1="130" y1="200" x2="130" y2="132" stroke={green} strokeWidth="0.8" />
                  {/* Lollipop circle */}
                  <circle cx="130" cy="134" r="2.5" fill="none" stroke={green} strokeWidth="0.8" />
                </motion.g>

                {/* Center cap */}
                <circle cx="130" cy="190" r="3.5" fill={steel} />
                <circle cx="130" cy="190" r="2" fill={steelDark} />
                <circle cx="130" cy="190" r="0.8" fill={gold} />
              </motion.g>

              {/* ═══ CRYSTAL EDGE REFLECTION ═══ */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.8 }}
              >
                <circle cx="130" cy="190" r="62" fill="none" stroke="hsl(0 0% 100%)" strokeWidth="0.5" opacity="0.15" />
                {/* Cyclops lens reflection hint at 3 o'clock — date window */}
                <rect x="166" y="187" width="10" height="7" rx="1" fill="hsl(0 0% 100%)" opacity="0.08" />
              </motion.g>
            </svg>

            {/* ═══ BRAND TEXT REVEAL ═══ */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 text-center pb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.6 }}
              onAnimationComplete={() => {
                setTimeout(() => setPhase("logo"), 800);
              }}
            >
              <p className="font-display text-lg tracking-[0.3em]" style={{ color: gold }}>
                REPLIC8
              </p>
              <p className="text-[9px] tracking-[0.4em] uppercase mt-1" style={{ color: "hsl(0 0% 50%)" }}>
                Premium Timepieces
              </p>
            </motion.div>
          </div>

          {/* ═══ LOGO PHASE ═══ */}
          {phase === "logo" && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ backgroundColor: "hsl(0 0% 5%)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              onAnimationComplete={() => {
                setTimeout(() => setPhase("done"), 1000);
              }}
            >
              <motion.img
                src="/favicon.png"
                alt="REPLIC8 Logo"
                className="w-16 h-16 md:w-20 md:h-20 mb-4"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              />
              <motion.p
                className="font-display text-3xl md:text-4xl tracking-[0.3em]"
                style={{ color: gold }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                REPLIC8
              </motion.p>
              <motion.p
                className="text-[10px] tracking-[0.5em] uppercase mt-3"
                style={{ color: "hsl(0 0% 40%)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Premium Timepieces · Cyprus
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WatchAssemblyIntro;
