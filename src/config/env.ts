/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file config/env.ts
 * @description Validación de variables de entorno con Zod
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

import { z } from 'zod'

/**
 * Schema de validación para variables de entorno
 * Valida en tiempo de build/runtime que todas las variables necesarias existen
 */
const envSchema = z.object({
  // ===========================================
  // REQUIRED - La app no funcionará sin estas
  // ===========================================
  OPENROUTER_API_KEY: z.string().min(1, 'OPENROUTER_API_KEY is required'),

  // ===========================================
  // OPTIONAL - Features deshabilitadas si no existen
  // ===========================================

  // Upstash Redis (rate limiting)
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

  // Email (contacto)
  RESEND_API_KEY: z.string().optional(),
  CONTACT_EMAIL: z.string().email().optional(),

  // ===========================================
  // FEATURE FLAGS
  // ===========================================
  ENABLE_ANALYTICS: z
    .string()
    .default('false')
    .transform((val) => val === 'true'),
  ENABLE_RATE_LIMITING: z
    .string()
    .default('true')
    .transform((val) => val === 'true'),

  // ===========================================
  // LIMITS
  // ===========================================
  FREE_REQUESTS_PER_HOUR: z.coerce.number().default(10),
  PROMO_REQUESTS_PER_HOUR: z.coerce.number().default(30),

  // ===========================================
  // ENVIRONMENT
  // ===========================================
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
})

export type Env = z.infer<typeof envSchema>

/**
 * Valida las variables de entorno y lanza error si faltan
 */
function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env)

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:')
    console.error(JSON.stringify(parsed.error.flatten().fieldErrors, null, 2))

    // En desarrollo, mostrar warning pero no crashear
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️  Running with default/missing env vars in development')
      return envSchema.parse({
        ...process.env,
        OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY || 'sk-placeholder-dev',
      })
    }

    throw new Error('Invalid environment variables')
  }

  return parsed.data
}

export const env = validateEnv()

/**
 * Variables públicas (expuestas al cliente)
 */
export const publicEnv = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const
