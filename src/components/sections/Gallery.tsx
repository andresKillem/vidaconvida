'use client'

import { useEffect, useState } from 'react'
import { X, Play } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { YOUTUBE_CHANNEL_URL } from '@/lib/youtubeFeed'

interface GalleryItem {
  title: string
  caption: string
  image: string
  youtubeId: string
}

// Church photos, each paired with the YouTube video of that moment
const galleryItems: GalleryItem[] = [
  { title: 'Ven y sé parte de ella', caption: 'Te esperamos el próximo domingo', image: '/images/508389914_18317686120230284_2398832695113211027_n.jpg', youtubeId: 'Ov5phGiaKtU' },
  { title: '¡Celebramos a los padres su día!', caption: 'Momentos especiales en familia', image: '/images/508651136_18317686075230284_6588668133463852526_n.jpg', youtubeId: 'P4PlQBxOHfY' },
  { title: 'Adoración y alabanza', caption: 'Experimentamos la presencia de Dios', image: '/images/514512136_122143202714763334_5327026518122331566_n.jpg', youtubeId: 'yHIKN3Frz_Q' },
  { title: '¡Cuando el cielo marca la hora!', caption: 'Pastor Mauricio Ramírez', image: '/images/518363420_122146648802763334_8311388389080316128_n.jpg', youtubeId: '01nU2nxw8Ig' },
  { title: 'Papá, ¿dónde estás?', caption: 'Pastor Jhon Arévalo', image: '/images/522901346_122147144402763334_4934869960914086109_n.jpg', youtubeId: 'OpPESruSh7g' },
  { title: 'Superando el agobio', caption: 'Mensaje de esperanza y fortaleza', image: '/images/508679822_18317686093230284_4830059795066410769_n.jpg', youtubeId: 'N84lOSimzFY' },
  { title: 'Lucha por tu familia', caption: 'Mensaje sobre el valor de la familia', image: '/images/508712985_18317686111230284_3475606480792674855_n.jpg', youtubeId: 'BF1MYQ4UmkM' },
  { title: 'Servicio dominical', caption: 'Adoración y Palabra de Dios', image: '/images/515331624_122146811864763334_7375282397365992320_n.jpg', youtubeId: 'NogVvV81I1Y' },
  { title: 'Enseñanza bíblica', caption: 'Creciendo en la Palabra', image: '/images/520176153_122147144372763334_1673602458747975946_n.jpg', youtubeId: 'yg3JWv2UV5A' },
  { title: 'Ministerio de restauración', caption: 'Sanidad y liberación', image: '/images/508682158_18317686084230284_4491681199789920268_n.jpg', youtubeId: 'Ip6UrP9lKKw' },
]

const Gallery = () => {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null)

  useEffect(() => {
    if (!activeItem) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveItem(null)
    }
    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [activeItem])

  return (
    <section id="gallery" className="bg-cream py-24 md:py-32">
      <div className="section-container">
        <SectionHeading eyebrow="Nuestra familia" title="Momentos que compartimos juntos" />

        {/* Masonry columns keep each photo whole; many already carry their own title artwork */}
        <ul className="gap-5 sm:columns-2 lg:columns-3">
          {galleryItems.map((item) => (
            <li key={item.youtubeId} className="reveal mb-5 break-inside-avoid">
              <button
                type="button"
                onClick={() => setActiveItem(item)}
                className="group block w-full text-left"
                aria-label={`Ver video: ${item.title}`}
              >
                <span className="relative block overflow-hidden rounded-3xl bg-ink">
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className="w-full transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/20" />
                  <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream text-ink shadow-lg transition-transform group-hover:scale-110">
                    <Play className="ml-0.5 h-4 w-4 fill-current" aria-hidden="true" />
                  </span>
                </span>
                <span className="mt-3 block px-1">
                  <span className="block font-display text-lg text-ink">{item.title}</span>
                  <span className="block text-sm text-ink-muted">{item.caption}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="reveal mt-12 text-center text-ink-muted">
          ¿Quieres ver más? Visita nuestro{' '}
          <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="text-link">canal de YouTube</a>{' '}
          para sermones completos y testimonios.
        </p>
      </div>

      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
          onClick={() => setActiveItem(null)}
        >
          <div className="relative w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between gap-4 text-cream">
              <p className="font-display text-xl">{activeItem.title}</p>
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="rounded-full bg-white/10 p-2.5 transition-colors hover:bg-white/20"
                aria-label="Cerrar video"
                autoFocus
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeItem.youtubeId}?autoplay=1&rel=0`}
                title={activeItem.title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery
