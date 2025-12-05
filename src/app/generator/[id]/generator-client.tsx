/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file app/generator/[id]/generator-client.tsx
 * @description Componente cliente del generador de prompts con IA
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

'use client'

import { useCallback, useEffect } from 'react'
import Link from 'next/link'
import { Sparkles, Layers, Clock, ChevronRight, CheckCircle2, Target, Code } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { FrameworkForm, PromptOutput, GenerateButton } from '@/components/generator'
import { useGeneratorStore, useSettingsStore } from '@/stores'
import { FRAMEWORK_CATEGORIES } from '@/lib/frameworks/data'
import type { Framework } from '@/types'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface GeneratorClientProps {
  framework: Framework
}

const categoryColors: Record<string, string> = {
  productivity: 'from-blue-500 to-cyan-500',
  marketing: 'from-purple-500 to-pink-500',
  development: 'from-emerald-500 to-teal-500',
  management: 'from-orange-500 to-amber-500',
  communication: 'from-cyan-500 to-blue-500',
  analysis: 'from-indigo-500 to-purple-500',
  transformation: 'from-pink-500 to-rose-500',
  learning: 'from-amber-500 to-yellow-500',
}

const complexityConfig = {
  simple: { label: 'Simple', time: '1-2 min' },
  medium: { label: 'Medio', time: '3-5 min' },
  advanced: { label: 'Avanzado', time: '5-10 min' },
}

export function GeneratorClient({ framework }: GeneratorClientProps) {
  const {
    setSelectedFramework,
    formData,
    setGeneratedPrompt,
    setIsGenerating,
    setError,
    addToHistory,
  } = useGeneratorStore()
  const { selectedModel, autoCopy } = useSettingsStore()

  useEffect(() => {
    setSelectedFramework(framework)
  }, [framework, setSelectedFramework])

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true)
    setError(null)
    setGeneratedPrompt(null)

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          frameworkId: framework.id,
          formData,
          model: selectedModel,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al generar el prompt')
      }

      setGeneratedPrompt(data.prompt)
      addToHistory(framework.id, data.prompt)

      if (autoCopy && data.prompt) {
        try {
          await navigator.clipboard.writeText(data.prompt)
          toast.success('Prompt generado y copiado al portapapeles')
        } catch {
          toast.success('Prompt generado correctamente')
        }
      } else {
        toast.success('Prompt generado correctamente')
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido'
      setError(message)
      toast.error(message)
    } finally {
      setIsGenerating(false)
    }
  }, [
    framework.id,
    formData,
    selectedModel,
    autoCopy,
    setIsGenerating,
    setError,
    setGeneratedPrompt,
    addToHistory,
  ])

  const categoryLabel = FRAMEWORK_CATEGORIES[framework.category]?.label || framework.category
  const hasAdditionalInfo = framework.exampleText || framework.purposeDescription || framework.advantages?.length > 0 || framework.useCases?.length > 0

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <section className="bg-gradient-to-b from-muted/50 to-background border-b">
        <div className="container py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/frameworks" className="hover:text-foreground transition-colors">
              Frameworks
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{framework.acronym}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Icon and Title */}
            <div className="flex items-start gap-4 flex-1">
              <div className={cn(
                'h-14 w-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0',
                categoryColors[framework.category]
              )}>
                {framework.acronym.slice(0, 2)}
              </div>

              <div className="space-y-2 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {framework.acronym}
                  </h1>
                  <Badge variant="outline" className="font-medium">
                    {categoryLabel}
                  </Badge>
                </div>

                <p className="text-muted-foreground">
                  {framework.fullName}
                </p>

                <p className="text-sm text-muted-foreground/80 max-w-2xl">
                  {framework.descriptionShort}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 md:gap-6 shrink-0">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-1">
                  <Layers className="h-4 w-4" />
                </div>
                <p className="text-2xl font-bold">{framework.components.length}</p>
                <p className="text-xs text-muted-foreground">componentes</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-1">
                  <Clock className="h-4 w-4" />
                </div>
                <p className="text-2xl font-bold">{complexityConfig[framework.complexity].time.split('-')[0]}</p>
                <p className="text-xs text-muted-foreground">min aprox.</p>
              </div>
            </div>
          </div>

          {/* Info del framework */}
          {hasAdditionalInfo && (
            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Ejemplo de uso */}
              {framework.exampleText && (
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Code className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">Ejemplo de uso</h3>
                  </div>
                  <pre className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                    {framework.exampleText}
                  </pre>
                </Card>
              )}

              {/* Casos de uso */}
              {framework.useCases?.length > 0 && (
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="h-4 w-4 text-amber-500" />
                    <h3 className="font-semibold text-sm">Ideal para</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {framework.useCases.map((useCase, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Ventajas */}
              {framework.advantages?.length > 0 && (
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <h3 className="font-semibold text-sm">Ventajas</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {framework.advantages.map((adv, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500 mt-0.5 shrink-0" />
                        {adv}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="container py-8 flex-1">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Completa los campos
              </h2>
              <Badge variant="secondary" className="text-xs">
                {complexityConfig[framework.complexity].label}
              </Badge>
            </div>

            <FrameworkForm framework={framework} />
            <GenerateButton onGenerate={handleGenerate} />
          </div>

          {/* Output */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
            <h2 className="text-lg font-semibold">
              Resultado
            </h2>
            <PromptOutput onRegenerate={handleGenerate} />
          </div>
        </div>
      </section>
    </div>
  )
}
