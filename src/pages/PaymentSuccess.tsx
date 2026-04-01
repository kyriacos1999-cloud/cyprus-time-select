import { useEffect, useState } from "react";
import { CheckCircle2, Package, Mail, ArrowLeft, Banknote } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface OrderDetails {
  customerName: string;
  customerEmail: string;
  productName: string;
  amount: string;
  currency: string;
}

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const isCod = searchParams.get("method") === "cod";
  const codName = searchParams.get("name") || "";
  const codTotal = searchParams.get("total") || "";
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isCod) {
      setLoading(false);
      return;
    }
    if (!sessionId) {
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("verify-payment", {
          body: { sessionId },
        });
        if (!error && data) {
          setOrder(data);
        }
      } catch (err) {
        console.error("Failed to verify payment:", err);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, isCod]);

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-background border border-border p-8 md:p-12 max-w-lg w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
        </motion.div>

        <h1 className="text-3xl font-display text-foreground mb-2 tracking-wide">
          Order Confirmed
        </h1>

        {loading ? (
          <p className="text-muted-foreground font-light animate-pulse mt-4">
            Verifying your payment...
          </p>
        ) : isCod ? (
          <div className="mt-6 space-y-6">
            <p className="text-muted-foreground font-light">
              Thank you, <span className="text-foreground font-medium">{codName}</span>.
            </p>

            <div className="border border-border text-left">
              <div className="bg-secondary/50 px-5 py-3 border-b border-border">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">
                  Order Details
                </p>
              </div>
              <div className="px-5 py-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-accent">
                  <Banknote className="w-4 h-4" />
                  <span className="font-medium">Cash on Delivery</span>
                </div>
                <div className="flex justify-between items-center border-t border-border pt-3">
                  <span className="text-sm text-muted-foreground font-light">Amount Due</span>
                  <span className="text-xl font-display text-primary">€{codTotal}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="border border-border p-4 text-left">
                <Banknote className="w-4 h-4 text-primary mb-2" />
                <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium mb-1">
                  Payment
                </p>
                <p className="text-xs text-foreground font-light">
                  Pay cash on delivery
                </p>
              </div>
              <div className="border border-border p-4 text-left">
                <Package className="w-4 h-4 text-primary mb-2" />
                <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium mb-1">
                  Delivery
                </p>
                <p className="text-xs text-foreground font-light">
                  Next-day via Akis Express
                </p>
              </div>
            </div>
          </div>
        ) : order ? (
          <div className="mt-6 space-y-6">
            <p className="text-muted-foreground font-light">
              Thank you, <span className="text-foreground font-medium">{order.customerName}</span>.
            </p>

            <div className="border border-border text-left">
              <div className="bg-secondary/50 px-5 py-3 border-b border-border">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">
                  Order Details
                </p>
              </div>
              <div className="px-5 py-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground font-light">Item</span>
                  <span className="text-sm text-foreground font-display tracking-wide">{order.productName}</span>
                </div>
                <div className="flex justify-between items-center border-t border-border pt-3">
                  <span className="text-sm text-muted-foreground font-light">Total Paid</span>
                  <span className="text-xl font-display text-primary">€{order.amount}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="border border-border p-4 text-left">
                <Mail className="w-4 h-4 text-primary mb-2" />
                <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium mb-1">
                  Receipt
                </p>
                <p className="text-xs text-foreground font-light">
                  Sent to {order.customerEmail}
                </p>
              </div>
              <div className="border border-border p-4 text-left">
                <Package className="w-4 h-4 text-primary mb-2" />
                <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium mb-1">
                  Delivery
                </p>
                <p className="text-xs text-foreground font-light">
                  Next-day via Akis Express
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground font-light mt-4">
            Your order has been confirmed. We will contact you shortly with delivery details.
          </p>
        )}

        <Button
          onClick={() => navigate("/")}
          className="mt-8 bg-primary hover:bg-rolex-green-light text-primary-foreground font-medium tracking-wider uppercase text-xs py-6 px-10 rounded-none transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Store
        </Button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;