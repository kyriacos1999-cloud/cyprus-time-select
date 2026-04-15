
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  payment_method TEXT NOT NULL DEFAULT 'stripe',
  products JSONB NOT NULL DEFAULT '[]'::jsonb,
  subtotal NUMERIC,
  discount NUMERIC DEFAULT 0,
  fees NUMERIC DEFAULT 0,
  total NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'EUR',
  status TEXT NOT NULL DEFAULT 'pending',
  stripe_session_id TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Service role can insert orders" ON public.orders FOR INSERT WITH CHECK (auth.role() = 'service_role'::text);
CREATE POLICY "Service role can update orders" ON public.orders FOR UPDATE USING (auth.role() = 'service_role'::text);
