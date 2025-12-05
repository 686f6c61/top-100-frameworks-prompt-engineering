/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file components/layout/header.tsx
 * @description Componente de cabecera con navegación
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Settings, Menu } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SITE_CONFIG, NAV_ITEMS } from '@/config/site'
import { ThemeToggle } from '@/components/shared/theme-toggle'

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image src="/favicon.png" alt="Logo" width={36} height={36} className="group-hover:scale-110 transition-transform" />
          <div className="hidden sm:block">
            <span className="font-bold text-lg bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              {SITE_CONFIG.name}
            </span>
            <span className="hidden lg:inline text-xs text-muted-foreground ml-2">
              Top 100
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-muted/50 rounded-full px-1.5 py-1.5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200',
                pathname === item.href
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Link href="/settings" className="hidden sm:block">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Configuracion</span>
            </Button>
          </Link>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] pt-12">
              <div className="flex items-center gap-3 mb-8 px-2">
                <Image src="/favicon.png" alt="Logo" width={40} height={40} />
                <span className="font-bold text-lg">{SITE_CONFIG.name}</span>
              </div>

              <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                      pathname === item.href
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t my-4" />
                <Link
                  href="/settings"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Configuracion
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
