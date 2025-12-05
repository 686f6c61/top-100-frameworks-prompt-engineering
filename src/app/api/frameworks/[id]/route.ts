/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file api/frameworks/[id]/route.ts
 * @description API endpoint para obtener un framework por ID
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

import { NextResponse } from 'next/server'
import { getFrameworkById } from '@/lib/frameworks/data'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params

  try {
    const framework = getFrameworkById(id)

    if (!framework) {
      return NextResponse.json(
        { error: 'Framework no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ framework })
  } catch {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
