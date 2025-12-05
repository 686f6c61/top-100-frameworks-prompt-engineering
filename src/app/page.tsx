/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file app/page.tsx
 * @description Página principal - Redirección a /frameworks
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

import { redirect } from 'next/navigation'

export default function HomePage() {
  redirect('/frameworks')
}
