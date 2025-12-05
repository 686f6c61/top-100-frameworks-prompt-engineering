/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file app/layout.tsx
 * @description Layout principal de la aplicación Next.js
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { Header, Footer } from '@/components/layout'
import { Providers } from '@/components/providers'
import { SITE_CONFIG } from '@/config/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: 'Prompt Frameworks - Top 100 Frameworks para Prompt Engineering',
    template: '%s | Prompt Frameworks',
  },
  description: 'Top 100 Frameworks para Prompt Engineering. Sistema inteligente de recomendación y generación de prompts efectivos.',
  keywords: ['prompt engineering', 'frameworks', 'AI', 'prompts', 'productivity'],
  authors: [{ name: 'Prompt Frameworks' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SITE_CONFIG.url,
    title: 'Prompt Frameworks - Top 100 Frameworks para Prompt Engineering',
    description: 'Top 100 Frameworks para Prompt Engineering. Sistema inteligente de recomendación y generación de prompts efectivos.',
    siteName: 'Prompt Frameworks',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prompt Frameworks - Top 100 Frameworks para Prompt Engineering',
    description: 'Top 100 Frameworks para Prompt Engineering. Sistema inteligente de recomendación y generación de prompts efectivos.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  )
}
