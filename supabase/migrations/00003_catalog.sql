-- ========================================================
-- MANGATA & GALLO - MIGRATION 00003: CATALOG & VARIANTS
-- ========================================================

CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  details TEXT[] DEFAULT '{}',
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  category_slug TEXT NOT NULL,
  base_price NUMERIC(10, 2) NOT NULL,
  in_stock BOOLEAN DEFAULT TRUE,
  stock_quantity INT DEFAULT 15,
  main_image TEXT NOT NULL,
  available_metals TEXT[] DEFAULT '{"18K Yellow Gold", "18K Rose Gold", "950 Platinum"}',
  available_carats TEXT[] DEFAULT '{"0.5 ct", "1.0 ct", "2.0 ct"}',
  rating NUMERIC(3, 2) DEFAULT 5.00,
  reviews_count INT DEFAULT 0,
  is_bestseller BOOLEAN DEFAULT FALSE,
  is_new_arrival BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.product_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.product_variants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  sku TEXT UNIQUE NOT NULL,
  metal_type TEXT NOT NULL,
  carat_size TEXT,
  ring_size NUMERIC(3, 1),
  price_adjustment NUMERIC(10, 2) DEFAULT 0.00,
  stock_quantity INT DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_slug);
CREATE INDEX IF NOT EXISTS idx_product_images_product ON public.product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_product ON public.product_variants(product_id);
