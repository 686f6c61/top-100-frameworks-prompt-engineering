/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file types/framework.ts
 * @description Tipos TypeScript para el sistema de frameworks de prompt engineering
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

/**
 * Categorías disponibles para clasificar frameworks
 */
export type FrameworkCategory =
  | 'productivity' // Productividad y gestión del tiempo
  | 'marketing' // Marketing y comunicación persuasiva
  | 'development' // Desarrollo de software y técnico
  | 'management' // Gestión de proyectos y equipos
  | 'communication' // Comunicación y presentaciones
  | 'analysis' // Análisis y toma de decisiones
  | 'transformation' // Cambio y transformación
  | 'learning' // Aprendizaje y desarrollo personal

/**
 * Componente individual de un framework
 */
export interface FrameworkComponent {
  /** Identificador único del componente (ej: "role", "task") */
  id: string
  /** Nombre en español */
  name: string
  /** Nombre en inglés */
  nameEn: string
  /** Descripción de qué debe contener este componente */
  description: string
  /** Texto placeholder para el input */
  placeholder: string
  /** Si es obligatorio rellenar */
  required: boolean
}

/**
 * Ejemplo de uso de un framework
 */
export interface FrameworkExample {
  /** Contexto o descripción del ejemplo */
  context: string
  /** Valores de ejemplo para cada componente */
  filled: Record<string, string>
}

/**
 * Nivel de complejidad del framework
 */
export type FrameworkComplexity = 'simple' | 'medium' | 'advanced'

/**
 * Definición completa de un framework
 */
export interface Framework {
  /** Identificador único (slug) - ej: "rtf", "smart" */
  id: string
  /** Acrónimo del framework - ej: "RTF", "SMART" */
  acronym: string
  /** Nombre completo - ej: "Rol-Tarea-Formato" */
  fullName: string
  /** Nombre completo en inglés */
  fullNameEn: string
  /** Categoría principal */
  category: FrameworkCategory
  /** Descripción detallada del framework */
  description: string
  /** Descripción corta para cards (max 100 chars) */
  descriptionShort: string
  /** Descripción del propósito (más detallada) */
  purposeDescription?: string
  /** Lista de componentes del framework */
  components: FrameworkComponent[]
  /** Ejemplo de uso con valores para cada componente */
  example: FrameworkExample
  /** Ejemplo de uso en texto (del archivo .txt) */
  exampleText?: string
  /** Casos de uso recomendados */
  useCases: string[]
  /** Ventajas del framework */
  advantages: string[]
  /** Tags para búsqueda */
  tags: string[]
  /** Nivel de complejidad */
  complexity: FrameworkComplexity
  /** Popularidad (para ordenar, 0-100) */
  popularity: number
  /** Fecha de creación */
  createdAt: string
  /** Fecha de última actualización */
  updatedAt: string
}

/**
 * Framework simplificado para listados
 */
export interface FrameworkSummary {
  id: string
  acronym: string
  fullName: string
  category: FrameworkCategory
  descriptionShort: string
  complexity: FrameworkComplexity
  popularity: number
  componentCount: number
}

/**
 * Datos del formulario para generar un prompt
 */
export type FrameworkFormData = Record<string, string>

/**
 * Input para el generador de prompts
 */
export interface GeneratorInput {
  frameworkId: string
  formData: FrameworkFormData
  objective?: string
  customInstructions?: string
}

/**
 * Output del generador de prompts
 */
export interface GeneratorOutput {
  prompt: string
  rawPrompt: string
  framework: string
  tokenCount: number
  model: string
}

/**
 * Resultado de la recomendación de framework
 */
export interface FrameworkRecommendation {
  frameworkId: string
  framework: Framework
  reason: string
  confidence: number // 0-1
  alternativeIds: string[]
}

/**
 * Filtros para búsqueda de frameworks
 */
export interface FrameworkFilters {
  search?: string
  category?: FrameworkCategory
  complexity?: FrameworkComplexity
  tags?: string[]
}

/**
 * Opciones de ordenación
 */
export type FrameworkSortBy = 'popularity' | 'name' | 'complexity' | 'recent'
export type SortOrder = 'asc' | 'desc'
