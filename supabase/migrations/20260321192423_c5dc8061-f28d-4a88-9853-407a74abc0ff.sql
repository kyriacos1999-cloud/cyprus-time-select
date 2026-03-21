CREATE TABLE public.visitor_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  event_type text NOT NULL,
  page text,
  product_id integer,
  scroll_depth integer,
  time_on_page integer,
  device_type text,
  referrer text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.visitor_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert visitor events"
ON public.visitor_events FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Service role can read visitor events"
ON public.visitor_events FOR SELECT TO service_role
USING (true);

CREATE INDEX idx_visitor_events_session ON public.visitor_events(session_id);
CREATE INDEX idx_visitor_events_type ON public.visitor_events(event_type);
CREATE INDEX idx_visitor_events_created ON public.visitor_events(created_at);