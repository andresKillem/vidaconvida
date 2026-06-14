'use client'

import { CalendarDays, Clock, MapPin, Expand } from 'lucide-react'
import { featuredEvent, useEventActive } from '@/lib/events'

const FeaturedEvent = () => {
  const isActive = useEventActive(featuredEvent)

  if (!isActive) return null

  return (
    <section
      id="evento"
      aria-labelledby="evento-title"
      className="relative overflow-hidden bg-[#0f2a5c] py-20 text-white"
    >
      {/* Soft light behind the poster, echoing the event's "light of the world" theme */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/2 h-[42rem] w-[42rem] -translate-y-1/2 rounded-full bg-sky-400/20 blur-3xl"
      />

      <div className="section-container relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
            Próximo evento · Para toda la familia
          </p>
          <h2 id="evento-title" className="mb-3 font-montserrat text-5xl font-bold md:text-6xl">
            {featuredEvent.title}
          </h2>
          <p className="mb-6 text-2xl text-sky-100">{featuredEvent.tagline}</p>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-white/85">
            {featuredEvent.description}
          </p>

          <ul className="mb-8 flex flex-wrap gap-2" aria-label="Lo que habrá">
            {featuredEvent.highlights.map((highlight) => (
              <li
                key={highlight}
                className="rounded-full border border-white/25 px-4 py-1.5 text-sm text-white/90"
              >
                {highlight}
              </li>
            ))}
          </ul>

          <dl className="mb-10 space-y-3 text-white/90">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 flex-shrink-0 text-sky-300" aria-hidden="true" />
              <dt className="sr-only">Fecha</dt>
              <dd className="text-lg font-semibold">{featuredEvent.dateLabel}</dd>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 flex-shrink-0 text-sky-300" aria-hidden="true" />
              <dt className="sr-only">Hora</dt>
              <dd className="text-lg font-semibold">{featuredEvent.timeLabel}</dd>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-sky-300" aria-hidden="true" />
              <dt className="sr-only">Lugar</dt>
              <dd>
                <a
                  href={featuredEvent.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
                >
                  {featuredEvent.address}
                </a>
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-4">
            <a
              href={featuredEvent.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-[#0f2a5c] transition-colors hover:bg-sky-100"
            >
              <MapPin className="h-5 w-5" aria-hidden="true" />
              Cómo llegar
            </a>
            <a
              href={featuredEvent.flyerImage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Expand className="h-5 w-5" aria-hidden="true" />
              Ver invitación completa
            </a>
          </div>

          <blockquote className="mt-10 max-w-xl border-l-2 border-sky-300/60 pl-5 italic text-white/75">
            &ldquo;{featuredEvent.verse.text}&rdquo;
            <footer className="mt-2 not-italic text-sm text-sky-200">— {featuredEvent.verse.reference}</footer>
          </blockquote>
        </div>

        <a
          href={featuredEvent.flyerImage}
          target="_blank"
          rel="noopener noreferrer"
          className="group mx-auto block w-full max-w-md"
          aria-label="Abrir la invitación de Octubrillante en tamaño completo"
        >
          <img
            src={featuredEvent.flyerPreviewImage}
            alt={featuredEvent.flyerAlt}
            width={760}
            height={1140}
            loading="lazy"
            className="w-full rounded-2xl shadow-2xl ring-1 ring-white/20 transition-transform duration-500 group-hover:-rotate-1 group-hover:scale-[1.02] motion-reduce:transition-none"
          />
        </a>
      </div>
    </section>
  )
}

export default FeaturedEvent
