import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingBag, CreditCard, Banknote, RefreshCw, Loader2 } from "lucide-react";

type Order = {
  id: string;
  customer_name: string;
  customer_email: string | null;
  phone: string | null;
  payment_method: string;
  products: Array<{ name: string; quantity?: number }>;
  total: number;
  currency: string;
  status: string;
  created_at: string;
};

const OrdersPanel = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    setOrders((data as any) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel("orders-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "orders" }, () => {
        fetchOrders();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const statusColor = (s: string) => {
    if (s === "paid") return "text-green-600 bg-green-50";
    if (s === "confirmed") return "text-blue-600 bg-blue-50";
    return "text-muted-foreground bg-muted";
  };

  return (
    <div className="bg-background border border-border p-5 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg text-foreground flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-primary" />
          Recent Orders
        </h2>
        <button onClick={fetchOrders} className="text-muted-foreground hover:text-foreground transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-muted-foreground text-sm font-light text-center py-8">No orders yet</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="border border-border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {order.payment_method === "cod" ? (
                    <Banknote className="w-4 h-4 text-amber-600" />
                  ) : (
                    <CreditCard className="w-4 h-4 text-primary" />
                  )}
                  <span className="font-medium text-sm text-foreground">{order.customer_name}</span>
                </div>
                <span className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-sm ${statusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                {order.customer_email && <p>{order.customer_email}</p>}
                {order.phone && <p>{order.phone}</p>}
                <p>
                  {(order.products || []).map((p: any) => p.name || p.productName || "Watch").join(", ")}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-display text-base text-foreground">
                  €{Number(order.total).toFixed(0)}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {new Date(order.created_at).toLocaleDateString("en-GB", {
                    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPanel;
