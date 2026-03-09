import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-background border border-border p-12 max-w-lg text-center"
      >
        <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-6" />
        <h1 className="text-3xl font-display text-foreground mb-3">Payment Successful</h1>
        <p className="text-muted-foreground font-light mb-8">
          Thank you for your purchase. Your order has been confirmed and we will contact you shortly with delivery details.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-primary hover:bg-rolex-green-light text-primary-foreground font-medium tracking-wider uppercase text-xs py-6 px-10 rounded-none"
        >
          Back to Store
        </Button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
