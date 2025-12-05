/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file config/site.ts
 * @description Configuración del sitio, metadata SEO y navegación
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

export const SITE_CONFIG = {
  name: 'Prompt Frameworks',
  description:
    'Top 100 Frameworks para Prompt Engineering. Sistema inteligente de recomendación y generación de prompts efectivos.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://top100frameworks.dev',
  ogImage: '/og-image.png',
  creator: '@686f6c61',
  keywords: [
    'prompt engineering',
    'AI prompts',
    'frameworks',
    'GPT',
    'LLM',
    'generador de prompts',
    'inteligencia artificial',
  ],
  links: {
    github: 'https://github.com/686f6c61/top-100-frameworks-prompt-engineering',
  },
  author: {
    name: '686f6c61',
    github: 'https://github.com/686f6c61',
  },
} as const

export type SiteConfig = typeof SITE_CONFIG

/**
 * Navegación principal
 */
export const NAV_ITEMS = [
  {
    label: 'Frameworks',
    href: '/frameworks',
    description: 'Explora los 100 frameworks disponibles',
  },
  {
    label: 'Ayuda',
    href: '/help',
    description: 'Documentación, guías y preguntas frecuentes',
  },
] as const

/**
 * Navegación del footer
 */
export const footerNav = {
  product: [
    { title: 'Top 100 Frameworks', href: '/frameworks' },
    { title: 'Configuración', href: '/settings' },
  ],
  resources: [
    { title: 'Ayuda', href: '/help' },
    { title: 'GitHub', href: 'https://github.com/686f6c61/top-100-frameworks-prompt-engineering' },
  ],
} as const
