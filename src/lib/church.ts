// Single source for contact details shown across the site.
// The SEO structured data in src/app/layout.tsx repeats these values; keep both in sync.

export const churchInfo = {
  name: 'Vida con Vida Miami',
  motto: 'Respondemos bíblicamente a la vida',
  slogan: 'Formando discípulos, transformando generaciones',
  addressLines: ['10200 NW 25 St, Unit 113 Mezzanine', '3rd Floor, Doral, FL 33172'],
  mapsUrl: 'https://maps.google.com/?q=10200+NW+25+St,+Unit+113,+Doral,+FL+33172',
  mapsEmbedUrl: 'https://maps.google.com/maps?q=10200+NW+25+St,+Doral,+FL+33172&z=16&output=embed',
  phoneDisplay: '(561) 591-4771',
  phoneHref: 'tel:+15615914771',
  email: 'secretaria@vidaconvidamiami.com',
  serviceTimes: [
    { day: 'Domingo', time: '10:30 AM', label: 'Servicio dominical' },
    { day: 'Miércoles', time: '8:00 PM', label: 'Noche de oración vía Zoom' },
  ],
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61572900027929',
    instagram: 'https://www.instagram.com/vidaconvida',
    youtube: 'https://www.youtube.com/@VidaConVidaMiami',
  },
} as const

export const fullAddress = churchInfo.addressLines.join(', ')
