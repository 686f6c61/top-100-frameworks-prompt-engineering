/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file components/frameworks/framework-filters.tsx
 * @description Componente de filtros para búsqueda de frameworks
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

'use client'

import { X, SlidersHorizontal, Grid, List } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useFrameworksStore, useHasActiveFilters, useActiveFiltersCount } from '@/stores'
import { FRAMEWORK_CATEGORIES } from '@/lib/frameworks/data'
import type { FrameworkCategory, FrameworkComplexity, FrameworkSortBy } from '@/types'

const complexityOptions: Array<{ value: FrameworkComplexity; label: string }> = [
  { value: 'simple', label: 'Simple' },
  { value: 'medium', label: 'Medio' },
  { value: 'advanced', label: 'Avanzado' },
]

const sortOptions: Array<{ value: FrameworkSortBy; label: string }> = [
  { value: 'popularity', label: 'Popularidad' },
  { value: 'name', label: 'Nombre' },
  { value: 'complexity', label: 'Complejidad' },
  { value: 'recent', label: 'Recientes' },
]

export function FrameworkFilters() {
  const {
    categoryFilter,
    setCategoryFilter,
    complexityFilter,
    setComplexityFilter,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    resetFilters,
  } = useFrameworksStore()

  const hasFilters = useHasActiveFilters()
  const filterCount = useActiveFiltersCount()

  return (
    <div className="space-y-4">
      {/* Controles principales */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Categorías - Desktop */}
        <div className="hidden sm:flex flex-wrap gap-1.5">
          {(Object.entries(FRAMEWORK_CATEGORIES) as [FrameworkCategory, { label: string }][]).map(([key, value]) => (
            <Button
              key={key}
              variant={categoryFilter === key ? 'default' : 'outline'}
              size="sm"
              className="h-8 text-xs"
              onClick={() => setCategoryFilter(categoryFilter === key ? null : key)}
            >
              {value.label}
            </Button>
          ))}
        </div>

        {/* Separador */}
        <div className="hidden sm:block h-6 w-px bg-border" />

        {/* Complejidad - Desktop */}
        <div className="hidden sm:flex gap-1.5">
          {complexityOptions.map((option) => (
            <Button
              key={option.value}
              variant={complexityFilter === option.value ? 'default' : 'outline'}
              size="sm"
              className="h-8 text-xs"
              onClick={() =>
                setComplexityFilter(complexityFilter === option.value ? null : option.value)
              }
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* Espaciador */}
        <div className="flex-1" />

        {/* Ordenamiento */}
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as FrameworkSortBy)}>
          <SelectTrigger className="w-[140px] h-8 text-xs">
            <SelectValue placeholder="Ordenar" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-xs">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Vista */}
        <div className="flex gap-0.5 border rounded-md p-0.5">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-7 w-7"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-7 w-7"
            onClick={() => setViewMode('list')}
          >
            <List className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Filtros móvil */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="sm:hidden h-8">
              <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5" />
              Filtros
              {filterCount > 0 && (
                <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-[10px]">
                  {filterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription>
                Filtra por categoría y complejidad
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Categoría</h4>
                <div className="flex flex-wrap gap-2">
                  {(Object.entries(FRAMEWORK_CATEGORIES) as [FrameworkCategory, { label: string }][]).map(([key, value]) => (
                    <Button
                      key={key}
                      variant={categoryFilter === key ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCategoryFilter(categoryFilter === key ? null : key)}
                    >
                      {value.label}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Complejidad</h4>
                <div className="flex flex-wrap gap-2">
                  {complexityOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={complexityFilter === option.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() =>
                        setComplexityFilter(complexityFilter === option.value ? null : option.value)
                      }
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Filtros activos */}
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Activos:</span>
          {categoryFilter && (
            <Badge variant="secondary" className="gap-1 text-xs py-0.5">
              {FRAMEWORK_CATEGORIES[categoryFilter].label}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setCategoryFilter(null)}
              />
            </Badge>
          )}
          {complexityFilter && (
            <Badge variant="secondary" className="gap-1 text-xs py-0.5">
              {complexityOptions.find((o) => o.value === complexityFilter)?.label}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setComplexityFilter(null)}
              />
            </Badge>
          )}
          <Button variant="ghost" size="sm" className="h-6 text-xs px-2" onClick={resetFilters}>
            Limpiar
          </Button>
        </div>
      )}
    </div>
  )
}
