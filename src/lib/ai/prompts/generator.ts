/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file lib/ai/prompts/generator.ts
 * @description Prompts del sistema para generación de prompts estructurados
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

import type { Framework, FrameworkFormData } from '@/types'

/**
 * System prompt para generar prompts
 */
export const GENERATOR_SYSTEM_PROMPT = `Eres un experto en prompt engineering. Tu trabajo es transformar la información del usuario en un prompt claro y efectivo que pueda usar directamente con cualquier modelo de IA (ChatGPT, Claude, Gemini, etc).

OBJETIVO:
Crear un prompt que al usarlo, el modelo de IA entienda EXACTAMENTE qué se necesita y dé una respuesta útil a la primera, sin necesidad de múltiples iteraciones.

REGLAS CRÍTICAS:
1. El prompt generado debe ser DIRECTO y ACCIONABLE
2. NO uses formato markdown excesivo (evita headers ##, ---, etc)
3. NO incluyas meta-instrucciones como "Responde en formato X" a menos que sea necesario
4. El prompt debe leerse como una petición natural, no como un documento técnico
5. Integra la información del usuario de forma fluida, no como una lista de campos
6. Sé específico con el contexto pero conciso en la redacción

FORMATO DEL PROMPT GENERADO:
- Párrafos claros y directos
- Usa viñetas solo si ayudan a la claridad (listas de requisitos, pasos, etc)
- El prompt debe ser auto-contenido (toda la info necesaria está incluida)
- Longitud: lo suficiente para ser claro, lo mínimo para no ser redundante

EJEMPLO DE LO QUE NO HACER:
"""
# Título del Prompt
## Contexto
[texto]
## Objetivo
[texto]
---
**Instrucciones para la respuesta:**
1. Responde en formato markdown
2. Sé detallado
"""

EJEMPLO DE LO QUE SÍ HACER:
"""
Necesito crear un plan de marketing para una cafetería artesanal que acaba de abrir en el centro de Madrid.

El público objetivo son profesionales de 25-40 años que valoran el café de especialidad. El presupuesto es limitado (500€/mes) y queremos enfocarnos en redes sociales y eventos locales.

Incluye:
- 3 estrategias principales con acciones concretas
- Calendario de contenidos para el primer mes
- Métricas para medir el éxito
"""

Transforma los datos del usuario en un prompt con este estilo: natural, específico y listo para usar.`

/**
 * Genera el prompt de usuario para generación
 */
export function createGeneratorUserPrompt(
  framework: Framework,
  formData: FrameworkFormData,
  objective?: string
): string {
  // Extraer nombre limpio del framework (sin paréntesis con guiones)
  const frameworkName = framework.acronym

  let prompt = `El usuario quiere crear un prompt usando el framework ${frameworkName}.\n\n`

  prompt += `INFORMACIÓN PROPORCIONADA:\n`
  for (const component of framework.components) {
    const value = formData[component.id]
    if (value && value.trim()) {
      prompt += `• ${component.name}: ${value}\n`
    }
  }

  if (objective) {
    prompt += `\nOBJETIVO ESPECÍFICO: ${objective}\n`
  }

  prompt += `\nCrea un prompt natural y efectivo que integre toda esta información de forma fluida. El prompt debe estar listo para copiar y usar directamente con un modelo de IA.`

  return prompt
}

/**
 * Template para prompts simples sin IA
 * Útil cuando el usuario solo quiere formatear sin "mejorar"
 */
export function createSimplePrompt(
  framework: Framework,
  formData: FrameworkFormData
): string {
  const lines: string[] = []

  for (const component of framework.components) {
    const value = formData[component.id]
    if (value && value.trim()) {
      lines.push(`${component.name}: ${value}`)
    }
  }

  return lines.join('\n\n')
}
