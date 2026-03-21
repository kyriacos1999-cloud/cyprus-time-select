CREATE TABLE public.weekly_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week_start date NOT NULL,
  week_end date NOT NULL,
  total_visitors integer DEFAULT 0,
  unique_sessions integer DEFAULT 0,
  product_views integer DEFAULT 0,
  checkout_starts integer DEFAULT 0,
  avg_time_on_page integer DEFAULT 0,
  avg_scroll_depth integer DEFAULT 0,
  top_exit_reasons jsonb DEFAULT '[]'::jsonb,
  high_intent_behaviors jsonb DEFAULT '[]'::jsonb,
  device_breakdown jsonb DEFAULT '{}'::jsonb,
  traffic_sources jsonb DEFAULT '[]'::jsonb,
  product_interest jsonb DEFAULT '[]'::jsonb,
  conversion_funnel jsonb DEFAULT '{}'::jsonb,
  recommendations jsonb DEFAULT '[]'::jsonb,
  raw_summary text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.weekly_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage weekly reports"
ON public.weekly_reports FOR ALL TO service_role
USING (true) WITH CHECK (true);

CREATE POLICY "Anon can read weekly reports"
ON public.weekly_reports FOR SELECT TO anon, authenticated
USING (true);

CREATE INDEX idx_weekly_reports_week ON public.weekly_reports(week_start DESC);