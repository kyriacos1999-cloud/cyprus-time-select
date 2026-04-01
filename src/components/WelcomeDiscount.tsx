import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Copy, Check, Gift } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const WelcomeDiscount = () => {
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState("");
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [copied, setCopied] = useState(false);
  const [expired, setExpired] = useState(false);
  const [loading, setLoading] = useState(false);

  const getVisitorId = useCallback(() => {
    let id = localStorage.getItem("r8_visitor_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("r8_visitor_id", id);
    }
    return id;
  }, []);

  useEffect(() => {
    // Don't show if already seen or used
    const seen = localStorage.getItem("r8_welcome_shown");
    const used = localStorage.getItem("r8_welcome_used");
    if (seen || used) return;

    // Show after 3 seconds
    const timer = setTimeout(() => {
      generateCode();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const generateCode = async () => {
    setLoading(true);
    try {
      const visitorId = getVisitorId();
      const { data, error } = await supabase.functions.invoke("welcome-discount", {
        body: { action: "generate", visitorId },
      });

      if (error || data?.error) {
        console.error("Failed to generate welcome code:", error || data?.error);
        return;
      }

      setCode(data.code);
      setExpiresAt(data.expiresAt);
      setVisible(true);
      localStorage.setItem("r8_welcome_shown", "true");
    } catch (err) {
      console.error("Error generating welcome code:", err);
    } finally {
      setLoading(false);
    }
  };

  // Countdown timer
  useEffect(() => {
    if (!expiresAt) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const expiry = new Date(expiresAt).getTime();
      const diff = expiry - now;

      if (diff <= 0) {
        setTimeLeft("00:00");
        setExpired(true);
        clearInterval(interval);
        return;
      }

      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-background rounded-sm shadow-2xl max-w-sm w-full overflow-hidden"
          >
            {/* Header */}
            <div className="bg-foreground text-background px-6 py-5 text-center relative">
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-background/50 hover:text-background transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <Gift className="w-8 h-8 mx-auto mb-2 text-accent" />
              <h3 className="font-display text-xl tracking-tight">Welcome to Replic8</h3>
              <p className="text-background/60 text-xs font-light mt-1">
                Here's a little something for your first order
              </p>
            </div>

            {/* Content */}
            <div className="px-6 py-6 text-center">
              <p className="text-4xl font-display text-foreground mb-1">10% OFF</p>
              <p className="text-muted-foreground text-xs font-light mb-5">
                Your exclusive welcome discount
              </p>

              {/* Code box */}
              <div
                onClick={!expired ? handleCopy : undefined}
                className={`flex items-center justify-center gap-2 border-2 border-dashed rounded-sm px-4 py-3 mb-4 transition-colors ${
                  expired
                    ? "border-destructive/30 bg-destructive/5 cursor-default"
                    : "border-accent/40 bg-accent/5 cursor-pointer hover:border-accent/60"
                }`}
              >
                <span className={`font-mono text-lg tracking-[0.15em] font-semibold ${expired ? "text-muted-foreground line-through" : "text-foreground"}`}>
                  {code}
                </span>
                {!expired && (
                  copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )
                )}
              </div>

              {copied && (
                <p className="text-xs text-green-600 font-medium mb-2">Copied to clipboard!</p>
              )}

              {/* Timer */}
              <div className={`flex items-center justify-center gap-1.5 text-xs font-medium ${expired ? "text-destructive" : "text-muted-foreground"}`}>
                <Clock className="w-3.5 h-3.5" />
                {expired ? (
                  <span>Code expired</span>
                ) : (
                  <span>Expires in {timeLeft}</span>
                )}
              </div>

              {!expired && (
                <p className="text-[10px] text-muted-foreground/60 font-light mt-4">
                  Enter this code at checkout. One-time use only.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeDiscount;
