import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Massive rotating topic pool — SEO-driven keywords for Cyprus watch market
const TOPICS = [
  // High-intent buying keywords
  { keyword: "buy Rolex clone Cyprus", category: "Buying Guide", products: [1, 2, 3] },
  { keyword: "best Rolex replica Cyprus 2026", category: "Buying Guide", products: [1, 6, 5] },
  { keyword: "premium watch Cyprus free delivery", category: "Buying Guide", products: [1, 2, 4] },
  { keyword: "affordable luxury watch Limassol", category: "City Guide", products: [1, 3, 6] },
  { keyword: "automatic watch Nicosia shop", category: "City Guide", products: [2, 5, 1] },
  { keyword: "men's watch gift Cyprus", category: "Gift Guide", products: [3, 5, 6] },
  { keyword: "Submariner alternative Cyprus", category: "Review", products: [1, 2, 4] },
  { keyword: "Daytona clone review Cyprus", category: "Review", products: [6, 1, 5] },
  { keyword: "GMT watch Cyprus buy online", category: "Buying Guide", products: [5, 1, 6] },
  { keyword: "Datejust alternative Cyprus", category: "Review", products: [3, 1, 4] },
  
  // City-specific SEO
  { keyword: "luxury watches Paphos", category: "City Guide", products: [2, 4, 5] },
  { keyword: "watch shop Larnaca Cyprus", category: "City Guide", products: [1, 3, 6] },
  { keyword: "best watches Ayia Napa summer", category: "City Guide", products: [2, 5, 6] },
  { keyword: "watch delivery Protaras", category: "City Guide", products: [1, 4, 2] },
  { keyword: "Famagusta watch style guide", category: "City Guide", products: [3, 5, 1] },
  { keyword: "Troodos mountains adventure watch", category: "Style Guide", products: [1, 2, 5] },
  
  // Style & lifestyle
  { keyword: "dive watch Mediterranean summer", category: "Style Guide", products: [1, 2, 4] },
  { keyword: "black dial watch men 2026", category: "Style Guide", products: [1, 6, 5] },
  { keyword: "green dial watch trend", category: "Style Guide", products: [2, 5, 1] },
  { keyword: "two-tone gold watch Cyprus", category: "Style Guide", products: [4, 3, 6] },
  { keyword: "watch for wedding Cyprus", category: "Style Guide", products: [3, 4, 6] },
  { keyword: "dress watch business meetings", category: "Style Guide", products: [3, 6, 4] },
  { keyword: "beach watch Cyprus summer", category: "Style Guide", products: [1, 2, 5] },
  { keyword: "watch outfit styling men", category: "Style Guide", products: [3, 4, 1] },
  { keyword: "daily wear automatic watch", category: "Style Guide", products: [1, 3, 5] },
  { keyword: "watch casual vs formal Cyprus", category: "Style Guide", products: [1, 3, 6] },
  
  // Technical & educational
  { keyword: "NH35 movement automatic watch", category: "Watch Guide", products: [1, 2, 6] },
  { keyword: "904L stainless steel watches", category: "Watch Guide", products: [1, 2, 3] },
  { keyword: "watch water resistance explained", category: "Watch Guide", products: [1, 2, 5] },
  { keyword: "automatic vs quartz watch", category: "Watch Guide", products: [1, 3, 5] },
  { keyword: "watch maintenance tips Cyprus", category: "Watch Guide", products: [1, 2, 3] },
  { keyword: "sapphire crystal watch guide", category: "Watch Guide", products: [1, 6, 3] },
  { keyword: "chronograph watch explained", category: "Watch Guide", products: [6, 1, 4] },
  { keyword: "GMT complication watch guide", category: "Watch Guide", products: [5, 1, 6] },
  { keyword: "watch bracelet types guide", category: "Watch Guide", products: [5, 3, 1] },
  { keyword: "watch collection starter guide", category: "Watch Guide", products: [1, 3, 5] },
  { keyword: "ceramic bezel watch benefits", category: "Watch Guide", products: [1, 2, 6] },
  { keyword: "watch lume explained SuperLuminova", category: "Watch Guide", products: [1, 2, 5] },
  
  // Product-specific reviews
  { keyword: "Rolex Hulk review green dial", category: "Review", products: [2, 1, 5] },
  { keyword: "Rolex No Date Submariner review", category: "Review", products: [1, 2, 6] },
  { keyword: "Datejust 36mm dark grey review", category: "Review", products: [3, 1, 4] },
  { keyword: "GMT Master II Sprite review", category: "Review", products: [5, 1, 6] },
  { keyword: "Rolex Daytona Black dial review", category: "Review", products: [6, 1, 5] },
  { keyword: "Submariner Blue Gold two-tone", category: "Review", products: [4, 1, 3] },
  
  // Seasonal & trending
  { keyword: "best summer watches 2026", category: "Seasonal", products: [1, 2, 5] },
  { keyword: "spring watch trends Cyprus", category: "Seasonal", products: [2, 3, 4] },
  { keyword: "winter accessories watches Cyprus", category: "Seasonal", products: [3, 6, 1] },
  { keyword: "New Year gift watch Cyprus", category: "Gift Guide", products: [6, 3, 4] },
  { keyword: "Valentine's Day watch gift", category: "Gift Guide", products: [3, 4, 6] },
  { keyword: "Father's Day watch Cyprus", category: "Gift Guide", products: [1, 6, 5] },
  { keyword: "graduation gift watch men", category: "Gift Guide", products: [3, 1, 5] },
  { keyword: "birthday watch gift Cyprus", category: "Gift Guide", products: [1, 3, 6] },
  
  // Comparison & decision
  { keyword: "Submariner vs GMT Master", category: "Comparison", products: [1, 5, 2] },
  { keyword: "Daytona vs Submariner watch", category: "Comparison", products: [6, 1, 2] },
  { keyword: "36mm vs 40mm watch size", category: "Comparison", products: [3, 1, 5] },
  { keyword: "best first luxury watch buy", category: "Buying Guide", products: [1, 3, 5] },
  { keyword: "watch under 350 euro Cyprus", category: "Buying Guide", products: [1, 2, 3] },
  { keyword: "cash on delivery watches Cyprus", category: "Buying Guide", products: [1, 2, 6] },
  { keyword: "next day delivery watches Cyprus", category: "Buying Guide", products: [1, 3, 5] },
  
  // Long-tail SEO
  { keyword: "why buy automatic watch over quartz", category: "Watch Guide", products: [1, 3, 6] },
  { keyword: "how to choose watch size wrist", category: "Watch Guide", products: [3, 1, 5] },
  { keyword: "watch box set unboxing Cyprus", category: "Review", products: [1, 2, 3] },
  { keyword: "is 904L steel worth it watches", category: "Watch Guide", products: [1, 2, 4] },
  { keyword: "watch Cyprus online trusted shop", category: "Buying Guide", products: [1, 2, 6] },
  { keyword: "Akis Express watch delivery Cyprus", category: "Buying Guide", products: [1, 3, 5] },
  { keyword: "premium watch affordable price Cyprus", category: "Buying Guide", products: [1, 3, 6] },
  { keyword: "watch lifestyle Cyprus Mediterranean", category: "Style Guide", products: [2, 4, 5] },
  { keyword: "watch review TikTok Cyprus", category: "Review", products: [1, 2, 6] },
  { keyword: "best everyday watch 2026", category: "Watch Guide", products: [1, 3, 5] },
];

