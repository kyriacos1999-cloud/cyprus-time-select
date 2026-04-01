import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "WELCOME-";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, code, visitorId } = await req.json();

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (action === "generate") {
      if (!visitorId) {
        return new Response(
          JSON.stringify({ error: "visitorId is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Check if this visitor already has an unused, non-expired code
      const { data: existing } = await supabase
        .from("welcome_discounts")
        .select("*")
        .eq("visitor_id", visitorId)
        .eq("used", false)
        .gt("expires_at", new Date().toISOString())
        .limit(1)
        .single();

      if (existing) {
        return new Response(
          JSON.stringify({ code: existing.code, expiresAt: existing.expires_at, discountPercent: existing.discount_percent }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Check if this visitor has ever used a code
      const { data: usedCodes } = await supabase
        .from("welcome_discounts")
        .select("id")
        .eq("visitor_id", visitorId)
        .eq("used", true)
        .limit(1);

      if (usedCodes && usedCodes.length > 0) {
        return new Response(
          JSON.stringify({ error: "Discount already used" }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Generate a unique code
      let newCode = generateCode();
      let attempts = 0;
      while (attempts < 5) {
        const { data: dup } = await supabase
          .from("welcome_discounts")
          .select("id")
          .eq("code", newCode)
          .limit(1);
        if (!dup || dup.length === 0) break;
        newCode = generateCode();
        attempts++;
      }

      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes

      const { data: created, error: insertError } = await supabase
        .from("welcome_discounts")
        .insert({
          code: newCode,
          discount_percent: 10,
          expires_at: expiresAt,
          visitor_id: visitorId,
        })
        .select()
        .single();

      if (insertError) {
        console.error("Insert error:", insertError);
        return new Response(
          JSON.stringify({ error: "Failed to create discount code" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ code: created.code, expiresAt: created.expires_at, discountPercent: created.discount_percent }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "validate") {
      if (!code) {
        return new Response(
          JSON.stringify({ valid: false, error: "Code is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { data: discount, error: fetchError } = await supabase
        .from("welcome_discounts")
        .select("*")
        .eq("code", code.toUpperCase().trim())
        .limit(1)
        .single();

      if (fetchError || !discount) {
        return new Response(
          JSON.stringify({ valid: false, error: "Invalid code" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (discount.used) {
        return new Response(
          JSON.stringify({ valid: false, error: "Code already used" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (new Date(discount.expires_at) < new Date()) {
        return new Response(
          JSON.stringify({ valid: false, error: "Code expired" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ valid: true, discountPercent: discount.discount_percent }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "redeem") {
      if (!code) {
        return new Response(
          JSON.stringify({ success: false, error: "Code is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { data: discount } = await supabase
        .from("welcome_discounts")
        .select("*")
        .eq("code", code.toUpperCase().trim())
        .eq("used", false)
        .gt("expires_at", new Date().toISOString())
        .limit(1)
        .single();

      if (!discount) {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid, expired, or already used code" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { error: updateError } = await supabase
        .from("welcome_discounts")
        .update({ used: true, used_at: new Date().toISOString() })
        .eq("id", discount.id);

      if (updateError) {
        return new Response(
          JSON.stringify({ success: false, error: "Failed to redeem" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, discountPercent: discount.discount_percent }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid action" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
