import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const generateOrderEmailHtml = (order: {
  customerName: string;
  productName: string;
  amount: string;
  currency: string;
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f5f3f0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f3f0;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border:1px solid #e0ddd8;">
          <!-- Header -->
          <tr>
            <td style="background-color:#006039;padding:32px 40px;text-align:center;">
              <h1 style="color:#ffffff;font-size:28px;margin:0;font-family:'Georgia','Times New Roman',serif;letter-spacing:2px;">
                REPLIC8
              </h1>
              <p style="color:rgba(255,255,255,0.8);font-size:11px;margin:8px 0 0;letter-spacing:3px;text-transform:uppercase;">
                Premium Timepieces
              </p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="color:#141414;font-size:22px;margin:0 0 8px;font-family:'Georgia','Times New Roman',serif;">
                Order Confirmed
              </h2>
              <p style="color:#737373;font-size:14px;line-height:1.6;margin:0 0 28px;">
                Thank you for your purchase, ${order.customerName}. Your order has been received and is being processed.
              </p>

              <!-- Order Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0ddd8;margin-bottom:28px;">
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #e0ddd8;background-color:#faf9f7;">
                    <span style="color:#737373;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Item</span>
                  </td>
                  <td style="padding:16px 20px;border-bottom:1px solid #e0ddd8;background-color:#faf9f7;text-align:right;">
                    <span style="color:#737373;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Amount</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;">
                    <span style="color:#141414;font-size:15px;font-family:'Georgia','Times New Roman',serif;">${order.productName}</span>
                  </td>
                  <td style="padding:16px 20px;text-align:right;">
                    <span style="color:#141414;font-size:15px;font-weight:500;">€${order.amount}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;border-top:1px solid #e0ddd8;">
                    <span style="color:#141414;font-size:13px;font-weight:500;text-transform:uppercase;letter-spacing:1px;">Total</span>
                  </td>
                  <td style="padding:16px 20px;border-top:1px solid #e0ddd8;text-align:right;">
                    <span style="color:#006039;font-size:20px;font-family:'Georgia','Times New Roman',serif;font-weight:600;">€${order.amount}</span>
                  </td>
                </tr>
              </table>

              <!-- Delivery Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf9f7;border:1px solid #e0ddd8;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px;">
                    <p style="color:#141414;font-size:13px;font-weight:500;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">
                      Delivery Information
                    </p>
                    <p style="color:#737373;font-size:13px;line-height:1.6;margin:0;">
                      Your timepiece will be delivered via Akis Express within 1-2 business days across Cyprus. We will contact you to confirm delivery details.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="color:#737373;font-size:13px;line-height:1.6;margin:0;">
                If you have any questions about your order, reach out to us on
                <a href="https://www.tiktok.com/@replic8cy" style="color:#006039;text-decoration:none;">TikTok @replic8cy</a>.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #e0ddd8;text-align:center;">
              <p style="color:#a3a3a3;font-size:11px;margin:0;letter-spacing:1px;">
                © 2026 REPLIC8. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
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
    const customerEmail = session.customer_details?.email || "";
    const customerName = session.metadata?.customer_name || (session.customer as Stripe.Customer)?.name || "Valued Customer";
    const productName = session.metadata?.product_name || product?.name || "Watch";
    const amount = session.amount_total ? (session.amount_total / 100).toFixed(0) : "0";
    const currency = session.currency?.toUpperCase() || "EUR";

    // Send confirmation email using Supabase's built-in email
    if (customerEmail) {
      const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
      const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

      const emailHtml = generateOrderEmailHtml({
        customerName,
        productName,
        amount,
        currency,
      });

      // Use Resend via the LOVABLE_API_KEY
      const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

      if (LOVABLE_API_KEY) {
        const emailRes = await fetch(`${SUPABASE_URL}/functions/v1/send-order-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          },
          body: JSON.stringify({
            to: customerEmail,
            subject: `Order Confirmed — ${productName}`,
            html: emailHtml,
          }),
        });
        console.log("Email send response:", emailRes.status);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        customerName,
        customerEmail,
        productName,
        amount,
        currency,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
