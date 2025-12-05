/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file components/generator/generate-button.tsx
 * @description Botón para generar prompts con IA
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

'use client'

import { Loader2, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGeneratorStore, useIsFormValid, useSettingsStore } from '@/stores'

interface GenerateButtonProps {
  onGenerate: () => Promise<void>
}

export function GenerateButton({ onGenerate }: GenerateButtonProps) {
  const { isGenerating } = useGeneratorStore()
  const { selectedModel } = useSettingsStore()
  const isValid = useIsFormValid()

  return (
    <Button
      size="lg"
      className="w-full"
      disabled={!isValid || isGenerating}
      onClick={onGenerate}
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          Generando...
        </>
      ) : (
        <>
          <Wand2 className="h-5 w-5 mr-2" />
          Generar prompt
        </>
      )}
    </Button>
  )
}
