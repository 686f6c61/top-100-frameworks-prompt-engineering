/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file components/frameworks/quick-search.tsx
 * @description Búsqueda rápida por texto de frameworks
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

'use client'

import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useFrameworksStore } from '@/stores'

export function QuickSearch() {
  const { search, setSearch } = useFrameworksStore()

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium text-sm">Buscar por nombre</span>
      </div>

      {/* Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="SPIN, AIDA, SCAMPER..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
        {search && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
            onClick={() => setSearch('')}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Busca frameworks por acrónimo, nombre o descripción
      </p>
    </div>
  )
}
