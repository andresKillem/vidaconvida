'use client'

import { useEffect, useState } from 'react'

export interface FeaturedEvent {
  id: string
  title: string
  tagline: string
  description: string
  highlights: string[]
  dateLabel: string
  timeLabel: string
  address: string
  mapsUrl: string
  flyerImage: string
  flyerPreviewImage: string
  flyerAlt: string
  verse: { text: string; reference: string }
  // ISO timestamp with Miami offset; the event is hidden in the browser after this moment
  endsAt: string
}

export const featuredEvent: FeaturedEvent = {
  id: 'octubrillante-2026',
  title: 'Octubrillante',
  tagline: 'Una pijamada con Jesús',
  description:
    'Una noche para toda la familia: comida, bebidas, juegos y un show de talentos familiar. ¡Trae a tus hijos, a tus amigos y ven en pijama!',
  highlights: ['Comida', 'Bebidas', 'Juegos', 'Show de talentos familiar'],
  dateLabel: 'Sábado 31 de octubre',
  timeLabel: '4:00 PM – 8:00 PM',
  address: '10200 NW 25th St, Suite 113M, Doral, FL 33172',
  mapsUrl: 'https://maps.google.com/?q=10200+NW+25+St,+Unit+113,+Doral,+FL+33172',
  flyerImage: '/images/octubrillante.jpg',
  flyerPreviewImage: '/images/octubrillante-sm.jpg',
  flyerAlt:
    'Invitación a Octubrillante, una pijamada con Jesús: comida, bebidas, juegos y show de talentos familiar. Sábado 31 de octubre, de 4:00 a 8:00 PM, en 10200 NW 25th Street, Suite 113M, Doral FL 33172. "Yo soy la luz del mundo" — Juan 8:12',
  verse: {
    text: 'Yo soy la luz del mundo; el que me sigue no andará en tinieblas, sino que tendrá la luz de la vida.',
    reference: 'Juan 8:12',
  },
  endsAt: '2026-10-31T20:00:00-04:00',
}

export function isEventActive(event: FeaturedEvent, now: number = Date.now()): boolean {
  return now < new Date(event.endsAt).getTime()
}

// The site is a static export, so the build-time check alone would keep an expired
// event visible until the next deploy; re-check in the browser after hydration.
export function useEventActive(event: FeaturedEvent): boolean {
  const [isActive, setIsActive] = useState(() => isEventActive(event))

  useEffect(() => {
    setIsActive(isEventActive(event))
  }, [event])

  return isActive
}
