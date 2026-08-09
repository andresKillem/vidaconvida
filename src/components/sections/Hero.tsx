'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Play, MapPin, ArrowRight } from 'lucide-react'
import { capitalizeFirst, cn, getNextSunday } from '@/lib/utils'
import { churchInfo } from '@/lib/church'
import { YOUTUBE_CHANNEL_URL } from '@/lib/youtubeFeed'

const heroImages = [
  { src: '/images/hero-worship.jpg', alt: 'Congregación de Vida con Vida Miami adorando en el servicio dominical' },
  { src: '/images/hero-stage.jpg', alt: 'Equipo de alabanza frente a la cruz en el escenario de la iglesia' },
  { src: '/images/about-family.jpg', alt: 'Una familia adorando junta durante el servicio' },
]

const SLIDE_INTERVAL_MS = 9000

function formatNextService(date: Date): string {
  const isToday = date.toDateString() === new Date().toDateString()
  if (isToday) return 'Hoy'
  return capitalizeFirst(date.toLocaleDateString('es-US', { weekday: 'long', day: 'numeric', month: 'long' }))
}

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  // Rendered after hydration so the static HTML never shows a stale date
  const [nextServiceLabel, setNextServiceLabel] = useState<string | null>(null)

  useEffect(() => {
    setNextServiceLabel(formatNextService(getNextSunday()))
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const slideInterval = setInterval(() => {
      setCurrentImageIndex((index) => (index + 1) % heroImages.length)
    }, SLIDE_INTERVAL_MS)
    return () => clearInterval(slideInterval)
  }, [])

  return (
    <section id="hero" className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-cream">
      <div className="absolute inset-0" aria-hidden="true">
        {heroImages.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            priority={index === 0}
            className={cn(
              'object-cover transition-opacity duration-[2000ms] ease-out',
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            )}
          />
        ))}
        {/* One warm, directional scrim keeps text legible without flattening the photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />
      </div>

      <div className="section-container relative z-10 pb-16 pt-40 md:pb-24">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6 animate-rise text-gold">Iglesia cristiana · Doral, Miami</p>
          <h1 className="animate-rise text-5xl font-medium leading-[1.02] [animation-delay:120ms] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Eres parte de <em className="font-normal italic text-gold">esta familia</em>
          </h1>
          <p className="mt-7 max-w-xl animate-rise text-lg leading-relaxed text-cream/80 [animation-delay:240ms] md:text-xl">
            Una iglesia apasionada por Cristo, basada en la Biblia y abierta al mover del Espíritu Santo.
            Domingo a domingo celebramos juntos.
          </p>

          <div className="mt-10 flex animate-rise flex-wrap gap-3 [animation-delay:360ms]">
            <a href="#contact" className="btn-primary px-7 py-3.5">
              Planea tu visita
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="btn-outline-light px-7 py-3.5">
              <Play className="h-4 w-4" aria-hidden="true" />
              Ver en vivo
            </a>
          </div>
        </div>

        <div className="mt-14 grid animate-rise gap-6 border-t border-white/15 pt-8 [animation-delay:480ms] sm:grid-cols-[auto_1fr] sm:gap-14">
          <div>
            <p className="eyebrow mb-2 text-cream/55">Próximo servicio</p>
            <p className="font-display text-2xl">
              <span>{nextServiceLabel ?? 'Domingos'}</span>
              <span className="text-gold"> · 10:30 AM</span>
            </p>
          </div>
          <a
            href={churchInfo.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 text-cream/80 transition-colors hover:text-cream"
          >
            <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-gold" aria-hidden="true" />
            <span>
              <span className="eyebrow mb-2 block text-cream/55">Dónde estamos</span>
              {churchInfo.addressLines[0]}, {churchInfo.addressLines[1]}
            </span>
          </a>
        </div>

        <div className="mt-8 flex gap-2" role="group" aria-label="Fotos de la portada">
          {heroImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`Mostrar foto ${index + 1}`}
              aria-pressed={index === currentImageIndex}
              className={cn(
                'h-1 rounded-full transition-all duration-500',
                index === currentImageIndex ? 'w-10 bg-cream' : 'w-5 bg-cream/30 hover:bg-cream/60'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
