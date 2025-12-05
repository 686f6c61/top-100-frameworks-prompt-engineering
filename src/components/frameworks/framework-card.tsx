/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file components/frameworks/framework-card.tsx
 * @description Componente de tarjeta para mostrar un framework
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

'use client'

import Link from 'next/link'
import { Heart, ArrowRight, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useFrameworksStore } from '@/stores'
import { FRAMEWORK_CATEGORIES } from '@/lib/frameworks/data'
import type { FrameworkSummary } from '@/types'

interface FrameworkCardProps {
  framework: FrameworkSummary
  compact?: boolean
  index?: number
}

const complexityConfig = {
  simple: {
    label: 'Simple',
    color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  },
  medium: {
    label: 'Medio',
    color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  },
  advanced: {
    label: 'Avanzado',
    color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  },
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

export function FrameworkCard({ framework, compact = false, index }: FrameworkCardProps) {
  const { isFavorite, toggleFavorite } = useFrameworksStore()
  const favorite = isFavorite(framework.id)
  const categoryLabel = FRAMEWORK_CATEGORIES[framework.category]?.label || framework.category

  if (compact) {
    return (
      <Link href={`/generator/${framework.id}`}>
        <Card className="p-4 hover:shadow-md hover:border-primary/30 transition-all group cursor-pointer">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className={cn(
                'h-10 w-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm shrink-0',
                categoryColors[framework.category]
              )}>
                {index !== undefined ? index + 1 : framework.acronym.slice(0, 2)}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                  {framework.acronym}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {framework.fullName}
                </p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>
        </Card>
      </Link>
    )
  }

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300">
      {/* Gradient accent */}
      <div className={cn(
        'absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity',
        categoryColors[framework.category]
      )} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className={cn(
            'h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold shadow-lg',
            categoryColors[framework.category]
          )}>
            {index !== undefined ? index + 1 : framework.acronym.slice(0, 2)}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full shrink-0 -mr-2 -mt-1"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              toggleFavorite(framework.id)
            }}
          >
            <Heart
              className={cn(
                'h-4 w-4 transition-all',
                favorite
                  ? 'fill-red-500 text-red-500 scale-110'
                  : 'text-muted-foreground hover:text-red-400'
              )}
            />
          </Button>
        </div>

        {/* Title and Description */}
        <div className="space-y-2 mb-4">
          <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
            {framework.acronym}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {framework.fullName}
          </p>
          <p className="text-sm text-muted-foreground/80 line-clamp-2 min-h-[2.5rem]">
            {framework.descriptionShort}
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <Badge variant="outline" className="text-xs font-medium">
            {categoryLabel}
          </Badge>
          <Badge
            variant="outline"
            className={cn('text-xs font-medium', complexityConfig[framework.complexity].color)}
          >
            {complexityConfig[framework.complexity].label}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            <Layers className="h-3 w-3 mr-1" />
            {framework.componentCount}
          </Badge>
        </div>

        {/* Action */}
        <Link href={`/generator/${framework.id}`} className="block">
          <Button
            variant="outline"
            className="w-full group-hover:border-primary/50 group-hover:bg-primary/10 transition-all"
          >
            Usar framework
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </Link>
      </div>
    </Card>
  )
}
