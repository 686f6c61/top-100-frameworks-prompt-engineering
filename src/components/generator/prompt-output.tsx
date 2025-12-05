/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file components/generator/prompt-output.tsx
 * @description Componente para mostrar y copiar el prompt generado
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

'use client'

import { useState } from 'react'
import { Copy, Check, Download, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useGeneratorStore, useSettingsStore } from '@/stores'

interface PromptOutputProps {
  onRegenerate?: () => void
}

export function PromptOutput({ onRegenerate }: PromptOutputProps) {
  const { generatedPrompt, isGenerating, error } = useGeneratorStore()
  const { autoCopy } = useSettingsStore()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!generatedPrompt) return

    try {
      await navigator.clipboard.writeText(generatedPrompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Error silencioso - el usuario verá que no se copió
    }
  }

  const handleDownload = () => {
    if (!generatedPrompt) return

    const blob = new Blob([generatedPrompt], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `prompt-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Estado de carga
  if (isGenerating) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Generando prompt...</CardTitle>
          <CardDescription>
            El modelo está procesando tu solicitud
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[95%]" />
          <Skeleton className="h-4 w-[85%]" />
          <Skeleton className="h-4 w-[80%]" />
        </CardContent>
      </Card>
    )
  }

  // Estado de error
  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-lg text-destructive">Error</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        {onRegenerate && (
          <CardFooter>
            <Button variant="outline" onClick={onRegenerate}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reintentar
            </Button>
          </CardFooter>
        )}
      </Card>
    )
  }

  // Sin prompt generado
  if (!generatedPrompt) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <Copy className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">
            Completa el formulario y genera tu prompt
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            El resultado aparecerá aquí
          </p>
        </CardContent>
      </Card>
    )
  }

  // Prompt generado
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-lg">Prompt generado</CardTitle>
            <CardDescription>
              {autoCopy ? 'Copiado automáticamente al portapapeles' : 'Listo para copiar'}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant={copied ? 'default' : 'outline'}
              size="sm"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copiar
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg overflow-auto max-h-[500px]">
            {generatedPrompt}
          </pre>
        </div>
      </CardContent>
      {onRegenerate && (
        <CardFooter>
          <Button variant="outline" onClick={onRegenerate} className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Regenerar
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
