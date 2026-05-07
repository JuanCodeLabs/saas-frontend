-- Migration: 004_seed_data
-- Description: Default plans and test data for development

-- ============================================
-- DEFAULT PLANS
-- ============================================
INSERT INTO plans (name, display_name, stripe_price_id, price_monthly, price_yearly, max_members, max_projects, features, is_active) VALUES
  ('free',       'Free',       NULL,             0,      0,      1,  3,  '["1 user", "Basic features", "Community support"]'::jsonb, true),
  ('standard',   'Standard',   'price_standard', 900,    8640,   5,  10, '["Up to 5 users", "All basic features", "Email support", "API access"]'::jsonb, true),
  ('pro',        'Pro',        'price_pro',      2900,   27840,  20, -1, '["Up to 20 users", "All features", "Priority support", "API access", "Custom integrations"]'::jsonb, true),
  ('enterprise', 'Enterprise', 'price_enterprise', 9900, 95040,  -1, -1, '["Unlimited users", "All features", "Dedicated support", "API access", "Custom integrations", "SLA guarantee"]'::jsonb, true);

-- ============================================
-- TEST USERS (for development only)
-- Note: In real usage, users are created via Supabase Auth
-- These records would be auto-created by the onboarding trigger
-- ============================================
