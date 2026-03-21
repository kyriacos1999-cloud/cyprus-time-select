import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const STATIC_URLS = [
  { loc: "https://replic8.shop/", priority: "1.0", changefreq: "weekly" },
  { loc: "https://replic8.shop/watches/submariner-no-date-black", priority: "0.9", changefreq: "weekly" },
  { loc: "https://replic8.shop/watches/submariner-hulk-green", priority: "0.9", changefreq: "weekly" },
  { loc: "https://replic8.shop/watches/datejust-36mm-grey", priority: "0.9", changefreq: "weekly" },
  { loc: "https://replic8.shop/watches/submariner-blue-gold", priority: "0.9", changefreq: "weekly" },
  { loc: "https://replic8.shop/watches/gmt-sprite-black-green", priority: "0.9", changefreq: "weekly" },
  { loc: "https://replic8.shop/watches/daytona-black-chronograph", priority: "0.9", changefreq: "weekly" },
  { loc: "https://replic8.shop/blog", priority: "0.8", changefreq: "daily" },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: posts } = await supabase
      .from("blog_posts")
      .select("slug, created_at")
      .order("created_at", { ascending: false });

    const today = new Date().toISOString().split("T")[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    for (const u of STATIC_URLS) {
      xml += `  <url>\n    <loc>${u.loc}</loc>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n    <lastmod>${today}</lastmod>\n  </url>\n`;
    }

    if (posts) {
      for (const post of posts) {
        const lastmod = post.created_at?.split("T")[0] || today;
        xml += `  <url>\n    <loc>https://replic8.shop/blog/${post.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n    <lastmod>${lastmod}</lastmod>\n  </url>\n`;
      }
    }

    xml += `</urlset>`;

    return new Response(xml, {
      headers: { ...corsHeaders, "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new Response("Error generating sitemap", { status: 500, headers: corsHeaders });
  }
});
