/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file app/generator/page.tsx
 * @description Página de selección de framework para el generador
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getPopularFrameworks, FRAMEWORK_CATEGORIES } from '@/lib/frameworks/data'
import type { FrameworkCategory } from '@/types'

export const metadata: Metadata = {
  title: 'Generador',
  description: 'Selecciona un framework para generar tu prompt',
}

export default function GeneratorPage() {
  const popularFrameworks = getPopularFrameworks(8)

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Generador de Prompts</h1>
        <p className="text-muted-foreground mt-2">
          Selecciona un framework para comenzar a crear tu prompt estructurado
        </p>
      </div>

      {/* Frameworks populares */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Frameworks populares</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularFrameworks.map((framework) => (
            <Link key={framework.id} href={`/generator/${framework.id}`}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{framework.acronym}</CardTitle>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {framework.descriptionShort}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    <Badge variant="outline" className="text-xs">
                      {framework.components.length} componentes
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Por categoria */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Por categoria</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {(Object.entries(FRAMEWORK_CATEGORIES) as [FrameworkCategory, { label: string; description: string }][]).map(
            ([key, value]) => (
              <Link key={key} href={`/frameworks?category=${key}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{value.label}</CardTitle>
                    <CardDescription className="text-xs">
                      {value.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          )}
        </div>
      </section>
    </div>
  )
}
