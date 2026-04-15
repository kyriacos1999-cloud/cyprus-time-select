import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

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
    const order = await req.json();

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    // Log the COD order as a visitor event for tracking
    await supabaseAdmin.from("visitor_events").insert({
      session_id: crypto.randomUUID(),
      event_type: "cod_order",
      metadata: {
        customer_name: order.customerName,
        customer_email: order.customerEmail,
        phone: order.phone,
        address: order.address,
        city: order.city,
        postal_code: order.postalCode,
        akis_branch: order.akisBranch,
        products: order.products,
        subtotal: order.subtotal,
        cod_fee: order.codFee,
        discount: order.discount,
        total: order.total,
        payment_method: "cod",
      },
    });

    // Save to orders table
    await supabaseAdmin.from("orders").insert({
      customer_name: order.customerName || "Unknown",
      customer_email: order.customerEmail || null,
      phone: order.phone || null,
      address: order.address || null,
      city: order.city || null,
      postal_code: order.postalCode || null,
      payment_method: "cod",
      products: order.products || [],
      subtotal: order.subtotal || 0,
      discount: order.discount || 0,
      fees: order.codFee || 0,
      total: order.total || 0,
      status: "confirmed",
      metadata: { akis_branch: order.akisBranch },
    });

    return new Response(JSON.stringify({ success: true }), {
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
