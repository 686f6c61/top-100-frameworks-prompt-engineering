/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file stores/settings-store.ts
 * @description Store Zustand persistente para configuración de la aplicación
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ModelId } from '@/config/models'

export type PromptLanguage = 'es' | 'en' | 'auto'
export type ResponseStyle = 'concise' | 'detailed' | 'technical' | 'casual'

interface SettingsState {
  // Modelo seleccionado
  selectedModel: ModelId
  setSelectedModel: (model: ModelId) => void

  // Tema
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void

  // Idioma del prompt generado
  promptLanguage: PromptLanguage
  setPromptLanguage: (language: PromptLanguage) => void

  // Estilo de respuesta
  responseStyle: ResponseStyle
  setResponseStyle: (style: ResponseStyle) => void

  // Configuración de generación
  temperature: number
  setTemperature: (temp: number) => void

  maxTokens: number
  setMaxTokens: (tokens: number) => void

  // Copiar prompt automáticamente
  autoCopy: boolean
  setAutoCopy: (value: boolean) => void

  // Mostrar ejemplos
  showExamples: boolean
  setShowExamples: (value: boolean) => void

  // Reset
  reset: () => void
}

const DEFAULT_SETTINGS = {
  selectedModel: 'qwen-qwq' as ModelId,
  theme: 'system' as const,
  promptLanguage: 'es' as PromptLanguage,
  responseStyle: 'detailed' as ResponseStyle,
  temperature: 0.7,
  maxTokens: 4096,
  autoCopy: true,
  showExamples: true,
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Estado inicial
      ...DEFAULT_SETTINGS,

      // Setters
      setSelectedModel: (model) => set({ selectedModel: model }),
      setTheme: (theme) => set({ theme }),
      setPromptLanguage: (language) => set({ promptLanguage: language }),
      setResponseStyle: (style) => set({ responseStyle: style }),
      setTemperature: (temp) => set({ temperature: Math.max(0, Math.min(2, temp)) }),
      setMaxTokens: (tokens) => set({ maxTokens: Math.max(256, Math.min(32768, tokens)) }),
      setAutoCopy: (value) => set({ autoCopy: value }),
      setShowExamples: (value) => set({ showExamples: value }),

      // Reset a valores por defecto
      reset: () => set(DEFAULT_SETTINGS),
    }),
    {
      name: 'top100-frameworks-settings',
      partialize: (state) => ({
        selectedModel: state.selectedModel,
        theme: state.theme,
        promptLanguage: state.promptLanguage,
        responseStyle: state.responseStyle,
        temperature: state.temperature,
        maxTokens: state.maxTokens,
        autoCopy: state.autoCopy,
        showExamples: state.showExamples,
      }),
    }
  )
)

// Selector hooks para mejor performance
export const useSelectedModel = () => useSettingsStore((s) => s.selectedModel)
export const useTheme = () => useSettingsStore((s) => s.theme)
export const usePromptLanguage = () => useSettingsStore((s) => s.promptLanguage)
export const useResponseStyle = () => useSettingsStore((s) => s.responseStyle)
