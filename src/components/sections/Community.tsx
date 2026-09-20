'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Images, Play, X } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { albums, photoFullSrc, photoThumbSrc, type Album } from '@/lib/albums'

type MediaItem =
  | { kind: 'video'; src: string; poster: string; title: string }
  | { kind: 'photo'; thumb: string; full: string; width: number; height: number; alt: string }

// Videos lead each album so they are not lost at the bottom of a long grid
function albumMediaItems(album: Album): MediaItem[] {
  const videos: MediaItem[] = album.videos.map((video) => ({ kind: 'video', ...video }))
  const photos: MediaItem[] = album.photos.map((photo, index) => ({
    kind: 'photo',
    thumb: photoThumbSrc(album.id, photo),
    full: photoFullSrc(album.id, photo),
    width: photo.width,
    height: photo.height,
    alt: `${album.photoAlt} (foto ${index + 1} de ${album.photos.length})`,
  }))
  return [...videos, ...photos]
}

const mediaByAlbum = new Map(albums.map((album) => [album.id, albumMediaItems(album)]))

function countLabel(album: Album): string {
  const parts = [`${album.photos.length} fotos`]
  if (album.videos.length === 1) parts.push('1 video')
  if (album.videos.length > 1) parts.push(`${album.videos.length} videos`)
  return parts.join(' · ')
}

interface LightboxState {
  albumId: string
  index: number
}

const SWIPE_THRESHOLD_PX = 50

const Community = () => {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)
  const touchStartX = useRef<number | null>(null)

  const activeAlbum = lightbox ? albums.find((album) => album.id === lightbox.albumId) ?? null : null
  const activeItems = lightbox ? mediaByAlbum.get(lightbox.albumId) ?? [] : []
  const activeItem = lightbox ? activeItems[lightbox.index] : null

  const close = useCallback(() => setLightbox(null), [])

  const step = useCallback((direction: 1 | -1) => {
    setLightbox((current) => {
      if (!current) return current
      const total = mediaByAlbum.get(current.albumId)?.length ?? 1
      return { ...current, index: (current.index + direction + total) % total }
    })
  }, [])

  useEffect(() => {
    if (!lightbox) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, close, step])

  // Preload the neighbouring full-size photos so stepping through an album feels instant
  useEffect(() => {
    if (!lightbox) return
    const items = mediaByAlbum.get(lightbox.albumId) ?? []
    ;[1, -1].forEach((offset) => {
      const neighbour = items[(lightbox.index + offset + items.length) % items.length]
      if (neighbour?.kind === 'photo') new window.Image().src = neighbour.full
    })
  }, [lightbox])

  return (
    <section id="comunidad" aria-labelledby="comunidad-title" className="bg-sand py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          id="comunidad-title"
          eyebrow="Vida en comunidad"
          title="Así vivimos la fe, juntos"
          lead="Domingos, hogares, calles de Doral y noches especiales. Recorre cada momento por tema."
        />
      </div>

      {/* Topic index stays reachable while scrolling through long albums */}
      <nav
        aria-label="Temas de la galería"
        className="sticky top-[76px] z-30 border-y border-ink/10 bg-sand/90 backdrop-blur-md"
      >
        <ul className="section-container flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {albums.map((album) => (
            <li key={album.id} className="shrink-0">
              <a
                href={`#album-${album.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-cream px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
              >
                {album.title}
                <span className="text-xs text-ink-muted">{album.photos.length + album.videos.length}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="section-container mt-16 space-y-24 md:space-y-32">
        {albums.map((album, albumIndex) => {
          const items = mediaByAlbum.get(album.id) ?? []
          return (
            <article key={album.id} id={`album-${album.id}`} aria-labelledby={`album-${album.id}-title`} className="scroll-mt-40">
              <header className="reveal mb-10 grid gap-6 border-t border-ink/15 pt-8 md:grid-cols-[auto_1fr_auto] md:items-end md:gap-12">
                <span aria-hidden="true" className="font-display text-6xl leading-none text-ember md:text-7xl">
                  {String(albumIndex + 1).padStart(2, '0')}
                </span>
                <div className="max-w-2xl">
                  <p className="eyebrow mb-3 text-ember-deep">{album.eyebrow}</p>
                  <h3 id={`album-${album.id}-title`} className="text-3xl font-medium leading-tight text-ink md:text-4xl">
                    {album.title}
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-ink-muted">{album.description}</p>
                </div>
                <p className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted">
                  <Images className="h-4 w-4" aria-hidden="true" />
                  {countLabel(album)}
                </p>
              </header>

              {/* Masonry keeps every photo at its natural ratio: nothing is cropped */}
              <ul className="gap-4 columns-2 md:columns-3 xl:columns-4">
                {items.map((item, index) => (
                  <li key={item.kind === 'photo' ? item.thumb : item.src} className="mb-4 break-inside-avoid">
                    <button
                      type="button"
                      onClick={() => setLightbox({ albumId: album.id, index })}
                      className="group relative block w-full overflow-hidden rounded-2xl bg-ink/10"
                      aria-label={item.kind === 'video' ? `Reproducir video: ${item.title}` : `Ampliar: ${item.alt}`}
                    >
                      {item.kind === 'photo' ? (
                        <img
                          src={item.thumb}
                          alt=""
                          width={item.width}
                          height={item.height}
                          loading="lazy"
                          decoding="async"
                          className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
                        />
                      ) : (
                        <>
                          <img
                            src={item.poster}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
                          />
                          <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream/95 text-ink shadow-xl transition-transform group-hover:scale-110">
                              <Play className="ml-1 h-5 w-5 fill-current" aria-hidden="true" />
                            </span>
                          </span>
                          <span className="eyebrow absolute bottom-3 left-4 text-cream">Video</span>
                        </>
                      )}
                      <span className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/10" />
                    </button>
                  </li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>

      {lightbox && activeAlbum && activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeAlbum.title}: ${lightbox.index + 1} de ${activeItems.length}`}
          className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-sm"
          onClick={close}
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return
            const deltaX = event.changedTouches[0].clientX - touchStartX.current
            touchStartX.current = null
            if (Math.abs(deltaX) > SWIPE_THRESHOLD_PX) step(deltaX < 0 ? 1 : -1)
          }}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-4 text-cream sm:px-6" onClick={(event) => event.stopPropagation()}>
            <div>
              <p className="font-display text-lg leading-tight sm:text-xl">{activeAlbum.title}</p>
              <p className="text-sm text-cream/60">
                {lightbox.index + 1} / {activeItems.length}
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              className="rounded-full bg-white/10 p-2.5 transition-colors hover:bg-white/20"
              aria-label="Cerrar galería"
              autoFocus
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-20">
            <div className="flex h-full w-full items-center justify-center" onClick={(event) => event.stopPropagation()}>
              {activeItem.kind === 'photo' ? (
                <img
                  key={activeItem.full}
                  src={activeItem.full}
                  alt={activeItem.alt}
                  width={activeItem.width}
                  height={activeItem.height}
                  className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
                />
              ) : (
                <video
                  key={activeItem.src}
                  src={activeItem.src}
                  poster={activeItem.poster}
                  controls
                  autoPlay
                  playsInline
                  preload="none"
                  className="max-h-full max-w-full rounded-xl bg-black shadow-2xl"
                />
              )}
            </div>

            {activeItems.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    step(-1)
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-cream transition-colors hover:bg-white/25 sm:left-5"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    step(1)
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-cream transition-colors hover:bg-white/25 sm:right-5"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default Community
