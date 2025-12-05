/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file app/frameworks/page.tsx
 * @description Página principal de exploración de los 100 frameworks
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

import type { Metadata } from 'next'
import { Layers, Sparkles } from 'lucide-react'
import { FrameworkFilters, FrameworkGrid, SmartSearch, QuickSearch } from '@/components/frameworks'
import { getAllFrameworks, getCategoryCounts } from '@/lib/frameworks/data'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Frameworks',
  description: 'Explora nuestra coleccion de frameworks de prompt engineering',
}

export default function FrameworksPage() {
  const totalFrameworks = getAllFrameworks().length
  const categoryCounts = getCategoryCounts()
  const totalCategories = Object.keys(categoryCounts).length

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 via-background to-background border-b">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-60" />
        <div className="container py-10 md:py-12 relative">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <Layers className="h-4 w-4 text-primary" />
              </div>
              <Badge variant="secondary" className="px-2.5 py-0.5 text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                {totalFrameworks} frameworks
              </Badge>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Biblioteca de Frameworks
            </h1>

            <p className="text-muted-foreground">
              Explora nuestra coleccion curada de frameworks de prompt engineering.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section - Grid 2 columnas */}
      <section className="container py-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Buscador Inteligente */}
          <Card className="p-4 bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
            <SmartSearch />
          </Card>

          {/* Buscador Tradicional */}
          <Card className="p-4">
            <QuickSearch />
          </Card>
        </div>
      </section>

      {/* Filters and Grid */}
      <section className="container pb-8 space-y-6">
        <FrameworkFilters />
        <FrameworkGrid />
      </section>
    </div>
  )
}
