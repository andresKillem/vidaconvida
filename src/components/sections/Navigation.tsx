'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import BrandLogo from '@/components/ui/BrandLogo'
import { cn } from '@/lib/utils'

const navItems = [
  { id: 'about', label: 'Nosotros' },
  { id: 'schedule', label: 'Servicios' },
  { id: 'ministries', label: 'Ministerios' },
  { id: 'comunidad', label: 'Comunidad' },
  { id: 'videos', label: 'Mensajes' },
  { id: 'gallery', label: 'Galería' },
  { id: 'contact', label: 'Contacto' },
]

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isSolid = isScrolled || isMobileMenuOpen

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Principal"
        className={cn(
          'transition-colors duration-300',
          isSolid ? 'bg-ink/95 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md' : 'bg-gradient-to-b from-ink/60 to-transparent'
        )}
      >
        <div className="section-container flex items-center justify-between py-3.5">
          <a href="#hero" className="flex items-center gap-3 text-cream" onClick={() => setIsMobileMenuOpen(false)}>
            <BrandLogo className="h-12 w-12" />
            <span className="font-display text-lg font-medium leading-none">
              Vida con Vida
              <span className="eyebrow mt-1 block text-[0.65rem] text-cream/60">Miami</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-[0.95rem] text-cream/80 transition-colors hover:text-cream"
              >
                {item.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary px-5 py-2.5 text-sm">
              Planea tu visita
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            className="-mr-2 p-2 text-cream lg:hidden"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div
          id="mobile-menu"
          hidden={!isMobileMenuOpen}
          className="border-t border-white/10 bg-ink lg:hidden"
        >
          <div className="section-container flex flex-col py-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="border-b border-white/5 py-3.5 font-display text-xl text-cream/90 last:border-0"
              >
                {item.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary mt-4">
              Planea tu visita
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navigation
