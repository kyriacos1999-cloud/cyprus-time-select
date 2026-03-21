import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { trackEvent } from "@/hooks/useVisitorTracking";

const reasons = [
  "Just browsing",
  "Price too high",
  "Not sure about quality",
  "Need more payment options",
  "Delivery concerns",
  "Looking for a different model",
];

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  useEffect(() => {
    // Don't show if already shown this session
    if (sessionStorage.getItem("exit_survey_shown")) return;

    let timeout: ReturnType<typeof setTimeout>;

    // Desktop: mouse leaves viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        timeout = setTimeout(() => {
          sessionStorage.setItem("exit_survey_shown", "1");
          setShow(true);
          trackEvent("exit_intent_triggered");
        }, 200);
      }
    };

    // Mobile: back button or scroll-up-fast pattern (use time-based as fallback)
    const handleMobileExit = () => {
      const timeOnPage = (Date.now() - performance.now()) / 1000;
      // Show after 45 seconds on mobile if they haven't reached checkout
      if (timeOnPage > 45 && !sessionStorage.getItem("reached_checkout")) {
        sessionStorage.setItem("exit_survey_shown", "1");
        setShow(true);
        trackEvent("exit_intent_triggered", { metadata: { trigger: "time_based" } });
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    
    // Mobile time-based trigger
    const mobileTimer = setTimeout(handleMobileExit, 45000);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timeout);
      clearTimeout(mobileTimer);
    };
  }, []);

  const handleAnswer = useCallback((reason: string) => {
    setSelectedReason(reason);
    setAnswered(true);
    trackEvent("survey_response", {
      metadata: { question: "What stopped you from buying?", answer: reason },
    });
    setTimeout(() => setShow(false), 2000);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-background border border-border max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!answered ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-foreground tracking-tight">
                      Before you go...
                    </h3>
                    <p className="text-muted-foreground text-xs font-light">
                      Quick question — takes 2 seconds
                    </p>
                  </div>
                </div>

                <p className="text-foreground text-sm mb-5 font-medium">
                  What's holding you back from ordering?
                </p>

                <div className="space-y-2">
                  {reasons.map((reason) => (
                    <button
                      key={reason}
                      onClick={() => handleAnswer(reason)}
                      className="w-full text-left px-4 py-3 border border-border text-sm text-foreground hover:border-primary hover:bg-primary/5 transition-all duration-200 font-light"
                    >
                      {reason}
                    </button>
                  ))}
                </div>

                <p className="text-muted-foreground/50 text-[10px] mt-4 text-center font-light">
                  Your feedback helps us serve you better
                </p>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-4"
              >
                <p className="text-primary text-2xl mb-3">🙏</p>
                <h3 className="font-display text-lg text-foreground mb-2">
                  Thank you!
                </h3>
                <p className="text-muted-foreground text-sm font-light">
                  We appreciate your feedback.
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
