/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file api/ai/recommend/route.ts
 * @description API endpoint para recomendación inteligente de frameworks
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

import { NextResponse } from 'next/server'
import { z } from 'zod'
import { chat, OpenRouterAPIError } from '@/lib/ai/openrouter'
import {
  RECOMMENDER_SYSTEM_PROMPT,
  createRecommenderUserPrompt,
  createFrameworksList,
} from '@/lib/ai/prompts'
import { getAllFrameworks, getFrameworkById } from '@/lib/frameworks/data'
import { checkRateLimit, getClientIP, RATE_LIMITS } from '@/lib/rate-limit'
import type { ModelId } from '@/config/models'

// Schema de validación
const recommendSchema = z.object({
  objective: z.string().min(5, 'El objetivo debe tener al menos 5 caracteres').max(1000),
  context: z.string().max(500).optional(),
  model: z.string().max(50).optional(),
})

// Schema para validar respuesta de IA
const recommendationResponseSchema = z.object({
  frameworkId: z.string().regex(/^[a-z0-9-]+$/, 'ID de framework inválido'),
  reason: z.string().max(1000),
  confidence: z.number().min(0).max(1),
  alternatives: z.array(z.string().regex(/^[a-z0-9-]+$/)).max(5),
})

// Tipo para la respuesta de recomendación
interface RecommendationResponse {
  frameworkId: string
  reason: string
  confidence: number
  alternatives: string[]
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request)
    const rateLimitResult = checkRateLimit(`ai:recommend:${clientIP}`, RATE_LIMITS.ai)

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Intenta de nuevo más tarde.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
          },
        }
      )
    }

    // Parsear body
    const body = await request.json()
    const result = recommendSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { objective, context, model } = result.data

    // Verificar API key del servidor (nunca del cliente)
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key no configurada en el servidor' },
        { status: 503 }
      )
    }

    // Preparar lista de frameworks con categoría
    const frameworks = getAllFrameworks().map((f) => ({
      id: f.id,
      name: f.fullName,
      description: f.descriptionShort,
      useCases: f.useCases,
      category: f.category,
    }))

    const frameworksList = createFrameworksList(frameworks)
    const systemPrompt = RECOMMENDER_SYSTEM_PROMPT.replace(
      '{{FRAMEWORKS_LIST}}',
      frameworksList
    )

    const userPrompt = createRecommenderUserPrompt(objective, context)

    // Llamar a la API de OpenRouter
    const response = await chat(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      {
        model: (model as ModelId) || 'qwen-qwq',
        temperature: 0.3, // Más determinista para recomendaciones
        maxTokens: 1024,
      },
      apiKey
    )

    if (!response.content) {
      return NextResponse.json(
        { error: 'Error al obtener recomendación' },
        { status: 500 }
      )
    }

    // Parsear y validar respuesta JSON
    let recommendation: RecommendationResponse
    try {
      // Extraer JSON del contenido (puede venir con texto adicional)
      const jsonMatch = response.content.match(/\{[\s\S]*?\}/)
      if (!jsonMatch) {
        throw new Error('No se encontró JSON en la respuesta')
      }
      const parsed = JSON.parse(jsonMatch[0])

      // Validar estructura con Zod
      const validated = recommendationResponseSchema.safeParse(parsed)
      if (!validated.success) {
        throw new Error('Respuesta de IA con formato inválido')
      }
      recommendation = validated.data
    } catch {
      return NextResponse.json(
        { error: 'Error al procesar la recomendación' },
        { status: 500 }
      )
    }

    // Verificar que el framework recomendado existe
    const recommendedFramework = getFrameworkById(recommendation.frameworkId)
    if (!recommendedFramework) {
      return NextResponse.json(
        { error: 'Framework recomendado no encontrado' },
        { status: 500 }
      )
    }

    // Obtener frameworks alternativos
    const alternatives = recommendation.alternatives
      .map((id) => getFrameworkById(id))
      .filter(Boolean)
      .slice(0, 2)

    return NextResponse.json({
      recommendation: {
        framework: recommendedFramework,
        reason: recommendation.reason,
        confidence: recommendation.confidence,
      },
      alternatives,
      usage: response.usage,
    })
  } catch (error) {
    if (error instanceof OpenRouterAPIError) {
      return NextResponse.json(
        { error: 'Error al comunicarse con el servicio de IA' },
        { status: 502 }
      )
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
