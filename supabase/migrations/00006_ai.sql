-- ========================================================
-- MANGATA & GALLO - MIGRATION 00006: AI HISTORY & EMBEDDINGS
-- ========================================================

CREATE TABLE IF NOT EXISTS public.ai_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  occasion TEXT NOT NULL,
  recipient TEXT NOT NULL,
  style_preference TEXT NOT NULL,
  budget NUMERIC(10, 2) NOT NULL,
  primary_recommendation_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  recommendation_reasoning TEXT NOT NULL,
  confidence_score NUMERIC(3, 2) DEFAULT 0.95,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.product_embeddings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE UNIQUE,
  embedding vector(1536),
  content_text TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
