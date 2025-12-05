/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file app/generator/[id]/page.tsx
 * @description Página del generador de prompts para un framework específico
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getFrameworkById, getAllFrameworks } from '@/lib/frameworks/data'
import { GeneratorClient } from './generator-client'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const frameworks = getAllFrameworks()
  return frameworks.map((framework) => ({
    id: framework.id,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const framework = getFrameworkById(id)

  if (!framework) {
    return {
      title: 'Framework no encontrado',
    }
  }

  return {
    title: `${framework.acronym} - Generador`,
    description: framework.descriptionShort,
  }
}

export default async function GeneratorFrameworkPage({ params }: PageProps) {
  const { id } = await params
  const framework = getFrameworkById(id)

  if (!framework) {
    notFound()
  }

  return <GeneratorClient framework={framework} />
}
