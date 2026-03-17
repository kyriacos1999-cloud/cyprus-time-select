import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WatchAssemblyIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"assembling" | "logo" | "done">("assembling");
  const isDone = phase === "done";

  const partColor = "hsl(var(--rolex-gold))";
  const metalColor = "hsl(0 0% 75%)";
  const dialColor = "hsl(0 0% 12%)";
  const greenAccent = "hsl(var(--rolex-green))";

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-foreground flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          onAnimationComplete={() => {
            if (isDone) onComplete();
          }}
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* ── CASE BACK ── */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0.3, opacity: 0, rotate: -90 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Case body */}
                <circle cx="100" cy="100" r="88" fill="none" stroke={metalColor} strokeWidth="6" opacity="0.3" />
                <circle cx="100" cy="100" r="82" fill="none" stroke={metalColor} strokeWidth="2" opacity="0.15" />
              </svg>
            </motion.div>

            {/* ── BEZEL ── */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 1.8, opacity: 0, rotate: 180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Bezel ring */}
                <circle cx="100" cy="100" r="90" fill="none" stroke={metalColor} strokeWidth="8" />
                {/* Bezel notches */}
                {Array.from({ length: 120 }).map((_, i) => {
                  const angle = (i * 3 * Math.PI) / 180;
                  const r1 = i % 5 === 0 ? 82 : 84;
                  const r2 = 90;
                  return (
                    <line
                      key={i}
                      x1={100 + r1 * Math.cos(angle)}
                      y1={100 + r1 * Math.sin(angle)}
                      x2={100 + r2 * Math.cos(angle)}
                      y2={100 + r2 * Math.sin(angle)}
                      stroke={metalColor}
                      strokeWidth={i % 5 === 0 ? 1.2 : 0.4}
                      opacity={i % 5 === 0 ? 0.7 : 0.3}
                    />
                  );
                })}
              </svg>
            </motion.div>

            {/* ── DIAL ── */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <circle cx="100" cy="100" r="72" fill={dialColor} />
                {/* Hour markers */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = ((i * 30 - 90) * Math.PI) / 180;
                  const r1 = 62;
                  const r2 = 68;
                  return (
                    <line
                      key={i}
                      x1={100 + r1 * Math.cos(angle)}
                      y1={100 + r1 * Math.sin(angle)}
                      x2={100 + r2 * Math.cos(angle)}
                      y2={100 + r2 * Math.sin(angle)}
                      stroke={partColor}
                      strokeWidth={i % 3 === 0 ? 2.5 : 1.2}
                      strokeLinecap="round"
                    />
                  );
                })}
                {/* Minute markers */}
                {Array.from({ length: 60 }).map((_, i) => {
                  if (i % 5 === 0) return null;
                  const angle = ((i * 6 - 90) * Math.PI) / 180;
                  return (
                    <line
                      key={`m${i}`}
                      x1={100 + 66 * Math.cos(angle)}
                      y1={100 + 66 * Math.sin(angle)}
                      x2={100 + 68 * Math.cos(angle)}
                      y2={100 + 68 * Math.sin(angle)}
                      stroke={partColor}
                      strokeWidth={0.5}
                      opacity={0.5}
                    />
                  );
                })}
              </svg>
            </motion.div>

            {/* ── HANDS ── */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Hour hand */}
                <motion.line
                  x1="100" y1="100" x2="100" y2="58"
                  stroke={partColor}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, rotate: -180 }}
                  animate={{ pathLength: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
                  style={{ transformOrigin: "100px 100px" }}
                />
                {/* Minute hand */}
                <motion.line
                  x1="100" y1="100" x2="100" y2="40"
                  stroke={partColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, rotate: 180 }}
                  animate={{ pathLength: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 1.7, ease: "easeOut" }}
                  style={{ transformOrigin: "100px 100px" }}
                />
                {/* Seconds hand */}
                <motion.line
                  x1="100" y1="110" x2="100" y2="35"
                  stroke={greenAccent}
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  initial={{ opacity: 0, rotate: -270 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "100px 100px" }}
                />
                {/* Center dot */}
                <motion.circle
                  cx="100" cy="100" r="3"
                  fill={partColor}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.5 }}
                />
              </svg>
            </motion.div>

            {/* ── CROWN (right side) ── */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.3 }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <rect x="189" y="94" width="10" height="12" rx="2" fill={metalColor} />
                {/* Crown grip lines */}
                <line x1="191" y1="96" x2="191" y2="104" stroke={dialColor} strokeWidth="0.5" />
                <line x1="193" y1="96" x2="193" y2="104" stroke={dialColor} strokeWidth="0.5" />
                <line x1="195" y1="96" x2="195" y2="104" stroke={dialColor} strokeWidth="0.5" />
                <line x1="197" y1="96" x2="197" y2="104" stroke={dialColor} strokeWidth="0.5" />
              </svg>
            </motion.div>

            {/* ── BRACELET TOP ── */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ y: -120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Top bracelet links */}
                {[0, 1, 2, 3].map((i) => (
                  <g key={`top-${i}`}>
                    <rect
                      x="82" y={10 - i * 0.5 - (3 - i) * 0.5}
                      width="36" height="7"
                      rx="1"
                      fill={metalColor}
                      opacity={1 - i * 0.15}
                      transform={`translate(0, ${-i * 8})`}
                    />
                    {/* Center link */}
                    <rect
                      x="92" y={10 - i * 0.5 - (3 - i) * 0.5}
                      width="16" height="7"
                      rx="1"
                      fill={metalColor}
                      opacity={0.7 - i * 0.1}
                      transform={`translate(0, ${-i * 8})`}
                    />
                  </g>
                ))}
              </svg>
            </motion.div>

            {/* ── BRACELET BOTTOM ── */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {[0, 1, 2, 3].map((i) => (
                  <g key={`bot-${i}`}>
                    <rect
                      x="82" y={190}
                      width="36" height="7"
                      rx="1"
                      fill={metalColor}
                      opacity={1 - i * 0.15}
                      transform={`translate(0, ${i * 8})`}
                    />
                    <rect
                      x="92" y={190}
                      width="16" height="7"
                      rx="1"
                      fill={metalColor}
                      opacity={0.7 - i * 0.1}
                      transform={`translate(0, ${i * 8})`}
                    />
                  </g>
                ))}
              </svg>
            </motion.div>

            {/* ── BRAND TEXT ── */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.4 }}
              onAnimationComplete={() => {
                setTimeout(() => setPhase("logo"), 600);
              }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <text
                  x="100" y="82"
                  textAnchor="middle"
                  fill={partColor}
                  fontSize="5"
                  fontFamily="serif"
                  letterSpacing="0.3em"
                >
                  REPLIC8
                </text>
              </svg>
            </motion.div>
          </div>

          {/* ── LOGO PHASE: scale down + reveal ── */}
          {phase === "logo" && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              onAnimationComplete={() => {
                setTimeout(() => setPhase("done"), 800);
              }}
            >
              <motion.p
                className="text-primary-foreground font-display text-2xl md:text-3xl tracking-[0.3em]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                REPLIC8
              </motion.p>
              <motion.p
                className="text-primary-foreground/40 text-[10px] tracking-[0.5em] uppercase mt-3"
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
