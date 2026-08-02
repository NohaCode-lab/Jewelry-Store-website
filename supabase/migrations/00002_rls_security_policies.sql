-- ========================================================
-- MANGATA & GALLO - ROW LEVEL SECURITY (RLS) POLICIES
-- Migration: 00002_rls_security_policies.sql
-- ========================================================

-- Enable Row Level Security on Sensitive Tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 1. PROFILES POLICIES
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 2. PRODUCTS & CATEGORIES (Public Read Access)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to products"
  ON public.products FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to categories"
  ON public.categories FOR SELECT
  USING (true);

-- 3. ORDERS POLICIES
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- 4. ORDER ITEMS POLICIES
CREATE POLICY "Users can view own order items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE public.orders.id = public.order_items.order_id
      AND (public.orders.user_id = auth.uid() OR public.orders.user_id IS NULL)
    )
  );

-- 5. WISHLIST POLICIES
CREATE POLICY "Users can view own wishlist items"
  ON public.wishlist FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own wishlist items"
  ON public.wishlist FOR ALL
  USING (auth.uid() = user_id);

-- 6. AI HISTORY POLICIES
CREATE POLICY "Users can view own AI history"
  ON public.ai_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Allow system insert into AI history"
  ON public.ai_history FOR INSERT
  WITH CHECK (true);
