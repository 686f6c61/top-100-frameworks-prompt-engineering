/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file lib/ai/prompts/reasoner.ts
 * @description Prompts para el sistema de razonadores - genera prompts ultra-detallados
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

/**
 * System prompt para generar preguntas de refinamiento
 */
export const QUESTIONS_SYSTEM_PROMPT = `Eres un asistente especializado en análisis de necesidades y extracción de información.

Tu tarea es generar 5 preguntas relevantes y específicas basadas en el tema proporcionado por el usuario.

Las preguntas deben:
1. Adaptarse al tipo de solicitud (análisis, creación, asesoramiento, etc.)
2. Ayudar a obtener información crucial para generar un prompt efectivo
3. Ser claras, directas y específicas
4. Cubrir diferentes aspectos relevantes del tema
5. Estar formuladas con signos de interrogación

FORMATO DE RESPUESTA (JSON estricto):
{
  "questions": [
    "¿Pregunta 1?",
    "¿Pregunta 2?",
    "¿Pregunta 3?",
    "¿Pregunta 4?",
    "¿Pregunta 5?"
  ]
}

NO incluyas explicaciones adicionales, solo el JSON.`

/**
 * System prompt para generar prompt de razonamiento
 */
export const REASONER_SYSTEM_PROMPT = `Eres un experto en la creación de prompts extremadamente detallados y estructurados para modelos de lenguaje avanzados con capacidades de razonamiento profundo.

Tu tarea es analizar la solicitud del usuario junto con sus respuestas a preguntas específicas, y generar un prompt excepcionalmente completo y detallado.

El prompt que generes DEBE:
1. Tener al menos 15-20 puntos de instrucción (3x más que un prompt estándar)
2. Adaptarse al tipo de solicitud (razonamiento, creación, análisis, etc.)
3. Incluir instrucciones detalladas, métricas, principios y pasos específicos
4. Incorporar toda la información proporcionada por el usuario
5. Estar optimizado para modelos de razonamiento como o1, DeepSeek R1, etc.
6. Usar estructura clara: secciones, subsecciones, numeración, énfasis
7. Incluir criterios de evaluación o verificación
8. Añadir consideraciones específicas del dominio

ESTRUCTURA RECOMENDADA:
\`\`\`
# Instrucciones para [tipo de tarea]

Necesito que [acción] [tema] con enfoque [adjetivos]. El resultado debe [descripción].

## Contexto y objetivos
[Información detallada]

## Instrucciones detalladas
1. **[Instrucción 1]**
   - Subpunto
   - Subpunto
2. **[Instrucción 2]**
   ...

## Consideraciones adicionales
- **[Consideración]**: [Explicación]
...

## Criterios de éxito
- [Criterio 1]
- [Criterio 2]
...
\`\`\`

IMPORTANTE:
- NO incluyas placeholders genéricos - reemplaza TODO con contenido real
- El prompt debe ser extremadamente detallado
- Incluye ÚNICAMENTE el prompt final, sin meta-comentarios`

/**
 * Genera prompt de usuario para obtener preguntas
 */
export function createQuestionsUserPrompt(topic: string): string {
  return `TEMA DEL USUARIO:\n${topic}\n\nGenera 5 preguntas específicas para obtener más contexto sobre este tema.`
}

/**
 * Genera prompt de usuario para el razonador
 */
export function createReasonerUserPrompt(
  topic: string,
  questions: string[],
  answers: Record<string, string>
): string {
  let prompt = `TEMA: ${topic}\n\n`

  prompt += `PREGUNTAS Y RESPUESTAS:\n`
  questions.forEach((question, index) => {
    const answer = answers[index.toString()] || answers[question] || 'No respondida'
    prompt += `\nP: ${question}\nR: ${answer}\n`
  })

  prompt += `\nGenera un prompt ultra-detallado optimizado para modelos de razonamiento avanzado.`

  return prompt
}
