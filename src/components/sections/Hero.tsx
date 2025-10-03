'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Play, Heart, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { getNextSunday, formatTimeUntil } from '@/lib/utils'

const Hero = () => {
  const [timeUntilService, setTimeUntilService] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Beautiful hero background images - more subtle and church-focused
  const heroImages = [
    '/images/frontVida.jpg',
    '/images/508389914_18317686120230284_2398832695113211027_n.jpg',
    '/images/514512136_122143202714763334_5327026518122331566_n.jpg',
    '/images/515331624_122146811864763334_7375282397365992320_n.jpg',
  ]

  useEffect(() => {
    const updateCountdown = () => {
      const nextSunday = getNextSunday()
      setTimeUntilService(formatTimeUntil(nextSunday))
    }

    updateCountdown()
    const countdownInterval = setInterval(updateCountdown, 1000)

    return () => clearInterval(countdownInterval)
  }, [])

  // Background slideshow effect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 8000) // Change image every 8 seconds - slower for less intrusion

    return () => clearInterval(slideInterval)
  }, [heroImages.length])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Sophisticated Background Slideshow */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-2000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt="Vida con Vida Miami - Congregación adorando"
              fill
              className="object-cover scale-105"
              priority={index === 0}
              style={{
                filter: 'brightness(0.6) contrast(1.1) saturate(0.8)',
              }}
            />
          </div>
        ))}
        
        {/* Elegant Overlay - Much more subtle for church atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />
        
        {/* Additional Sophistication - Church colors with more opacity */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/50 via-transparent to-teal-900/50" />
        
        {/* Soft church lighting effect - more pronounced */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-teal-500/20" />
        
        {/* Additional overlay for less intrusive images */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Floating Shapes */}
      <div className="floating-shapes">
        <div className="shape" />
        <div className="shape" />
        <div className="shape" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white section-container animate-fade-in">
        {/* Logo Circle */}
        <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
          <img 
            src="/images/logoVida.jpg" 
            alt="Vida con Vida Miami Logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-montserrat uppercase tracking-wider mb-6 text-shadow">
          <span className="text-orange-500">¡Bienvenido!</span>
        </h1>

        {/* Service Information */}
        <p className="text-xl md:text-2xl mb-4 font-light">Servicios Domingos</p>
        <p className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">10:30 AM</p>
        <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Eres parte de esta familia - Domingo a domingo celebramos juntos
        </p>

        {/* Countdown Timer */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {[
            { label: 'Días', value: timeUntilService.days },
            { label: 'Horas', value: timeUntilService.hours },
            { label: 'Minutos', value: timeUntilService.minutes },
            { label: 'Segundos', value: timeUntilService.seconds },
          ].map((item) => (
            <div key={item.label} className="bg-white/10 border border-white/20 rounded-xl p-4 min-w-[90px] text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-500 font-montserrat">
                {item.value.toString().padStart(2, '0')}
              </div>
              <div className="text-sm uppercase tracking-wide opacity-90 mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <Button
            onClick={() => scrollToSection('contact')}
            variant="primary"
            size="lg"
            className="shadow-2xl"
          >
            <Heart className="w-5 h-5" />
            Soy Nuevo
          </Button>
          <Button
            onClick={() => window.open('https://www.youtube.com/@VidaConVidaMiami', '_blank')}
            variant="secondary"
            size="lg"
          >
            <Play className="w-5 h-5" />
            Ver En Vivo
          </Button>
        </div>

        {/* Address */}
        <div className="bg-white/10 border border-white/20 rounded-xl p-6 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-3 text-lg">
            <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <p className="text-center leading-relaxed">
              10200 NW 25 St, Unit 113<br />
              2nd Floor, Doral, FL 33172
            </p>
          </div>
        </div>
        
        {/* Elegant Slide Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white shadow-lg' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero