-- Migration: 001_init_schema
-- Description: Create all core tables for the SaaS multitenant platform

-- ============================================
-- TABLE: plans
-- ============================================
CREATE TABLE IF NOT EXISTS plans (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  display_name    TEXT NOT NULL,
  stripe_price_id TEXT UNIQUE,
  price_monthly   INTEGER NOT NULL DEFAULT 0,
  price_yearly    INTEGER NOT NULL DEFAULT 0,
  max_members     INTEGER NOT NULL DEFAULT 1,
  max_projects    INTEGER NOT NULL DEFAULT 3,
  features        JSONB NOT NULL DEFAULT '[]',
  is_active       BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_plans_name ON plans(name);
CREATE INDEX IF NOT EXISTS idx_plans_stripe_price_id ON plans(stripe_price_id);
CREATE INDEX IF NOT EXISTS idx_plans_is_active ON plans(is_active);

-- ============================================
-- TABLE: users (extends auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id                   UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email                TEXT NOT NULL UNIQUE,
  full_name            TEXT,
  avatar_url           TEXT,
  role                 TEXT NOT NULL DEFAULT 'user',
  plan_id              UUID REFERENCES plans(id),
  stripe_customer_id   TEXT UNIQUE,
  onboarding_completed BOOLEAN NOT NULL DEFAULT false,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at           TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON users(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_users_plan_id ON users(plan_id);
CREATE INDEX IF NOT EXISTS idx_users_deleted_at ON users(deleted_at);

-- ============================================
-- TABLE: organizations
-- ============================================
CREATE TABLE IF NOT EXISTS organizations (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name               TEXT NOT NULL,
  slug               TEXT NOT NULL UNIQUE,
  logo_url           TEXT,
  plan_id            UUID NOT NULL REFERENCES plans(id),
  stripe_customer_id TEXT UNIQUE,
  owner_id           UUID NOT NULL REFERENCES users(id),
  settings           JSONB NOT NULL DEFAULT '{}',
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at         TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_organizations_slug ON organizations(slug);
CREATE INDEX IF NOT EXISTS idx_organizations_owner_id ON organizations(owner_id);
CREATE INDEX IF NOT EXISTS idx_organizations_plan_id ON organizations(plan_id);
CREATE INDEX IF NOT EXISTS idx_organizations_deleted_at ON organizations(deleted_at);

-- ============================================
-- TABLE: organization_members
-- ============================================
CREATE TABLE IF NOT EXISTS organization_members (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role            TEXT NOT NULL DEFAULT 'member',
  invited_by      UUID REFERENCES users(id),
  invited_at      TIMESTAMPTZ,
  joined_at       TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_org_members_org_id ON organization_members(organization_id);
CREATE INDEX IF NOT EXISTS idx_org_members_user_id ON organization_members(user_id);
CREATE INDEX IF NOT EXISTS idx_org_members_role ON organization_members(role);

-- ============================================
-- TABLE: subscriptions
-- ============================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                UUID REFERENCES users(id) ON DELETE CASCADE,
  organization_id        UUID REFERENCES organizations(id) ON DELETE CASCADE,
  plan_id                UUID NOT NULL REFERENCES plans(id),
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  stripe_price_id        TEXT NOT NULL,
  status                 TEXT NOT NULL,
  current_period_start   TIMESTAMPTZ NOT NULL,
  current_period_end     TIMESTAMPTZ NOT NULL,
  cancel_at_period_end   BOOLEAN NOT NULL DEFAULT false,
  trial_start            TIMESTAMPTZ,
  trial_end              TIMESTAMPTZ,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT subscription_owner CHECK (
    (user_id IS NOT NULL AND organization_id IS NULL) OR
    (user_id IS NULL AND organization_id IS NOT NULL)
  )
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_org_id ON subscriptions(organization_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- ============================================
-- TABLE: stripe_events (idempotency)
-- ============================================
CREATE TABLE IF NOT EXISTS stripe_events (
  id           TEXT PRIMARY KEY,
  type         TEXT NOT NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  payload      JSONB NOT NULL
);

-- ============================================
-- TABLE: invitations
-- ============================================
CREATE TABLE IF NOT EXISTS invitations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  email           TEXT NOT NULL,
  role            TEXT NOT NULL DEFAULT 'member',
  token           TEXT NOT NULL UNIQUE DEFAULT gen_random_uuid()::TEXT,
  invited_by      UUID NOT NULL REFERENCES users(id),
  expires_at      TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '7 days',
  accepted_at     TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(organization_id, email)
);

CREATE INDEX IF NOT EXISTS idx_invitations_token ON invitations(token);
CREATE INDEX IF NOT EXISTS idx_invitations_email ON invitations(email);
CREATE INDEX IF NOT EXISTS idx_invitations_organization_id ON invitations(organization_id);
