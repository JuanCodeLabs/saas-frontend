import { supabase } from '@/lib/supabase'
import type { Subscription, CreateSubscriptionInput, UpdateSubscriptionInput } from '@/types/app.types'

class SubscriptionRepository {
  async findById(id: string): Promise<Subscription | null> {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*, plans(*)')
      .eq('id', id)
      .single()

    if (error) return null
    return data
  }

  async findByUserId(userId: string): Promise<Subscription | null> {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*, plans(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw new Error(`SubscriptionRepository.findByUserId: ${error.message}`)
    }
    return data
  }

  async findByOrgId(orgId: string): Promise<Subscription | null> {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*, plans(*)')
      .eq('organization_id', orgId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw new Error(`SubscriptionRepository.findByOrgId: ${error.message}`)
    }
    return data
  }

  async findByStripeId(stripeSubscriptionId: string): Promise<Subscription | null> {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*, plans(*)')
      .eq('stripe_subscription_id', stripeSubscriptionId)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw new Error(`SubscriptionRepository.findByStripeId: ${error.message}`)
    }
    return data
  }

  async create(input: CreateSubscriptionInput): Promise<Subscription> {
    const { data, error } = await supabase
      .from('subscriptions')
      .insert(input)
      .select('*, plans(*)')
      .single()

    if (error) throw new Error(`SubscriptionRepository.create: ${error.message}`)
    return data
  }

  async update(id: string, input: UpdateSubscriptionInput): Promise<Subscription> {
    const { data, error } = await supabase
      .from('subscriptions')
      .update(input)
      .eq('id', id)
      .select('*, plans(*)')
      .single()

    if (error) throw new Error(`SubscriptionRepository.update: ${error.message}`)
    return data
  }

  async cancel(id: string, cancelAtPeriodEnd: boolean = true): Promise<Subscription> {
    const { data, error } = await supabase
      .from('subscriptions')
      .update({ cancel_at_period_end: cancelAtPeriodEnd })
      .eq('id', id)
      .select('*, plans(*)')
      .single()

    if (error) throw new Error(`SubscriptionRepository.cancel: ${error.message}`)
    return data
  }
}

export const subscriptionRepository = new SubscriptionRepository()
