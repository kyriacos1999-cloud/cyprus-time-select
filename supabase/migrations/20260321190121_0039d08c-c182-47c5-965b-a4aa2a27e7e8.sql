
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  seo_title text NOT NULL,
  meta_description text NOT NULL,
  excerpt text NOT NULL,
  date text NOT NULL DEFAULT to_char(now(), 'YYYY-MM-DD'),
  read_time text NOT NULL DEFAULT '5 min read',
  category text NOT NULL DEFAULT 'Watch Guide',
  content jsonb NOT NULL DEFAULT '[]'::jsonb,
  related_products jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read blog posts" ON public.blog_posts
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Service role can manage blog posts" ON public.blog_posts
  FOR ALL TO service_role USING (true) WITH CHECK (true);
