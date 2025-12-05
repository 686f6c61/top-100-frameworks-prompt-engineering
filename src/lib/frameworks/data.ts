/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file lib/frameworks/data.ts
 * @description Carga, filtrado y gestión de los 100 frameworks
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

import type {
  Framework,
  FrameworkSummary,
  FrameworkFilters,
  FrameworkSortBy,
  SortOrder,
  FrameworkCategory,
} from '@/types'
import frameworksData from '@/data/frameworks/frameworks.json'

// ===========================================
// CACHE
// ===========================================

let frameworksCache: Framework[] | null = null
let frameworksMapCache: Map<string, Framework> | null = null

// ===========================================
// CARGA DE DATOS
// ===========================================

/**
 * Carga todos los frameworks
 */
export function getAllFrameworks(): Framework[] {
  if (frameworksCache) return frameworksCache

  frameworksCache = frameworksData as unknown as Framework[]
  return frameworksCache
}

/**
 * Obtiene el mapa de frameworks por ID
 */
function getFrameworksMap(): Map<string, Framework> {
  if (frameworksMapCache) return frameworksMapCache

  const frameworks = getAllFrameworks()
  frameworksMapCache = new Map(frameworks.map((f) => [f.id, f]))
  return frameworksMapCache
}

/**
 * Obtiene un framework por su ID
 */
export function getFrameworkById(id: string): Framework | undefined {
  return getFrameworksMap().get(id)
}

/**
 * Obtiene un framework o lanza error si no existe
 */
export function getFrameworkByIdOrThrow(id: string): Framework {
  const framework = getFrameworkById(id)
  if (!framework) {
    throw new Error(`Framework not found: ${id}`)
  }
  return framework
}

// ===========================================
// BÚSQUEDA Y FILTRADO
// ===========================================

/**
 * Filtra frameworks según criterios
 */
export function filterFrameworks(filters: FrameworkFilters): Framework[] {
  let frameworks = getAllFrameworks()

  // Filtro por búsqueda de texto
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    frameworks = frameworks.filter(
      (f) =>
        f.fullName.toLowerCase().includes(searchLower) ||
        f.acronym.toLowerCase().includes(searchLower) ||
        f.description.toLowerCase().includes(searchLower) ||
        f.tags.some((t) => t.toLowerCase().includes(searchLower))
    )
  }

  // Filtro por categoría
  if (filters.category) {
    frameworks = frameworks.filter((f) => f.category === filters.category)
  }

  // Filtro por complejidad
  if (filters.complexity) {
    frameworks = frameworks.filter((f) => f.complexity === filters.complexity)
  }

  // Filtro por tags
  if (filters.tags && filters.tags.length > 0) {
    frameworks = frameworks.filter((f) =>
      filters.tags!.some((tag) => f.tags.includes(tag))
    )
  }

  return frameworks
}

/**
 * Ordena frameworks
 */
export function sortFrameworks(
  frameworks: Framework[],
  sortBy: FrameworkSortBy = 'popularity',
  order: SortOrder = 'desc'
): Framework[] {
  const sorted = [...frameworks]

  sorted.sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case 'popularity':
        comparison = a.popularity - b.popularity
        break
      case 'name':
        comparison = a.fullName.localeCompare(b.fullName)
        break
      case 'complexity':
        const complexityOrder = { simple: 1, medium: 2, advanced: 3 }
        comparison = complexityOrder[a.complexity] - complexityOrder[b.complexity]
        break
      case 'recent':
        comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        break
    }

    return order === 'desc' ? -comparison : comparison
  })

  return sorted
}

// ===========================================
// CONVERSIONES
// ===========================================

/**
 * Convierte Framework a FrameworkSummary
 */
export function toSummary(framework: Framework): FrameworkSummary {
  return {
    id: framework.id,
    acronym: framework.acronym,
    fullName: framework.fullName,
    category: framework.category,
    descriptionShort: framework.descriptionShort,
    complexity: framework.complexity,
    popularity: framework.popularity,
    componentCount: framework.components.length,
  }
}

/**
 * Obtiene resúmenes de todos los frameworks
 */
export function getAllFrameworkSummaries(): FrameworkSummary[] {
  return getAllFrameworks().map(toSummary)
}

