'use client'

import { useEffect, useState } from 'react'
import { Play, ArrowUpRight, Radio, Facebook, Instagram } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { churchInfo } from '@/lib/church'
import { cn } from '@/lib/utils'
import {
  ChannelFeed,
  ServiceVideo,
  YOUTUBE_CHANNEL_URL,
  fallbackFeed,
  fetchChannelFeed,
  formatServiceDate,
} from '@/lib/youtubeFeed'

const youtubeApiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY ?? ''

const DynamicVideos = () => {
  const [feed, setFeed] = useState<ChannelFeed>(fallbackFeed)
  const [selectedService, setSelectedService] = useState<ServiceVideo>(fallbackFeed.services[0])
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!youtubeApiKey) return
    let isCancelled = false

    fetchChannelFeed(youtubeApiKey)
      .then((latestFeed) => {
        if (isCancelled) return
        setFeed(latestFeed)
        if (latestFeed.services[0]) setSelectedService(latestFeed.services[0])
      })
      .catch((error) => {
        // Keep showing the bundled snapshot
        console.warn('No se pudieron cargar los videos recientes de YouTube:', error)
      })

    return () => {
      isCancelled = true
    }
  }, [])

  const selectService = (service: ServiceVideo) => {
    setSelectedService(service)
    setIsPlaying(true)
  }

  return (
    <section id="videos" className="bg-sand py-24 md:py-32">
      <div className="section-container">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Mensajes recientes"
            title="Vuelve a ver el servicio del domingo"
            lead="Cada domingo transmitimos en vivo. Aquí siempre encontrarás lo más reciente del canal."
            className="md:mb-16"
          />
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-dark reveal mb-12 shrink-0 self-start md:mb-16 md:self-auto"
          >
            Canal de YouTube
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
          {/* Featured player */}
          <div className="reveal">
            <div className="relative aspect-video overflow-hidden rounded-3xl bg-ink">
              {isPlaying ? (
                <iframe
                  key={selectedService.youtubeId}
                  src={`https://www.youtube-nocookie.com/embed/${selectedService.youtubeId}?autoplay=1&rel=0`}
                  title={`${selectedService.title} — ${formatServiceDate(selectedService.startedAt)}`}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="group absolute inset-0 h-full w-full"
                  aria-label={`Reproducir ${selectedService.title} del ${formatServiceDate(selectedService.startedAt)}`}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${selectedService.youtubeId}/hqdefault.jpg`}
                    alt=""
                    className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                  <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-ink shadow-xl transition-transform group-hover:scale-105">
                    <Play className="ml-1 h-8 w-8 fill-current" aria-hidden="true" />
                  </span>
                </button>
              )}
            </div>
            <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="text-2xl font-medium text-ink">{selectedService.title}</h3>
              <p className="text-ink-muted">{formatServiceDate(selectedService.startedAt)}</p>
            </div>
          </div>

          {/* Previous services */}
          <div className="reveal">
            <h3 className="eyebrow mb-4 text-ink-muted">Servicios anteriores</h3>
            <ul className="space-y-3">
              {feed.services.map((service) => {
                const isSelected = service.youtubeId === selectedService.youtubeId
                return (
                  <li key={service.youtubeId}>
                    <button
                      type="button"
                      onClick={() => selectService(service)}
                      aria-current={isSelected ? 'true' : undefined}
                      className={cn(
                        'flex w-full items-center gap-4 rounded-2xl p-2.5 text-left transition-colors',
                        isSelected ? 'bg-cream shadow-sm' : 'hover:bg-cream/60'
                      )}
                    >
                      <img
                        src={`https://i.ytimg.com/vi/${service.youtubeId}/mqdefault.jpg`}
                        alt=""
                        loading="lazy"
                        className="aspect-video w-28 flex-shrink-0 rounded-xl object-cover"
                      />
                      <span className="min-w-0">
                        {service.isLive && (
                          <span className="mb-1 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-red-600">
                            <Radio className="h-3 w-3" aria-hidden="true" /> En vivo
                          </span>
                        )}
                        <span className="block font-semibold text-ink">{service.title}</span>
                        <span className="block text-sm text-ink-muted">{formatServiceDate(service.startedAt)}</span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Shorts */}
        {feed.shorts.length > 0 && (
          <div className="mt-20">
            <div className="reveal mb-6 flex items-end justify-between gap-4">
              <h3 className="text-3xl font-medium text-ink">Palabra en un minuto</h3>
              <a
                href={`${YOUTUBE_CHANNEL_URL}/shorts`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link shrink-0 text-sm"
              >
                Ver todos
              </a>
            </div>
            <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8">
              {feed.shorts.map((short) => (
                <li key={short.youtubeId} className="w-44 flex-shrink-0 snap-start md:w-52">
                  <a
                    href={`https://www.youtube.com/shorts/${short.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-ink">
                      <img
                        src={`https://i.ytimg.com/vi/${short.youtubeId}/hqdefault.jpg`}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                      <Play className="absolute right-3 top-3 h-5 w-5 fill-cream text-cream" aria-hidden="true" />
                      <p className="absolute inset-x-3 bottom-3 line-clamp-3 text-sm font-semibold leading-snug text-cream">
                        {short.title}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Facebook & Instagram */}
        <div className="reveal mt-20 flex flex-col items-start justify-between gap-8 rounded-[2rem] bg-ink p-8 text-cream md:flex-row md:items-center md:p-12">
          <div className="max-w-lg">
            <p className="eyebrow mb-4 text-gold">Síguenos</p>
            <h3 className="mb-3 text-3xl font-medium">Lo último de nuestra comunidad</h3>
            <p className="leading-relaxed text-cream/70">
              Anuncios, fotos de los servicios y transmisiones en vivo en nuestras redes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={churchInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="btn-outline-light">
              <Facebook className="h-4 w-4" aria-hidden="true" />
              Facebook
            </a>
            <a href={churchInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline-light">
              <Instagram className="h-4 w-4" aria-hidden="true" />
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DynamicVideos
