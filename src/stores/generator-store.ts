/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file stores/generator-store.ts
 * @description Store Zustand para el generador de prompts
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

import { create } from 'zustand'
import type { Framework, FrameworkFormData } from '@/types'

interface GeneratorState {
  // Framework seleccionado
  selectedFramework: Framework | null
  setSelectedFramework: (framework: Framework | null) => void

  // Datos del formulario
  formData: FrameworkFormData
  setFormData: (data: FrameworkFormData) => void
  updateFormField: (fieldId: string, value: string) => void
  clearFormData: () => void

  // Objetivo adicional
  objective: string
  setObjective: (objective: string) => void

  // Prompt generado
  generatedPrompt: string | null
  setGeneratedPrompt: (prompt: string | null) => void

  // Estado de generación
  isGenerating: boolean
  setIsGenerating: (value: boolean) => void

  // Error
  error: string | null
  setError: (error: string | null) => void

  // Historial de prompts generados (últimos 10)
  history: Array<{
    id: string
    frameworkId: string
    prompt: string
    createdAt: string
  }>
  addToHistory: (frameworkId: string, prompt: string) => void
  clearHistory: () => void

  // Reset completo
  reset: () => void
}

const DEFAULT_STATE = {
  selectedFramework: null,
  formData: {},
  objective: '',
  generatedPrompt: null,
  isGenerating: false,
  error: null,
  history: [],
}

export const useGeneratorStore = create<GeneratorState>()((set, get) => ({
  // Estado inicial
  ...DEFAULT_STATE,

  // Framework
  setSelectedFramework: (framework) =>
    set({
      selectedFramework: framework,
      formData: {},
      generatedPrompt: null,
      error: null,
    }),

  // Formulario
  setFormData: (data) => set({ formData: data }),

  updateFormField: (fieldId, value) =>
    set((state) => ({
      formData: { ...state.formData, [fieldId]: value },
    })),

  clearFormData: () => set({ formData: {}, generatedPrompt: null }),

  // Objetivo
  setObjective: (objective) => set({ objective }),

  // Prompt generado
  setGeneratedPrompt: (prompt) => set({ generatedPrompt: prompt }),

  // Generación
  setIsGenerating: (value) => set({ isGenerating: value }),

  // Error
  setError: (error) => set({ error }),

  // Historial
  addToHistory: (frameworkId, prompt) =>
    set((state) => {
      const newEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        frameworkId,
        prompt,
        createdAt: new Date().toISOString(),
      }

      // Mantener solo los últimos 10
      const history = [newEntry, ...state.history].slice(0, 10)

      return { history }
    }),

  clearHistory: () => set({ history: [] }),

  // Reset
  reset: () => set(DEFAULT_STATE),
}))

// Selector para verificar si el formulario es válido
export const useIsFormValid = () =>
  useGeneratorStore((state) => {
    const { selectedFramework, formData } = state
    if (!selectedFramework) return false

    // Verificar que al menos los campos requeridos estén llenos
    const requiredFields = selectedFramework.components.filter((c) => c.required)
    return requiredFields.every(
      (field) => formData[field.id] && formData[field.id].trim().length > 0
    )
  })

// Selector para obtener campos llenos
export const useFilledFieldsCount = () =>
  useGeneratorStore((state) => {
    return Object.values(state.formData).filter((v) => v && v.trim().length > 0).length
  })
