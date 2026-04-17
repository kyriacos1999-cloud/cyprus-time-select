import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useSoldOut = () => {
  const [soldOutIds, setSoldOutIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("product_inventory")
        .select("product_id")
        .eq("sold_out", true);
      if (data) {
        setSoldOutIds(new Set(data.map((r: any) => r.product_id)));
      }
    };
    fetch();

    // Listen for realtime changes
    const channel = supabase
      .channel("inventory-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "product_inventory" },
        (payload: any) => {
          const row = payload.new ?? payload.old;
          if (!row) return;
          const { product_id, sold_out } = row;
          setSoldOutIds((prev) => {
            const next = new Set(prev);
            if (sold_out) next.add(product_id);
            else next.delete(product_id);
            return next;
          });
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return { soldOutIds };
};
