import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      throw new Error("Session ID is required");
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "line_items.data.price.product", "customer"],
    });

    if (session.payment_status !== "paid") {
      throw new Error("Payment not completed");
    }

    const lineItem = session.line_items?.data[0];
    const product = lineItem?.price?.product as Stripe.Product | undefined;

    const orderDetails = {
      customerName: session.metadata?.customer_name || (session.customer as Stripe.Customer)?.name || "",
      customerEmail: session.customer_details?.email || "",
      productName: session.metadata?.product_name || product?.name || "Watch",
      amount: session.amount_total ? (session.amount_total / 100).toFixed(0) : "0",
      currency: session.currency?.toUpperCase() || "EUR",
      paymentStatus: session.payment_status,
      sessionId: session.id,
    };

    return new Response(JSON.stringify(orderDetails), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
