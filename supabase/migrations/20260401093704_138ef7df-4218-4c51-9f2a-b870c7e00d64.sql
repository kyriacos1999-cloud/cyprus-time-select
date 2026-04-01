CREATE TABLE public.welcome_discounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  discount_percent integer NOT NULL DEFAULT 10,
  expires_at timestamp with time zone NOT NULL,
  used boolean NOT NULL DEFAULT false,
  used_at timestamp with time zone,
  visitor_id text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.welcome_discounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read their discount code"
  ON public.welcome_discounts FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Service role can manage discounts"
  ON public.welcome_discounts FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can update used status"
  ON public.welcome_discounts FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);