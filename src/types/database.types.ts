export type Database = {
  public: {
    Tables: {
      plans: {
        Row: {
          id: string
          name: string
          display_name: string
          stripe_price_id: string | null
          price_monthly: number
          price_yearly: number
          max_members: number
          max_projects: number
          features: Record<string, unknown>[]
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          display_name: string
          stripe_price_id?: string | null
          price_monthly?: number
          price_yearly?: number
          max_members?: number
          max_projects?: number
          features?: Record<string, unknown>[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          display_name?: string
          stripe_price_id?: string | null
          price_monthly?: number
          price_yearly?: number
          max_members?: number
          max_projects?: number
          features?: Record<string, unknown>[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'user' | 'admin'
          plan_id: string | null
          stripe_customer_id: string | null
          onboarding_completed: boolean
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          plan_id?: string | null
          stripe_customer_id?: string | null
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          plan_id?: string | null
          stripe_customer_id?: string | null
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          slug: string
          logo_url: string | null
          plan_id: string
          stripe_customer_id: string | null
          owner_id: string
          settings: Record<string, unknown>
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          logo_url?: string | null
          plan_id: string
          stripe_customer_id?: string | null
          owner_id: string
          settings?: Record<string, unknown>
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          logo_url?: string | null
          plan_id?: string
          stripe_customer_id?: string | null
          owner_id?: string
          settings?: Record<string, unknown>
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
      organization_members: {
        Row: {
          id: string
          organization_id: string
          user_id: string
          role: 'owner' | 'admin' | 'member' | 'viewer'
          invited_by: string | null
          invited_at: string | null
          joined_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          user_id: string
          role?: 'owner' | 'admin' | 'member' | 'viewer'
          invited_by?: string | null
          invited_at?: string | null
          joined_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          user_id?: string
          role?: 'owner' | 'admin' | 'member' | 'viewer'
          invited_by?: string | null
          invited_at?: string | null
          joined_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string | null
          organization_id: string | null
          plan_id: string
          stripe_subscription_id: string
          stripe_price_id: string
          status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'paused'
          current_period_start: string
          current_period_end: string
          cancel_at_period_end: boolean
          trial_start: string | null
          trial_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          organization_id?: string | null
          plan_id: string
          stripe_subscription_id: string
          stripe_price_id: string
          status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'paused'
          current_period_start: string
          current_period_end: string
          cancel_at_period_end?: boolean
          trial_start?: string | null
          trial_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          organization_id?: string | null
          plan_id?: string
          stripe_subscription_id?: string
          stripe_price_id?: string
          status?: 'active' | 'trialing' | 'past_due' | 'canceled' | 'paused'
          current_period_start?: string
          current_period_end?: string
          cancel_at_period_end?: boolean
          trial_start?: string | null
          trial_end?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      stripe_events: {
        Row: {
          id: string
          type: string
          processed_at: string
          payload: Record<string, unknown>
        }
        Insert: {
          id: string
          type: string
          processed_at?: string
          payload: Record<string, unknown>
        }
        Update: {
          id?: string
          type?: string
          processed_at?: string
          payload?: Record<string, unknown>
        }
      }
      invitations: {
        Row: {
          id: string
          organization_id: string
          email: string
          role: 'owner' | 'admin' | 'member' | 'viewer'
          token: string
          invited_by: string
          expires_at: string
          accepted_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          email: string
          role?: 'owner' | 'admin' | 'member' | 'viewer'
          token?: string
          invited_by: string
          expires_at?: string
          accepted_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          email?: string
          role?: 'owner' | 'admin' | 'member' | 'viewer'
          token?: string
          invited_by?: string
          expires_at?: string
          accepted_at?: string | null
          created_at?: string
        }
      }
    }
  }
}