// ===========================================
// CATEGORÍAS
// ===========================================

/**
 * Categorías disponibles con metadatos
 */
export const FRAMEWORK_CATEGORIES: Record<
  FrameworkCategory,
  { label: string; description: string; icon: string }
> = {
  productivity: {
    label: 'Productividad',
    description: 'Gestión del tiempo y tareas',
    icon: 'zap',
  },
  marketing: {
    label: 'Marketing',
    description: 'Comunicación persuasiva y ventas',
    icon: 'megaphone',
  },
  development: {
    label: 'Desarrollo',
    description: 'Software y proyectos técnicos',
    icon: 'code',
  },
  management: {
    label: 'Gestión',
    description: 'Proyectos y equipos',
    icon: 'users',
  },
  communication: {
    label: 'Comunicación',
    description: 'Presentaciones y documentación',
    icon: 'message-square',
  },
  analysis: {
    label: 'Análisis',
    description: 'Toma de decisiones y evaluación',
    icon: 'bar-chart',
  },
  transformation: {
    label: 'Transformación',
    description: 'Cambio y mejora continua',
    icon: 'refresh-cw',
  },
  learning: {
    label: 'Aprendizaje',
    description: 'Desarrollo personal y formación',
    icon: 'book-open',
  },
}

/**
 * Obtiene frameworks por categoría
 */
export function getFrameworksByCategory(
  category: FrameworkCategory
): Framework[] {
  return getAllFrameworks().filter((f) => f.category === category)
}

/**
 * Obtiene conteo de frameworks por categoría
 */
export function getCategoryCounts(): Record<FrameworkCategory, number> {
  const frameworks = getAllFrameworks()
  const counts = {} as Record<FrameworkCategory, number>

  for (const category of Object.keys(FRAMEWORK_CATEGORIES) as FrameworkCategory[]) {
    counts[category] = frameworks.filter((f) => f.category === category).length
  }

  return counts
}

// ===========================================
// UTILIDADES
// ===========================================

/**
 * Obtiene todos los tags únicos
 */
export function getAllTags(): string[] {
  const tagsSet = new Set<string>()
  for (const framework of getAllFrameworks()) {
    for (const tag of framework.tags) {
      tagsSet.add(tag)
    }
  }
  return Array.from(tagsSet).sort()
}

/**
 * Obtiene frameworks populares
 */
export function getPopularFrameworks(limit = 10): Framework[] {
  return sortFrameworks(getAllFrameworks(), 'popularity', 'desc').slice(0, limit)
}

/**
 * Obtiene frameworks recomendados para una búsqueda
 */
export function getRecommendedFrameworks(objective: string): Framework[] {
  const objectiveLower = objective.toLowerCase()

  // Keywords por categoría
  const categoryKeywords: Record<FrameworkCategory, string[]> = {
    productivity: ['tarea', 'objetivo', 'meta', 'planificar', 'organizar'],
    marketing: ['vender', 'persuadir', 'marketing', 'campaña', 'cliente'],
    development: ['código', 'software', 'app', 'sistema', 'api', 'técnico'],
    management: ['proyecto', 'equipo', 'gestionar', 'liderar', 'recursos'],
    communication: ['presentar', 'comunicar', 'documentar', 'explicar'],
    analysis: ['analizar', 'evaluar', 'decidir', 'comparar', 'investigar'],
    transformation: ['cambiar', 'mejorar', 'transformar', 'modernizar', 'migrar'],
    learning: ['aprender', 'enseñar', 'formar', 'capacitar', 'estudiar'],
  }

  // Encontrar categorías relevantes
  const relevantCategories: FrameworkCategory[] = []
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((kw) => objectiveLower.includes(kw))) {
      relevantCategories.push(category as FrameworkCategory)
    }
  }

  // Si encontramos categorías, filtrar por ellas
  if (relevantCategories.length > 0) {
    const frameworks = getAllFrameworks().filter((f) =>
      relevantCategories.includes(f.category)
    )
    return sortFrameworks(frameworks, 'popularity', 'desc').slice(0, 5)
  }

  // Si no, devolver los más populares
  return getPopularFrameworks(5)
}
