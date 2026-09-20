export interface AlbumPhoto {
  id: string
  width: number
  height: number
}

export interface AlbumVideo {
  src: string
  poster: string
  title: string
}

export interface Album {
  id: string
  title: string
  eyebrow: string
  description: string
  photoAlt: string
  photos: AlbumPhoto[]
  videos: AlbumVideo[]
}

const PHOTO_BASE = '/images/comunidad'

export function photoThumbSrc(albumId: string, photo: AlbumPhoto): string {
  return `${PHOTO_BASE}/${albumId}/${photo.id}-thumb.webp`
}

export function photoFullSrc(albumId: string, photo: AlbumPhoto): string {
  return `${PHOTO_BASE}/${albumId}/${photo.id}-full.webp`
}

// Generated from the photo/video exports; width/height are the full-size file's pixels
const albumMedia: Record<string, AlbumPhoto[]> = {
  servicios: [
    { id: 'servicios-01', width: 1800, height: 1800 },
    { id: 'servicios-02', width: 1800, height: 1350 },
    { id: 'servicios-03', width: 1350, height: 1800 },
    { id: 'servicios-04', width: 1350, height: 1800 },
    { id: 'servicios-05', width: 1350, height: 1800 },
    { id: 'servicios-06', width: 1350, height: 1800 },
    { id: 'servicios-07', width: 1350, height: 1800 },
    { id: 'servicios-08', width: 1350, height: 1800 },
    { id: 'servicios-09', width: 1350, height: 1800 },
    { id: 'servicios-10', width: 1650, height: 1800 },
    { id: 'servicios-11', width: 1350, height: 1800 },
    { id: 'servicios-12', width: 1350, height: 1800 },
    { id: 'servicios-13', width: 1350, height: 1800 },
    { id: 'servicios-14', width: 1350, height: 1800 },
    { id: 'servicios-15', width: 1800, height: 1012 },
    { id: 'servicios-16', width: 1350, height: 1800 },
    { id: 'servicios-17', width: 1350, height: 1800 },
    { id: 'servicios-18', width: 1350, height: 1800 },
  ],
  grupos: [
    { id: 'grupos-01', width: 1800, height: 1350 },
    { id: 'grupos-02', width: 1800, height: 1013 },
    { id: 'grupos-03', width: 1800, height: 1350 },
    { id: 'grupos-04', width: 1350, height: 1800 },
    { id: 'grupos-05', width: 1350, height: 1800 },
    { id: 'grupos-06', width: 1350, height: 1800 },
    { id: 'grupos-07', width: 1800, height: 1350 },
    { id: 'grupos-08', width: 1800, height: 1524 },
  ],
  preteens: [
    { id: 'preteens-01', width: 1800, height: 1350 },
    { id: 'preteens-02', width: 1350, height: 1800 },
    { id: 'preteens-03', width: 831, height: 1800 },
    { id: 'preteens-04', width: 831, height: 1800 },
    { id: 'preteens-05', width: 1800, height: 1350 },
    { id: 'preteens-06', width: 1800, height: 1008 },
    { id: 'preteens-07', width: 1800, height: 1350 },
  ],
  feria: [
    { id: 'feria-01', width: 1350, height: 1800 },
    { id: 'feria-02', width: 1800, height: 1350 },
    { id: 'feria-03', width: 1800, height: 1350 },
    { id: 'feria-04', width: 1800, height: 1350 },
    { id: 'feria-05', width: 1350, height: 1800 },
    { id: 'feria-06', width: 1800, height: 1013 },
    { id: 'feria-07', width: 1350, height: 1800 },
    { id: 'feria-08', width: 1350, height: 1800 },
  ],
  ancianato: [
    { id: 'ancianato-01', width: 1800, height: 831 },
    { id: 'ancianato-02', width: 1800, height: 831 },
    { id: 'ancianato-03', width: 1800, height: 831 },
    { id: 'ancianato-04', width: 831, height: 1800 },
    { id: 'ancianato-05', width: 1800, height: 831 },
    { id: 'ancianato-06', width: 1800, height: 1013 },
    { id: 'ancianato-07', width: 1800, height: 1350 },
    { id: 'ancianato-08', width: 1800, height: 1350 },
    { id: 'ancianato-09', width: 1350, height: 1800 },
    { id: 'ancianato-10', width: 1800, height: 1014 },
  ],
  pijamada: [
    { id: 'pijamada-01', width: 1800, height: 1013 },
    { id: 'pijamada-02', width: 1800, height: 1013 },
    { id: 'pijamada-03', width: 1800, height: 1350 },
    { id: 'pijamada-04', width: 1800, height: 1350 },
  ],
}

// Order here is the order the albums appear on the page
export const albums: Album[] = [
  {
    id: 'servicios',
    title: 'Servicios dominicales',
    eyebrow: 'Cada domingo',
    description: 'Adoración, Palabra y abrazos de familia. Así se viven nuestros domingos en Doral.',
    photoAlt: 'Servicio dominical en Iglesia Vida con Vida Miami',
    photos: albumMedia.servicios,
    videos: [],
  },
  {
    id: 'grupos',
    title: 'Grupos de edificación',
    eyebrow: 'Entre semana, en casa',
    description: 'Hogares abiertos donde estudiamos la Biblia, oramos unos por otros y crecemos como amigos.',
    photoAlt: 'Grupo de edificación de Vida con Vida reunido en un hogar',
    photos: albumMedia.grupos,
    videos: [],
  },
  {
    id: 'preteens',
    title: 'Preteens',
    eyebrow: 'Nuestra próxima generación',
    description: 'Un espacio para que los preadolescentes conozcan a Jesús, hagan amigos y se diviertan.',
    photoAlt: 'Reunión de preteens de Vida con Vida',
    photos: albumMedia.preteens,
    videos: [],
  },
  {
    id: 'feria',
    title: 'Feria comunitaria',
    eyebrow: 'Sirviendo a Doral',
    description: 'Voluntarios entregando alimentos y artículos a familias de nuestra comunidad.',
    photoAlt: 'Voluntarios de Vida con Vida en la feria comunitaria',
    photos: albumMedia.feria,
    videos: [],
  },
  {
    id: 'ancianato',
    title: 'Visita al ancianato',
    eyebrow: 'Amor que se comparte',
    description: 'Llevamos alegría, regalos y canciones a nuestros abuelos en un hogar de ancianos.',
    photoAlt: 'Visita de Vida con Vida a un hogar de ancianos',
    photos: albumMedia.ancianato,
    videos: [
      { src: '/videos/ancianato-video.mp4', poster: '/videos/ancianato-video-poster.webp', title: 'Visita al ancianato' },
    ],
  },
  {
    id: 'pijamada',
    title: 'Pijamada con Jesús',
    eyebrow: 'Noche en familia',
    description: 'Una noche en pijama para toda la familia: juegos, globos, show de talentos y mucha luz.',
    photoAlt: 'Familias en pijama durante la Pijamada con Jesús',
    photos: albumMedia.pijamada,
    videos: [
      { src: '/videos/pijamada-video-01.mp4', poster: '/videos/pijamada-video-01-poster.webp', title: 'Pijamada con Jesús' },
      { src: '/videos/pijamada-video-02.mp4', poster: '/videos/pijamada-video-02-poster.webp', title: 'Pijamada con Jesús' },
    ],
  },
]