// Get current month/season context for trend awareness
const getSeasonalContext = (): string => {
  const now = new Date();
  const month = now.getMonth();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonth = monthNames[month];
  
  let season = "winter";
  if (month >= 2 && month <= 4) season = "spring";
  else if (month >= 5 && month <= 7) season = "summer";
  else if (month >= 8 && month <= 10) season = "autumn";
  
  const upcomingEvents: string[] = [];
  if (month === 0) upcomingEvents.push("Valentine's Day coming up");
  if (month === 1) upcomingEvents.push("Valentine's Day is here");
  if (month === 4) upcomingEvents.push("summer season approaching");
  if (month === 5 || month === 6) upcomingEvents.push("peak summer in Cyprus, tourism season");
  if (month === 7) upcomingEvents.push("late summer, back to school season");
  if (month === 10) upcomingEvents.push("Black Friday and Christmas shopping season");
  if (month === 11) upcomingEvents.push("Christmas and New Year gifting season");
  
  return `Current month: ${currentMonth} 2026. Season: ${season} in Cyprus. ${upcomingEvents.length > 0 ? "Context: " + upcomingEvents.join(", ") + "." : ""} Write content that feels timely and relevant to what's happening now.`;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get existing post count to rotate through topics
    const { count } = await supabase
      .from("blog_posts")
      .select("*", { count: "exact", head: true });

    const topicIndex = (count ?? 0) % TOPICS.length;
    const topic = TOPICS[topicIndex];

    // Unique slug per day per topic
    const dateStr = new Date().toISOString().slice(0, 10);
    const baseSlug = topic.keyword.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
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

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

    const seasonalContext = getSeasonalContext();

    const prompt = `Write an SEO-optimized blog article for Replic8, a premium watch store based in Cyprus.

TARGET KEYWORD: "${topic.keyword}"
CATEGORY: ${topic.category}
${seasonalContext}

BRAND INFO:
- Replic8 sells premium AAA-grade automatic men's watches (Rolex-inspired) 
- Seiko NH35 automatic movements, 904L stainless steel, sapphire crystal
- Priced at €300-€350
- Free next-day delivery across all Cyprus cities via Akis Express
- Cash on delivery available
- Full set: watch + box + papers + warranty card

MODELS:
1. Submariner No Date (Black Dial) - €300 - Best Seller
2. Submariner Hulk (Green Dial) - €300
3. Datejust 36mm (Dark Grey Dial) - €300
4. Submariner Blue/Gold Two-Tone - €300
5. GMT-Master II Sprite (Black/Green) - €300
6. Daytona Black Dial - €350

SEO REQUIREMENTS:
- Title: 50-60 characters, naturally include the keyword
- Meta description: 150-160 chars with a call to action
- Use the keyword 3-5 times naturally throughout the article
- Include related LSI keywords (automatic watch, luxury timepiece, wristwatch, horology)
- Reference specific Cyprus cities/locations naturally (Nicosia, Limassol, Larnaca, Paphos, Ayia Napa)
- Internal linking opportunities: mention specific products by name

CONTENT STRUCTURE:
- 8-10 content blocks (mix of paragraphs and ## subheadings)
- Opening paragraph hooks the reader with a relatable scenario
- Include practical advice, not just product promotion
- End with a soft CTA mentioning free delivery and pricing
- Professional luxury tone — informative, trustworthy, not salesy
- Include at least one tip or insight the reader didn't expect

Respond ONLY in valid JSON:
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
          { role: "system", content: "You are an expert SEO copywriter specializing in luxury watches and the Cyprus market. Write engaging, informative content that ranks well on Google. Always respond with valid JSON only, no markdown code fences." },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI API error:", aiResponse.status, errText);
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited, will retry next schedule" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 429 }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted — please top up in Settings > Workspace > Usage" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 402 }
        );
      }
      throw new Error(`AI API error: ${aiResponse.status} ${errText}`);
    }

    const aiData = await aiResponse.json();
    const articleText = aiData.choices?.[0]?.message?.content;
    if (!articleText) throw new Error("No content from AI");

    const article = JSON.parse(articleText);

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

    console.log(`✅ Blog post generated: "${article.title}" [${slug}]`);

    return new Response(
      JSON.stringify({ success: true, slug, title: article.title, keyword: topic.keyword }),
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
