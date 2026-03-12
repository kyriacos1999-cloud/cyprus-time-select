
CREATE TABLE public.product_inventory (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL UNIQUE,
  sold_out BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed all 6 products as available
INSERT INTO public.product_inventory (product_id, sold_out) VALUES
  (1, false), (2, false), (3, false), (4, false), (5, false), (6, false);

-- Allow public read access (no auth needed for a storefront)
ALTER TABLE public.product_inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read inventory"
  ON public.product_inventory
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Service role can update (edge functions use service role)
CREATE POLICY "Service role can update inventory"
  ON public.product_inventory
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);
