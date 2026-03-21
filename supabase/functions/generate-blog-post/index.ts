import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const TOPICS = [
  { keyword: "Rolex clone Cyprus", category: "Buying Guide", products: [1, 2, 3] },
  { keyword: "luxury watch Limassol", category: "City Guide", products: [1, 4, 6] },
  { keyword: "best watch Nicosia", category: "City Guide", products: [2, 3, 5] },
  { keyword: "automatic watch Cyprus", category: "Watch Guide", products: [1, 5, 6] },
  { keyword: "dive watch Mediterranean", category: "Style Guide", products: [1, 2, 4] },
  { keyword: "men's watch gift Cyprus", category: "Gift Guide", products: [3, 5, 6] },
  { keyword: "watch collection starter", category: "Watch Guide", products: [1, 3, 5] },
  { keyword: "Submariner alternative Cyprus", category: "Buying Guide", products: [1, 2, 4] },
  { keyword: "GMT watch Cyprus", category: "Watch Guide", products: [5, 1, 6] },
  { keyword: "Daytona clone review", category: "Review", products: [6, 1, 5] },
  { keyword: "watch for wedding Cyprus", category: "Style Guide", products: [3, 4, 6] },
  { keyword: "summer watch style Paphos", category: "City Guide", products: [2, 4, 5] },
  { keyword: "affordable luxury watch Larnaca", category: "City Guide", products: [1, 3, 6] },
  { keyword: "watch maintenance tips", category: "Watch Guide", products: [1, 2, 3] },
  { keyword: "Rolex Hulk review Cyprus", category: "Review", products: [2, 1, 5] },
  { keyword: "dress watch business Cyprus", category: "Style Guide", products: [3, 6, 4] },
  { keyword: "water resistant watch beach", category: "Watch Guide", products: [1, 2, 5] },
  { keyword: "two-tone watch gold steel", category: "Style Guide", products: [4, 3, 6] },
  { keyword: "Jubilee bracelet watch", category: "Watch Guide", products: [5, 3, 1] },
  { keyword: "watch buying guide beginners", category: "Buying Guide", products: [1, 3, 5] },
  { keyword: "best chronograph Cyprus", category: "Watch Guide", products: [6, 1, 4] },
  { keyword: "Ayia Napa watch style", category: "City Guide", products: [2, 5, 6] },
  { keyword: "Protaras summer accessories", category: "City Guide", products: [1, 4, 2] },
  { keyword: "watch for daily wear Cyprus", category: "Style Guide", products: [1, 3, 5] },
  { keyword: "NH35 movement explained", category: "Watch Guide", products: [1, 2, 6] },
  { keyword: "904L steel watches Cyprus", category: "Watch Guide", products: [1, 2, 3] },
  { keyword: "black dial watch guide", category: "Style Guide", products: [1, 6, 5] },
  { keyword: "green watch trend Cyprus", category: "Style Guide", products: [2, 5, 1] },
  { keyword: "watch delivery Cyprus fast", category: "Buying Guide", products: [1, 2, 3] },
  { keyword: "Datejust alternative Cyprus", category: "Review", products: [3, 1, 4] },
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get existing dynamic post count to pick a topic
    const { count } = await supabase
      .from("blog_posts")
      .select("*", { count: "exact", head: true });

    const topicIndex = (count ?? 0) % TOPICS.length;
    const topic = TOPICS[topicIndex];

    // Check if slug already exists
    const baseSlug = topic.keyword.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
    const dateStr = new Date().toISOString().slice(0, 10);
    const slug = `${baseSlug}-${dateStr}`;

    const { data: existing } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (existing) {
      return new Response(
        JSON.stringify({ message: "Article already generated today for this topic" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    // Generate article via Lovable AI
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

    const prompt = `Write an SEO-optimized blog article for a luxury watch store called Replic8, based in Cyprus. 

Target keyword: "${topic.keyword}"
Category: ${topic.category}

The store sells premium AAA-grade automatic men's watches (Rolex clones) with Seiko NH35 movements, 904L stainless steel, priced at €300-€350. Free next-day delivery across Cyprus via Akis Express. Cash on delivery available.

Models available:
1. Submariner No Date (Black) - €300 - Best Seller
2. Submariner Hulk (Green) - €300
3. Datejust 36mm (Dark Grey) - €300
4. Submariner Blue/Gold (Two-tone) - €300
5. GMT-Master II Sprite (Black/Green) - €300
6. Daytona Black - €350

Write the article with:
- A compelling title (50-60 chars) naturally including the keyword
- An SEO title for the browser tab
- A meta description (150-160 chars)
- A short excerpt (1-2 sentences)
- 6-8 content paragraphs, some starting with "## " for subheadings
- Reference specific Cyprus cities/locations naturally
- Mention product features: automatic movement, water resistance, full set with box/papers
- Include delivery info and pricing
- Professional, luxury tone — not pushy
- Estimated read time

Respond in JSON format:
{
  "title": "...",
  "seoTitle": "...",
  "metaDescription": "...",
  "excerpt": "...",
  "readTime": "X min read",
  "content": ["paragraph1", "## Heading", "paragraph2", ...]
}`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are an expert SEO copywriter for a luxury watch brand in Cyprus. Always respond with valid JSON only, no markdown code fences." },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      throw new Error(`AI API error: ${aiResponse.status} ${errText}`);
    }

    const aiData = await aiResponse.json();
    const articleText = aiData.choices?.[0]?.message?.content;
    if (!articleText) throw new Error("No content from AI");

    const article = JSON.parse(articleText);

    // Insert into database
    const { error: insertError } = await supabase.from("blog_posts").insert({
      slug,
      title: article.title,
      seo_title: article.seoTitle,
      meta_description: article.metaDescription,
      excerpt: article.excerpt,
      date: dateStr,
      read_time: article.readTime || "5 min read",
      category: topic.category,
      content: article.content,
      related_products: topic.products,
    });

    if (insertError) throw insertError;

    return new Response(
      JSON.stringify({ success: true, slug, title: article.title }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Blog generation error:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
