/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file api/frameworks/route.ts
 * @description API endpoint para listar y filtrar frameworks
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

import { NextResponse } from 'next/server'
import { z } from 'zod'
import {
  getAllFrameworks,
  filterFrameworks,
  sortFrameworks,
  toSummary,
  getCategoryCounts,
  getAllTags,
} from '@/lib/frameworks/data'
import type { FrameworkFilters, FrameworkSortBy, SortOrder } from '@/types'

// Schema de validación para parámetros de consulta
const querySchema = z.object({
  search: z.string().max(100).optional(),
  category: z.enum(['development', 'management', 'communication', 'analysis', 'marketing', 'productivity', 'learning', 'transformation']).optional(),
  complexity: z.enum(['simple', 'medium', 'advanced']).optional(),
  tags: z.string().max(200).optional(),
  sortBy: z.enum(['popularity', 'name', 'complexity']).default('popularity'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  page: z.coerce.number().int().min(1).max(100).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  meta: z.enum(['true', 'false']).default('false'),
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Validar parámetros con Zod
  const params = querySchema.safeParse({
    search: searchParams.get('search') || undefined,
    category: searchParams.get('category') || undefined,
    complexity: searchParams.get('complexity') || undefined,
    tags: searchParams.get('tags') || undefined,
    sortBy: searchParams.get('sortBy') || undefined,
    sortOrder: searchParams.get('sortOrder') || undefined,
    page: searchParams.get('page') || undefined,
    limit: searchParams.get('limit') || undefined,
    meta: searchParams.get('meta') || undefined,
  })

  if (!params.success) {
    return NextResponse.json(
      { error: 'Parámetros inválidos' },
      { status: 400 }
    )
  }

  const { search, category, complexity, tags: tagsString, sortBy, sortOrder, page, limit, meta } = params.data
  const tags = tagsString?.split(',').filter(Boolean)
  const includeMeta = meta === 'true'

  try {
    // Filtrar
    const filtered = filterFrameworks({
      search,
      category,
      complexity,
      tags,
    })

    // Ordenar
    const sorted = sortFrameworks(filtered, sortBy, sortOrder)

    // Paginar
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginated = sorted.slice(startIndex, endIndex)

    // Convertir a summaries
    const frameworks = paginated.map(toSummary)

    // Respuesta
    const response: {
      frameworks: typeof frameworks
      pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
      }
      meta?: {
        categories: ReturnType<typeof getCategoryCounts>
        tags: string[]
      }
    } = {
      frameworks,
      pagination: {
        page,
        limit,
        total: sorted.length,
        totalPages: Math.ceil(sorted.length / limit),
      },
    }

    // Incluir metadatos si se solicitan
    if (includeMeta) {
      response.meta = {
        categories: getCategoryCounts(),
        tags: getAllTags(),
      }
    }

    return NextResponse.json(response)
  } catch {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
