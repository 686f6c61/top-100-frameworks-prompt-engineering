/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file components/frameworks/smart-search.tsx
 * @description Búsqueda inteligente de frameworks con IA
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

'use client'

import { useState, useCallback } from 'react'
import { Sparkles, Loader2, ArrowRight, X, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { Framework } from '@/types'

interface Recommendation {
  framework: Framework
  reason: string
  confidence: number
}

interface SmartSearchResult {
  recommendation: Recommendation
  alternatives: Framework[]
}

const exampleQueries = [
  'Campaña de marketing',
  'Negociar un aumento',
  'Retrospectiva de proyecto',
]

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

export function SmartSearch() {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [result, setResult] = useState<SmartSearchResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = useCallback(async () => {
    if (!query.trim() || query.length < 10) return

    setIsSearching(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ objective: query }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al buscar')
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setIsSearching(false)
    }
  }, [query])

  const handleClear = () => {
    setQuery('')
    setResult(null)
    setError(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && query.length >= 10) {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="font-medium text-sm">Buscador inteligente</span>
        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">IA</Badge>
      </div>

      {/* Input o Resultado */}
      {!result ? (
        <>
          <div className="relative">
            <Textarea
              placeholder="Describe que necesitas lograr..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[70px] resize-none text-sm"
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1.5 right-1.5 h-6 w-6"
                onClick={handleClear}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* Ejemplos */}
          <div className="flex flex-wrap gap-1">
            {exampleQueries.map((example, i) => (
              <button
                key={i}
                onClick={() => setQuery(example)}
                className="text-[11px] text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted px-2 py-0.5 rounded transition-colors"
              >
                {example}
              </button>
            ))}
          </div>

          {/* Botón */}
          <Button
            onClick={handleSearch}
            disabled={isSearching || query.length < 10}
            size="sm"
            className="w-full gap-2"
          >
            {isSearching ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Analizando 74 frameworks...
              </>
            ) : (
              <>
                <Zap className="h-3.5 w-3.5" />
                Encontrar el mejor framework
              </>
            )}
          </Button>

          {/* Error */}
          {error && (
            <p className="text-xs text-destructive">{error}</p>
          )}
        </>
      ) : (
        /* Resultado */
        <div className="space-y-3">
          {/* Framework principal */}
          <Link href={`/generator/${result.recommendation.framework.id}`}>
            <div className="p-3 rounded-lg border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer group">
              <div className="flex items-center gap-3">
                {/* Icono */}
                <div className={cn(
                  'h-10 w-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm shrink-0',
                  categoryColors[result.recommendation.framework.category] || 'from-gray-500 to-gray-600'
                )}>
                  {result.recommendation.framework.acronym.slice(0, 2)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold group-hover:text-primary transition-colors">
                      {result.recommendation.framework.acronym}
                    </span>
                    <Badge className="text-[10px] px-1.5 py-0 bg-primary/20 text-primary border-0">
                      {Math.round(result.recommendation.confidence * 100)}% match
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {result.recommendation.reason}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowRight className="h-4 w-4 text-primary shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Alternativas */}
          {result.alternatives.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-muted-foreground">O prueba:</span>
              {result.alternatives.map((alt) => (
                <Link key={alt.id} href={`/generator/${alt.id}`}>
                  <div className={cn(
                    'flex items-center gap-1.5 px-2 py-1 rounded-md border hover:border-primary/50 hover:bg-muted transition-all cursor-pointer group'
                  )}>
                    <div className={cn(
                      'h-5 w-5 rounded bg-gradient-to-br flex items-center justify-center text-white text-[10px] font-bold',
                      categoryColors[alt.category] || 'from-gray-500 to-gray-600'
                    )}>
                      {alt.acronym.slice(0, 1)}
                    </div>
                    <span className="text-xs font-medium group-hover:text-primary transition-colors">
                      {alt.acronym}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Buscar otro */}
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs h-7"
            onClick={handleClear}
          >
            Buscar otro
          </Button>
        </div>
      )}
    </div>
  )
}
