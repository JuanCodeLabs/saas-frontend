import { supabase } from '@/lib/supabase'
import { subscriptionRepository } from '@/repositories/subscriptionRepository'
import { userRepository } from '@/repositories/userRepository'
import type { StripeCheckoutSession, StripePortalSession } from '@/types/stripe.types'

class StripeService {
  async createCheckoutSession(
    priceId: string,
    successUrl: string,
    cancelUrl: string,
    customerId?: string
  ): Promise<StripeCheckoutSession> {
    // In production, this calls an Edge Function that creates the session server-side
    // For Fase 1, this is a placeholder that will be replaced in Fase 2
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: {
        priceId,
        successUrl,
        cancelUrl,
        customerId,
      },
    })

    if (error) throw new Error(`StripeService.createCheckoutSession: ${error.message}`)
    return data
  }

  async createPortalSession(customerId: string, returnUrl: string): Promise<StripePortalSession> {
    const { data, error } = await supabase.functions.invoke('create-portal-session', {
      body: { customerId, returnUrl },
    })

    if (error) throw new Error(`StripeService.createPortalSession: ${error.message}`)
    return data
  }

  async redirectToCheckout(url: string) {
    window.location.href = url
  }

  async cancelSubscription(subscriptionId: string) {
    return subscriptionRepository.cancel(subscriptionId, true)
  }

  async reactivateSubscription(subscriptionId: string) {
    return subscriptionRepository.update(subscriptionId, {
      cancel_at_period_end: false,
    })
  }

  async updateCustomerEmail(userId: string, email: string) {
    const user = await userRepository.findById(userId)
    if (!user?.stripe_customer_id) {
      throw new Error('No Stripe customer found for user')
    }

    const { data, error } = await supabase.functions.invoke('update-customer-email', {
      body: {
        customerId: user.stripe_customer_id,
        email,
      },
    })

    if (error) throw new Error(`StripeService.updateCustomerEmail: ${error.message}`)
    return data
  }
}

export const stripeService = new StripeService()
