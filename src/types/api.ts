/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file types/api.ts
 * @description Tipos TypeScript para las respuestas de la API REST
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

/**
 * Respuesta base de la API
 */
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: ApiError
}

/**
 * Error de API
 */
export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
}

/**
 * Información de rate limiting
 */
export interface RateLimitInfo {
  remaining: number
  limit: number
  resetAt: number // Unix timestamp
}

/**
 * Respuesta con rate limit info
 */
export interface ApiResponseWithRateLimit<T = unknown> extends ApiResponse<T> {
  rateLimit?: RateLimitInfo
}

/**
 * Request para recomendación de framework
 */
export interface RecommendFrameworkRequest {
  objective: string
  context?: 'general' | 'web' | 'marketing' | 'technical'
}

/**
 * Response de recomendación
 */
export interface RecommendFrameworkResponse {
  frameworkId: string
  reason: string
  confidence: number
  alternatives: string[]
  usage: RateLimitInfo
}

/**
 * Request para generar prompt
 */
export interface GeneratePromptRequest {
  frameworkId: string
  formData: Record<string, string>
  objective?: string
  model?: string
}

/**
 * Response de generación de prompt
 */
export interface GeneratePromptResponse {
  prompt: string
  rawPrompt: string
  tokenCount: number
  model: string
  usage: RateLimitInfo
}

/**
 * Request para razonadores
 */
export interface ReasonerQuestionsRequest {
  topic: string
}

/**
 * Response de preguntas para razonadores
 */
export interface ReasonerQuestionsResponse {
  questions: string[]
  usage: RateLimitInfo
}

/**
 * Request para generar prompt de razonamiento
 */
export interface ReasonerPromptRequest {
  topic: string
  questions: string[]
  answers: Record<string, string>
}

/**
 * Response de prompt de razonamiento
 */
export interface ReasonerPromptResponse {
  prompt: string
  tokenCount: number
  usage: RateLimitInfo
}

/**
 * Request para contacto
 */
export interface ContactRequest {
  name: string
  email: string
  subject: string
  message: string
}

/**
 * Response de contacto
 */
export interface ContactResponse {
  sent: boolean
}

/**
 * Info de uso actual
 */
export interface UsageInfoResponse {
  tier: 'free' | 'promo' | 'custom'
  remaining: number
  limit: number
  resetAt: number
  hasCustomKey: boolean
}
