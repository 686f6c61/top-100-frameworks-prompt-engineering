/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file components/layout/footer.tsx
 * @description Componente de pie de página
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

import Link from 'next/link'
import { Github, Heart, Sparkles } from 'lucide-react'
import { SITE_CONFIG } from '@/config/site'

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-8 md:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-semibold">{SITE_CONFIG.name}</p>
              <p className="text-xs text-muted-foreground">
                Prompt Engineering Frameworks
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/frameworks"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Top 100 Frameworks
            </Link>
            <Link
              href="/settings"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Configuración
            </Link>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <Link
              href={SITE_CONFIG.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              title="Ver en GitHub"
            >
              <Github className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}.
            Construido con Next.js y shadcn/ui.
          </p>
          <p className="flex items-center gap-1">
            Hecho con <Heart className="h-3 w-3 text-red-500 fill-red-500" /> por{' '}
            <Link
              href={SITE_CONFIG.author.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-foreground transition-colors"
            >
              {SITE_CONFIG.author.name}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
