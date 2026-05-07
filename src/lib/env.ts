import { z } from 'zod'

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url().optional().default('http://localhost:54321'),
  VITE_SUPABASE_ANON_KEY: z.string().min(1).optional().default('dev-key'),
  VITE_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_').optional().default('pk_test_placeholder'),
  VITE_APP_URL: z.string().url().optional().default('http://localhost:5173'),
})

export const env = envSchema.parse({
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  VITE_STRIPE_PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
  VITE_APP_URL: import.meta.env.VITE_APP_URL,
})
