
CREATE TABLE public.preorder_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  watch_description text NOT NULL,
  photo_url text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.preorder_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert preorder requests" ON public.preorder_requests
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Service role can manage preorder requests" ON public.preorder_requests
  FOR ALL TO service_role USING (true) WITH CHECK (true);

INSERT INTO storage.buckets (id, name, public) VALUES ('preorder-photos', 'preorder-photos', true);

CREATE POLICY "Anyone can upload preorder photos" ON storage.objects
  FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'preorder-photos');

CREATE POLICY "Anyone can read preorder photos" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'preorder-photos');
