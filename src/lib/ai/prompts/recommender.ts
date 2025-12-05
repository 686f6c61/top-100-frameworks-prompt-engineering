/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file lib/ai/prompts/recommender.ts
 * @description Prompts del sistema para recomendación inteligente de frameworks
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

/**
 * System prompt para recomendar frameworks
 */
export const RECOMMENDER_SYSTEM_PROMPT = `Eres un experto en frameworks de prompts. Analiza el objetivo y recomienda el MAS ESPECIFICO de la lista.

FRAMEWORKS:
{{FRAMEWORKS_LIST}}

REGLAS CRITICAS:
- NO recomiendes siempre AIDA, SPIN, SWOT - son muy genericos
- Busca frameworks ESPECIFICOS para el caso: si es negociacion usa BATNA, si es retrospectiva usa 4Ls, si es decision usa RAPID
- La razon debe ser UNA FRASE de maximo 15 palabras
- Alternativas deben ser de categorias DIFERENTES al principal

RESPUESTA (solo JSON):
{"frameworkId":"id","reason":"Frase corta de porque","confidence":0.85,"alternatives":["alt1","alt2"]}`

/**
 * Genera el prompt de usuario para recomendación
 */
export function createRecommenderUserPrompt(
  objective: string,
  context?: string
): string {
  let prompt = `OBJETIVO DEL USUARIO:\n${objective}`

  if (context) {
    prompt += `\n\nCONTEXTO ADICIONAL:\n${context}`
  }

  return prompt
}

/**
 * Genera la lista de frameworks para el system prompt
 */
export function createFrameworksList(
  frameworks: Array<{ id: string; name: string; description: string; useCases: string[]; category?: string }>
): string {
  return frameworks
    .map(
      (f) =>
        `[${f.id}] ${f.name} (${f.category || 'general'}) - ${f.useCases.slice(0, 2).join(', ')}`
    )
    .join('\n')
}
