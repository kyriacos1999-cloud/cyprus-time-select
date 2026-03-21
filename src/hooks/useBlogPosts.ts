import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { blogPosts as staticPosts, type BlogPost } from "@/data/blogPosts";

export const useBlogPosts = () => {
  const [allPosts, setAllPosts] = useState<BlogPost[]>(staticPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDynamic = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        const dynamicPosts: BlogPost[] = data.map((row: any) => ({
          slug: row.slug,
          title: row.title,
          seoTitle: row.seo_title,
          metaDescription: row.meta_description,
          excerpt: row.excerpt,
          date: row.date,
          readTime: row.read_time,
          category: row.category,
          content: row.content as string[],
          relatedProducts: row.related_products as number[],
        }));

        // Merge: dynamic first (newest), then static
        const staticSlugs = new Set(staticPosts.map((p) => p.slug));
        const uniqueDynamic = dynamicPosts.filter((p) => !staticSlugs.has(p.slug));
        setAllPosts([...uniqueDynamic, ...staticPosts]);
      }
      setLoading(false);
    };

    fetchDynamic();
  }, []);

  const getBySlug = (slug: string) => allPosts.find((p) => p.slug === slug) || null;

  return { posts: allPosts, loading, getBySlug };
};
