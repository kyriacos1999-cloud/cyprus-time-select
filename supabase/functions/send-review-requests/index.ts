import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Send review-request emails to customers whose orders are 3-7 days old
// and who haven't already received a review request.
// The 7-day cap prevents back-filling old orders if the cron is paused/restarted.
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") || "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
  );

  try {
    // Find candidate orders: 3-7 days old, has email, status not cancelled
    const { data: orders, error } = await supabase
      .from("orders")
      .select("id, customer_name, customer_email, products, created_at, status")
      .not("customer_email", "is", null)
      .lte("created_at", new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString())
      .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .neq("status", "cancelled");

    if (error) throw error;

    const candidates = orders || [];
    let sent = 0;
    let skipped = 0;
    let failed = 0;

    for (const order of candidates) {
      // Idempotency: skip if a review-request was already logged for this order
      const idempotencyKey = `review-request-${order.id}`;
      const { data: existing } = await supabase
        .from("email_send_log")
        .select("id")
        .eq("template_name", "review-request")
        .eq("recipient_email", order.customer_email)
        .ilike("error_message", `%${order.id}%`)
        .limit(1)
        .maybeSingle();

      if (existing) {
        skipped++;
        continue;
      }

      const products = Array.isArray(order.products) ? order.products : [];
      const productName =
        (products[0] && (products[0].name || products[0].productName)) ||
        "your watch";

      try {
        await supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "review-request",
            recipientEmail: order.customer_email,
            idempotencyKey,
            templateData: {
              customerName: order.customer_name || "there",
              productName,
            },
          },
        });

        // Log a marker row so we can detect "already sent" on next run.
        // We use error_message field to store the order id as a tag — this is
        // the simplest cross-reference without adding a new column.
        await supabase.from("email_send_log").insert({
          message_id: idempotencyKey,
          template_name: "review-request",
          recipient_email: order.customer_email,
          status: "queued",
          error_message: `order:${order.id}`,
        });

        sent++;
      } catch (e) {
        console.error(`Failed to send review-request for order ${order.id}:`, e);
        failed++;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        candidates: candidates.length,
        sent,
        skipped,
        failed,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("send-review-requests failed:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
