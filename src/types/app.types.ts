import type { Database } from './database.types'

// Database-derived types
export type Plan = Database['public']['Tables']['plans']['Row']
export type User = Database['public']['Tables']['users']['Row']
export type Organization = Database['public']['Tables']['organizations']['Row']
export type OrgMember = Database['public']['Tables']['organization_members']['Row']
export type Subscription = Database['public']['Tables']['subscriptions']['Row']
export type StripeEvent = Database['public']['Tables']['stripe_events']['Row']
export type Invitation = Database['public']['Tables']['invitations']['Row']

// Input types
export type CreateUserInput = Database['public']['Tables']['users']['Insert']
export type UpdateUserInput = Database['public']['Tables']['users']['Update']
export type CreateOrgInput = Omit<Database['public']['Tables']['organizations']['Insert'], 'slug'>
export type UpdateOrgInput = Database['public']['Tables']['organizations']['Update']
export type CreateSubscriptionInput = Database['public']['Tables']['subscriptions']['Insert']
export type UpdateSubscriptionInput = Database['public']['Tables']['subscriptions']['Update']
export type CreateInvitationInput = Database['public']['Tables']['invitations']['Insert']

// Enum types
export type OrgRole = 'owner' | 'admin' | 'member' | 'viewer'
export type UserRole = 'user' | 'admin'
export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'canceled' | 'paused'
export type PlanName = 'free' | 'standard' | 'pro' | 'enterprise'

// Permission types
export type Permission =
  | 'org:manage'
  | 'org:delete'
  | 'members:invite'
  | 'members:remove'
  | 'billing:manage'
  | 'settings:edit'

// UI types
export type Theme = 'light' | 'dark' | 'system'
