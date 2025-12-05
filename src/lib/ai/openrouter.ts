/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file lib/ai/openrouter.ts
 * @description Cliente para OpenRouter API - Abstracción para llamadas a modelos de IA
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

import { AI_MODELS, type ModelId, getModelConfig } from '@/config/models'

// ===========================================
// TIPOS
// ===========================================

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface ChatOptions {
  model: ModelId
  temperature?: number
  maxTokens?: number
  topP?: number
  stream?: boolean
}

export interface ChatResponse {
  content: string
  model: string
  usage: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
  finishReason: string
}

export interface OpenRouterError {
  code: string
  message: string
  type: string
}

// ===========================================
// CLIENTE
// ===========================================

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1'

/**
 * Realiza una llamada al API de OpenRouter
 */
export async function chat(
  messages: ChatMessage[],
  options: ChatOptions,
  apiKey: string
): Promise<ChatResponse> {
  const modelConfig = getModelConfig(options.model)

  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      'X-Title': 'Prompt Agent',
    },
    body: JSON.stringify({
      model: modelConfig.id,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? modelConfig.maxTokens,
      top_p: options.topP ?? 1,
      stream: options.stream ?? false,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const error: OpenRouterError = {
      code: `HTTP_${response.status}`,
      message: errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`,
      type: errorData.error?.type || 'api_error',
    }

    // Errores específicos
    if (response.status === 401) {
      error.code = 'INVALID_API_KEY'
      error.message = 'API key inválida o expirada'
    } else if (response.status === 429) {
      error.code = 'RATE_LIMITED'
      error.message = 'Límite de solicitudes excedido'
    } else if (response.status === 402) {
      error.code = 'INSUFFICIENT_CREDITS'
      error.message = 'Créditos insuficientes en OpenRouter'
    }

    throw new OpenRouterAPIError(error)
  }

  const data = await response.json()

  return {
    content: data.choices[0]?.message?.content || '',
    model: data.model,
    usage: {
      promptTokens: data.usage?.prompt_tokens || 0,
      completionTokens: data.usage?.completion_tokens || 0,
      totalTokens: data.usage?.total_tokens || 0,
    },
    finishReason: data.choices[0]?.finish_reason || 'stop',
  }
}

/**
 * Clase de error personalizada para OpenRouter
 */
export class OpenRouterAPIError extends Error {
  code: string
  type: string

  constructor(error: OpenRouterError) {
    super(error.message)
    this.name = 'OpenRouterAPIError'
    this.code = error.code
    this.type = error.type
  }
}

/**
 * Verifica si una API key es válida
 */
export async function validateApiKey(apiKey: string): Promise<boolean> {
  try {
    const response = await fetch(`${OPENROUTER_BASE_URL}/auth/key`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
    return response.ok
  } catch {
    return false
  }
}

/**
 * Obtiene los créditos disponibles para una API key
 */
export async function getCredits(apiKey: string): Promise<number | null> {
  try {
    const response = await fetch(`${OPENROUTER_BASE_URL}/auth/key`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })

    if (!response.ok) return null

    const data = await response.json()
    return data.data?.limit_remaining ?? null
  } catch {
    return null
  }
}

/**
 * Lista de modelos disponibles en OpenRouter
 */
export async function listModels(): Promise<string[]> {
  return Object.values(AI_MODELS).map((m) => m.id)
}
