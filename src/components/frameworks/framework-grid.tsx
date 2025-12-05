/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file components/frameworks/framework-grid.tsx
 * @description Grid de frameworks con filtrado y organización por categorías
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { FrameworkCard } from './framework-card'
import { useFrameworksStore } from '@/stores'
import { filterFrameworks, sortFrameworks, toSummary, FRAMEWORK_CATEGORIES, getFrameworksByCategory } from '@/lib/frameworks/data'
import type { FrameworkSummary, FrameworkCategory } from '@/types'
import { Badge } from '@/components/ui/badge'

interface FrameworkGridProps {
  frameworks?: FrameworkSummary[]
  className?: string
}

export function FrameworkGrid({ frameworks: initialFrameworks, className }: FrameworkGridProps) {
  const {
    search,
    categoryFilter,
    complexityFilter,
    tagsFilter,
    sortBy,
    sortOrder,
    viewMode,
  } = useFrameworksStore()

  // Determinar si hay filtros activos
  const hasActiveFilters = search || categoryFilter || complexityFilter || tagsFilter.length > 0

  // Filtrar y ordenar frameworks
  const frameworks = useMemo(() => {
    const filtered = filterFrameworks({
      search: search || undefined,
      category: categoryFilter || undefined,
      complexity: complexityFilter || undefined,
      tags: tagsFilter.length > 0 ? tagsFilter : undefined,
    })

    const sorted = sortFrameworks(filtered, sortBy, sortOrder)

    return sorted.map(toSummary)
  }, [search, categoryFilter, complexityFilter, tagsFilter, sortBy, sortOrder])

  // Agrupar por categoría cuando no hay filtros
  const frameworksByCategory = useMemo(() => {
    if (hasActiveFilters) return null

    const grouped: Record<FrameworkCategory, FrameworkSummary[]> = {} as Record<FrameworkCategory, FrameworkSummary[]>

    for (const category of Object.keys(FRAMEWORK_CATEGORIES) as FrameworkCategory[]) {
      const categoryFrameworks = getFrameworksByCategory(category)
      grouped[category] = sortFrameworks(categoryFrameworks, 'popularity', 'desc').map(toSummary)
    }

    return grouped
  }, [hasActiveFilters])

  if (frameworks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg font-medium text-muted-foreground">
          No se encontraron frameworks
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Intenta ajustar los filtros de búsqueda
        </p>
      </div>
    )
  }

  // Vista agrupada por categorías (sin filtros activos)
  if (frameworksByCategory) {
    let globalIndex = 0
    return (
      <div className="space-y-10">
        {(Object.entries(FRAMEWORK_CATEGORIES) as [FrameworkCategory, { label: string; description: string }][]).map(
          ([category, meta]) => {
            const categoryFrameworks = frameworksByCategory[category]
            if (categoryFrameworks.length === 0) return null

            const startIndex = globalIndex
            globalIndex += categoryFrameworks.length

            return (
              <div key={category} className="space-y-4">
                <div className="flex items-center gap-3 border-b pb-3">
                  <h2 className="text-xl font-bold">{meta.label}</h2>
                  <Badge variant="secondary" className="font-semibold">
                    {categoryFrameworks.length}
                  </Badge>
                  <span className="text-muted-foreground text-sm">{meta.description}</span>
                </div>
                <div
                  className={cn(
                    viewMode === 'grid'
                      ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                      : 'flex flex-col gap-3',
                    className
                  )}
                >
                  {categoryFrameworks.map((framework, idx) => (
                    <FrameworkCard
                      key={framework.id}
                      framework={framework}
                      compact={viewMode === 'list'}
                      index={startIndex + idx}
                    />
                  ))}
                </div>
              </div>
            )
          }
        )}
      </div>
    )
  }

  // Vista normal (con filtros activos)
  return (
    <div
      className={cn(
        viewMode === 'grid'
          ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : 'flex flex-col gap-3',
        className
      )}
    >
      {frameworks.map((framework, index) => (
        <FrameworkCard
          key={framework.id}
          framework={framework}
          compact={viewMode === 'list'}
          index={index}
        />
      ))}
    </div>
  )
}
