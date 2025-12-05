/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file components/generator/framework-form.tsx
 * @description Formulario dinámico para completar un framework
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

'use client'

import { useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { HelpCircle, Wand2 } from 'lucide-react'
import { useGeneratorStore, useSettingsStore } from '@/stores'
import type { Framework } from '@/types'

interface FrameworkFormProps {
  framework: Framework
}

export function FrameworkForm({ framework }: FrameworkFormProps) {
  const { formData, updateFormField } = useGeneratorStore()
  const { showExamples } = useSettingsStore()

  const handleFillExample = useCallback(() => {
    if (!framework.example?.filled) return

    for (const [key, value] of Object.entries(framework.example.filled)) {
      updateFormField(key, value)
    }
  }, [framework.example, updateFormField])

  const filledCount = framework.components.filter(
    (c) => formData[c.id]?.trim()
  ).length
  const totalRequired = framework.components.filter((c) => c.required).length
  const filledRequired = framework.components.filter(
    (c) => c.required && formData[c.id]?.trim()
  ).length

  return (
    <Card className="overflow-hidden">
      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{
            width: `${(filledCount / framework.components.length) * 100}%`,
          }}
        />
      </div>

      <CardContent className="p-6 space-y-6">
        {/* Header with example button */}
        {showExamples && framework.example?.filled && (
          <div className="flex items-center justify-between pb-4 border-b">
            <p className="text-sm text-muted-foreground">
              {filledRequired}/{totalRequired} campos requeridos
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFillExample}
                    className="gap-2"
                  >
                    <Wand2 className="h-4 w-4" />
                    Rellenar ejemplo
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Completa los campos con datos de ejemplo</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        {/* Form fields */}
        <div className="space-y-5">
          {framework.components.map((component, index) => {
            const isFilled = !!formData[component.id]?.trim()
            const isRequired = component.required

            return (
              <div key={component.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                      isFilled
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {index + 1}
                  </span>
                  <Label
                    htmlFor={component.id}
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    {component.name}
                    {isRequired && (
                      <span className="text-destructive">*</span>
                    )}
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">{component.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <Textarea
                  id={component.id}
                  placeholder={component.placeholder}
                  value={formData[component.id] || ''}
                  onChange={(e) => updateFormField(component.id, e.target.value)}
                  className={cn(
                    'min-h-[100px] resize-y transition-colors',
                    isRequired && !isFilled && 'border-orange-300/50 focus:border-orange-400',
                    isFilled && 'border-primary/30'
                  )}
                />

                {showExamples && framework.example?.filled?.[component.id] && (
                  <p className="text-xs text-muted-foreground pl-8">
                    <span className="font-medium">Ejemplo:</span>{' '}
                    <span className="italic">{framework.example.filled[component.id]}</span>
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
