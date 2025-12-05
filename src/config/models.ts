/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file config/models.ts
 * @description Configuración de modelos de IA disponibles via OpenRouter
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

export interface ModelConfig {
  id: string // ID en OpenRouter
  name: string // Nombre para mostrar
  provider: 'qwen' | 'moonshot' | 'deepseek' | 'google' | 'anthropic'
  description: string
  url: string // URL en OpenRouter
  maxTokens: number
  inputCostPer1M: number // USD por 1M tokens de entrada
  outputCostPer1M: number // USD por 1M tokens de salida
  contextWindow: number
  capabilities: ('chat' | 'reasoning' | 'code')[]
  recommended: boolean
  tier: 'free' | 'standard' | 'premium'
}

/**
 * Modelos disponibles para generación de prompts
 * Ordenados por recomendación
 */
export const AI_MODELS = {
  'qwen-qwq': {
    id: 'qwen/qwq-32b',
    name: 'Qwen QWQ 32B',
    provider: 'qwen',
    description: 'Modelo de razonamiento profundo con capacidades de pensamiento extendido. Excelente para analisis complejos y resolucion de problemas.',
    url: 'https://openrouter.ai/qwen/qwq-32b',
    maxTokens: 16384,
    inputCostPer1M: 0.12,
    outputCostPer1M: 0.18,
    contextWindow: 32768,
    capabilities: ['chat', 'reasoning'],
    recommended: true,
    tier: 'standard',
  },
  'kimi-k2': {
    id: 'moonshotai/kimi-k2',
    name: 'Kimi K2',
    provider: 'moonshot',
    description: 'Modelo de ultima generacion de Moonshot AI con arquitectura MoE. Especializado en tareas complejas con ventana de contexto de 128K.',
    url: 'https://openrouter.ai/moonshotai/kimi-k2',
    maxTokens: 16384,
    inputCostPer1M: 0.15,
    outputCostPer1M: 0.40,
    contextWindow: 131072,
    capabilities: ['chat', 'reasoning'],
    recommended: true,
    tier: 'standard',
  },
  'deepseek-chat': {
    id: 'deepseek/deepseek-chat-v3-0324',
    name: 'DeepSeek Chat V3',
    provider: 'deepseek',
    description: 'Modelo versatil de proposito general con excelente rendimiento en tareas de chat y generacion de codigo.',
    url: 'https://openrouter.ai/deepseek/deepseek-chat-v3-0324',
    maxTokens: 8192,
    inputCostPer1M: 0.14,
    outputCostPer1M: 0.28,
    contextWindow: 65536,
    capabilities: ['chat', 'code'],
    recommended: true,
    tier: 'standard',
  },
} as const satisfies Record<string, ModelConfig>

export type ModelId = keyof typeof AI_MODELS

/**
 * Modelo por defecto para generación
 */
export const DEFAULT_MODEL: ModelId = 'qwen-qwq'

/**
 * Modelo para recomendaciones (más rápido)
 */
export const RECOMMENDER_MODEL: ModelId = 'deepseek-chat'

/**
 * Obtiene la configuración de un modelo por su ID
 */
export function getModelConfig(modelId: ModelId): ModelConfig {
  return AI_MODELS[modelId]
}

/**
 * Lista de modelos ordenados para UI
 */
export function getAvailableModels(): Array<ModelConfig & { key: ModelId }> {
  return Object.entries(AI_MODELS)
    .map(([key, config]) => ({ ...config, key: key as ModelId }))
    .sort((a, b) => {
      // Primero los recomendados
      if (a.recommended !== b.recommended) return a.recommended ? -1 : 1
      // Luego por tier
      const tierOrder = { free: 0, standard: 1, premium: 2 }
      return tierOrder[a.tier] - tierOrder[b.tier]
    })
}
