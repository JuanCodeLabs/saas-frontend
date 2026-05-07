-- Migration: 003_rls_policies
-- Description: Row Level Security policies for all tables

-- ============================================
-- ENABLE RLS ON ALL TABLES
-- ============================================
ALTER TABLE users               ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations       ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions       ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations         ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_events       ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans               ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PLANS: Everyone can read active plans
-- ============================================
CREATE POLICY "plans_select_active" ON plans
  FOR SELECT USING (is_active = true);

-- ============================================
-- USERS: Each user sees their own profile
-- Platform admins see all users
-- ============================================
CREATE POLICY "users_select_own" ON users
  FOR SELECT USING (
    auth.uid() = id OR
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

CREATE POLICY "users_update_own" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "users_insert_self" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================
-- ORGANIZATIONS: Members can see orgs they belong to
-- Owner and admin can update
-- ============================================
CREATE POLICY "orgs_select_members" ON organizations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM organization_members om
      WHERE om.organization_id = id
        AND om.user_id = auth.uid()
    )
  );

CREATE POLICY "orgs_insert_authenticated" ON organizations
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "orgs_update_owner_admin" ON organizations
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM organization_members om
      WHERE om.organization_id = id
        AND om.user_id = auth.uid()
        AND om.role IN ('owner', 'admin')
    )
  );

CREATE POLICY "orgs_delete_owner" ON organizations
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM organization_members om
      WHERE om.organization_id = id
        AND om.user_id = auth.uid()
        AND om.role = 'owner'
    )
  );

-- ============================================
-- ORGANIZATION_MEMBERS: Members see other members in their org
-- Owner/admin can add and remove members
-- ============================================
CREATE POLICY "org_members_select" ON organization_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM organization_members om
      WHERE om.organization_id = organization_id
        AND om.user_id = auth.uid()
    )
  );

CREATE POLICY "org_members_insert_owner_admin" ON organization_members
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM organization_members om
      WHERE om.organization_id = organization_id
        AND om.user_id = auth.uid()
        AND om.role IN ('owner', 'admin')
    )
  );

CREATE POLICY "org_members_update_owner_admin" ON organization_members
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM organization_members om
      WHERE om.organization_id = organization_id
        AND om.user_id = auth.uid()
        AND om.role IN ('owner', 'admin')
    )
  );

CREATE POLICY "org_members_delete_owner_admin" ON organization_members
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM organization_members om
      WHERE om.organization_id = organization_id
        AND om.user_id = auth.uid()
        AND om.role IN ('owner', 'admin')
    )
  );

-- ============================================
-- SUBSCRIPTIONS: Users see their own or their org's subscriptions
-- ============================================
CREATE POLICY "subscriptions_select_own" ON subscriptions
  FOR SELECT USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM organization_members om
      WHERE om.organization_id = subscriptions.organization_id
        AND om.user_id = auth.uid()
    )
  );

-- ============================================
-- INVITATIONS: Members can see invitations for their org
-- Owner/admin can create and manage invitations
-- ============================================
CREATE POLICY "invitations_select_members" ON invitations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM organization_members om
      WHERE om.organization_id = organization_id
        AND om.user_id = auth.uid()
    )
  );

CREATE POLICY "invitations_insert_owner_admin" ON invitations
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM organization_members om
      WHERE om.organization_id = organization_id
        AND om.user_id = auth.uid()
        AND om.role IN ('owner', 'admin')
    )
  );

CREATE POLICY "invitations_update_owner_admin" ON invitations
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM organization_members om
      WHERE om.organization_id = organization_id
        AND om.user_id = auth.uid()
        AND om.role IN ('owner', 'admin')
    )
  );

CREATE POLICY "invitations_delete_owner_admin" ON invitations
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM organization_members om
      WHERE om.organization_id = organization_id
        AND om.user_id = auth.uid()
        AND om.role IN ('owner', 'admin')
    )
  );

-- Anyone with a valid token can read their own invitation (for accept flow)
CREATE POLICY "invitations_select_by_token" ON invitations
  FOR SELECT USING (token IS NOT NULL);

-- ============================================
-- STRIPE_EVENTS: Only service role can access
-- No policies needed — service role bypasses RLS
-- ============================================
