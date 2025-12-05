/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file api/ai/generate/route.ts
 * @description API endpoint para generación de prompts con IA
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

import { NextResponse } from 'next/server'
import { z } from 'zod'
import { chat, OpenRouterAPIError } from '@/lib/ai/openrouter'
import { GENERATOR_SYSTEM_PROMPT, createGeneratorUserPrompt } from '@/lib/ai/prompts'
import { getFrameworkById } from '@/lib/frameworks/data'
import { checkRateLimit, getClientIP, RATE_LIMITS } from '@/lib/rate-limit'
import type { ModelId } from '@/config/models'
import type { FrameworkFormData } from '@/types'

// Schema de validación
const generateSchema = z.object({
  frameworkId: z.string().min(1, 'frameworkId es requerido').max(50),
  formData: z.record(z.string().max(100), z.string().max(5000)),
  objective: z.string().max(1000).optional(),
  model: z.string().max(50).optional(),
})

export async function POST(request: Request) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request)
    const rateLimitResult = checkRateLimit(`ai:generate:${clientIP}`, RATE_LIMITS.ai)

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
    const result = generateSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { frameworkId, formData, objective, model } = result.data

    // Verificar API key del servidor (nunca del cliente)
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key no configurada en el servidor' },
        { status: 503 }
      )
    }

    // Obtener framework
    const framework = getFrameworkById(frameworkId)
    if (!framework) {
      return NextResponse.json(
        { error: 'Framework no encontrado' },
        { status: 404 }
      )
    }

    // Generar prompt de usuario
    const userPrompt = createGeneratorUserPrompt(
      framework,
      formData as FrameworkFormData,
      objective
    )

    // Llamar a la API de OpenRouter
    const response = await chat(
      [
        { role: 'system', content: GENERATOR_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      {
        model: (model as ModelId) || 'qwen-qwq',
        temperature: 0.7,
        maxTokens: 4096,
      },
      apiKey
    )

    if (!response.content) {
      return NextResponse.json(
        { error: 'Error al generar el prompt' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      prompt: response.content,
      usage: response.usage,
      model: response.model,
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
