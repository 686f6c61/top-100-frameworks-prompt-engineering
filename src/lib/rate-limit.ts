/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file lib/rate-limit.ts
 * @description Rate limiting simple en memoria para protección de APIs
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

// Almacenamiento en memoria (para producción usar Redis)
const rateLimitStore = new Map<string, RateLimitEntry>()

// Limpiar entradas expiradas cada 5 minutos
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key)
      }
    }
  }, 5 * 60 * 1000)
}

export interface RateLimitConfig {
  /** Número máximo de requests permitidos */
  limit: number
  /** Ventana de tiempo en milisegundos */
  windowMs: number
}

export interface RateLimitResult {
  success: boolean
  remaining: number
  resetTime: number
}

/**
 * Verifica el rate limit para una clave dada (IP, userId, etc.)
 */
export function checkRateLimit(
  key: string,
  config: RateLimitConfig = { limit: 20, windowMs: 60 * 1000 }
): RateLimitResult {
  const now = Date.now()
  const entry = rateLimitStore.get(key)

  // Si no hay entrada o expiró, crear nueva
  if (!entry || now > entry.resetTime) {
    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: now + config.windowMs,
    }
    rateLimitStore.set(key, newEntry)
    return {
      success: true,
      remaining: config.limit - 1,
      resetTime: newEntry.resetTime,
    }
  }

  // Incrementar contador
  entry.count++

  // Verificar si excede el límite
  if (entry.count > config.limit) {
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
    }
  }

  return {
    success: true,
    remaining: config.limit - entry.count,
    resetTime: entry.resetTime,
  }
}

/**
 * Obtiene la IP del request
 */
export function getClientIP(request: Request): string {
  // Headers comunes para proxies
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  // Fallback
  return 'unknown'
}

// Configuraciones predefinidas
export const RATE_LIMITS = {
  // API de IA: 10 requests por minuto
  ai: { limit: 10, windowMs: 60 * 1000 },
  // API de frameworks: 60 requests por minuto
  frameworks: { limit: 60, windowMs: 60 * 1000 },
  // Límite general: 100 requests por minuto
  general: { limit: 100, windowMs: 60 * 1000 },
} as const
