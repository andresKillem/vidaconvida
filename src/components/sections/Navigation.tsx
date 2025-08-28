'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Heart } from 'lucide-react'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  const navItems = [
    { id: 'hero', label: 'Inicio' },
    { id: 'about', label: 'Acerca' },
    { id: 'schedule', label: 'Servicios' },
    { id: 'ministries', label: 'Ministerios' },
    { id: 'gallery', label: 'Galería' },
    { id: 'contact', label: 'Contacto' },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-xl' : 'bg-gray-900/95 backdrop-blur-md'
    }`}>
      <div className="section-container flex justify-between items-center py-4">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => scrollToSection('hero')}
        >
          <img 
            src="/images/logoVida.jpg" 
            alt="Vida con Vida Miami Logo"
            className="w-12 h-12 rounded-full object-cover shadow-lg"
          />
          <div className="hidden sm:flex flex-col text-white">
            <span className="font-montserrat font-bold text-lg leading-tight">Vida con Vida</span>
            <span className="font-open-sans text-xs uppercase tracking-wider opacity-90">Miami</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-white hover:text-yellow-400 font-medium transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 hover:shadow-xl hover:bg-orange-600 transition-all duration-300 flex items-center gap-2"
          >
            <Heart className="w-4 h-4" />
            ¡Soy Nuevo!
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-white p-2"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-gray-900 border-t border-white/10 px-8 py-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="block w-full text-left text-white hover:text-yellow-400 py-3 transition-colors duration-300"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="w-full mt-4 bg-orange-500 text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-orange-600"
          >
            <Heart className="w-4 h-4" />
            ¡Soy Nuevo!
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation