// Latest videos from the church's YouTube channel (@VidaConVidaMiami).
// The site is a static export, so videos are fetched in the browser with the
// public NEXT_PUBLIC_YOUTUBE_API_KEY and fall back to a snapshot when that fails.

export interface ServiceVideo {
  youtubeId: string
  title: string
  // ISO timestamp of when the service started (or was published)
  startedAt: string
  isLive: boolean
}

export interface ShortVideo {
  youtubeId: string
  title: string
  publishedAt: string
}

export interface ChannelFeed {
  services: ServiceVideo[]
  shorts: ShortVideo[]
}

export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@VidaConVidaMiami'
// Every channel's uploads playlist is its channel ID (UCuq2RIPkMf8KE_q_wC75hkw) with "UU" in place of "UC"
const UPLOADS_PLAYLIST_ID = 'UUuq2RIPkMf8KE_q_wC75hkw'
const API_BASE = 'https://www.googleapis.com/youtube/v3'
const CACHE_KEY = 'vcv-youtube-feed-v1'
const CACHE_TTL_MS = 30 * 60 * 1000
const SHORT_MAX_SECONDS = 3 * 60
const MAX_SERVICES = 5
const MAX_SHORTS = 8

// Snapshot of the channel taken 2026-10-29, shown when the API is unavailable
export const fallbackFeed: ChannelFeed = {
  services: [
    { youtubeId: 'XST6z9M2yZE', title: 'Servicio dominical', startedAt: '2026-10-25T14:35:08Z', isLive: false },
    { youtubeId: '5U8YXIh8iUU', title: 'Servicio dominical', startedAt: '2026-10-18T14:43:10Z', isLive: false },
    { youtubeId: 'bmTpbUQnwT4', title: 'Servicio dominical', startedAt: '2026-10-11T14:38:31Z', isLive: false },
    { youtubeId: '86foOruCYMg', title: 'Servicio dominical', startedAt: '2026-10-04T14:38:29Z', isLive: false },
  ],
  shorts: [
    { youtubeId: 'T_wNz-KYovI', title: '¿Amas más la promesa o al Dios que la dio?', publishedAt: '2026-10-29T14:03:29Z' },
    { youtubeId: 'MxKoBkxXBQg', title: 'Rompiendo las cadenas de la ira y encontrando la libertad en Dios', publishedAt: '2026-10-28T14:05:31Z' },
    { youtubeId: 'qey0fD2lgeU', title: 'Creer en Dios es fácil; confiar cambia todo', publishedAt: '2026-10-28T14:03:32Z' },
    { youtubeId: 'MqD9C8r_Z90', title: 'La fe verdadera se demuestra con acciones, no palabras', publishedAt: '2026-10-27T13:59:40Z' },
    { youtubeId: 'uReizNjQQLY', title: 'Sobreviviente de un accidente mortal en la playa: la culpa que consume', publishedAt: '2026-10-27T12:01:37Z' },
    { youtubeId: 'Jid9qd42FKo', title: 'Fe en Dios: tus problemas no son más grandes que Él', publishedAt: '2026-10-26T13:56:31Z' },
  ],
}

interface ApiVideo {
  id: string
  snippet: { title: string; publishedAt: string; liveBroadcastContent: 'none' | 'live' | 'upcoming' }
  contentDetails: { duration: string }
  liveStreamingDetails?: { actualStartTime?: string }
}

// ISO 8601 duration ("PT1H39M15S") to seconds
function parseDurationSeconds(isoDuration: string): number {
  const match = isoDuration.match(/P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return 0
  const [, days, hours, minutes, seconds] = match.map((part) => Number(part ?? 0))
  return days * 86400 + hours * 3600 + minutes * 60 + seconds
}

function cleanShortTitle(title: string): string {
  return title.replace(/#shorts?/gi, '').trim()
}

// Livestreams are uploaded with titles like "Live Oct 11" (sometimes repeated), so
// past streams get a consistent name and their real date is shown separately.
function serviceTitle(video: ApiVideo): string {
  const isGenericTitle = /^live\b/i.test(video.snippet.title) || /^vida con vida\s+miami$/i.test(video.snippet.title.replace(/\s+/g, ' '))
  return isGenericTitle ? 'Servicio dominical' : video.snippet.title
}

export function classifyVideos(videos: ApiVideo[]): ChannelFeed {
  const services: ServiceVideo[] = []
  const shorts: ShortVideo[] = []

  for (const video of videos) {
    const { snippet } = video
    // Scheduled streams that haven't happened yet have no content to watch
    if (snippet.liveBroadcastContent === 'upcoming') continue

    const isLive = snippet.liveBroadcastContent === 'live'
    const durationSeconds = parseDurationSeconds(video.contentDetails.duration)
    const isShort = /#shorts?/i.test(snippet.title) || (!isLive && durationSeconds <= SHORT_MAX_SECONDS)

    if (isShort) {
      if (durationSeconds > 0) {
        shorts.push({ youtubeId: video.id, title: cleanShortTitle(snippet.title), publishedAt: snippet.publishedAt })
      }
      continue
    }

    services.push({
      youtubeId: video.id,
      title: isLive ? 'En vivo ahora' : serviceTitle(video),
      startedAt: video.liveStreamingDetails?.actualStartTime ?? snippet.publishedAt,
      isLive,
    })
  }

  const byNewest = (a: string, b: string) => new Date(b).getTime() - new Date(a).getTime()
  services.sort((a, b) => (a.isLive === b.isLive ? byNewest(a.startedAt, b.startedAt) : a.isLive ? -1 : 1))
  shorts.sort((a, b) => byNewest(a.publishedAt, b.publishedAt))

  return { services: services.slice(0, MAX_SERVICES), shorts: shorts.slice(0, MAX_SHORTS) }
}

function readCache(): ChannelFeed | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const cached = JSON.parse(raw) as { savedAt: number; feed: ChannelFeed }
    return Date.now() - cached.savedAt < CACHE_TTL_MS ? cached.feed : null
  } catch {
    return null
  }
}

function writeCache(feed: ChannelFeed): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), feed }))
  } catch {
    // Storage can be unavailable (private mode, blocked cookies); caching is optional
  }
}

export async function fetchChannelFeed(apiKey: string): Promise<ChannelFeed> {
  const cached = readCache()
  if (cached) return cached

  const playlistResponse = await fetch(
    `${API_BASE}/playlistItems?part=contentDetails&maxResults=50&playlistId=${UPLOADS_PLAYLIST_ID}&key=${apiKey}`
  )
  if (!playlistResponse.ok) throw new Error(`YouTube playlistItems failed: ${playlistResponse.status}`)
  const playlist = (await playlistResponse.json()) as { items: { contentDetails: { videoId: string } }[] }
  const videoIds = playlist.items.map((item) => item.contentDetails.videoId).join(',')

  const videosResponse = await fetch(
    `${API_BASE}/videos?part=snippet,contentDetails,liveStreamingDetails&id=${videoIds}&key=${apiKey}`
  )
  if (!videosResponse.ok) throw new Error(`YouTube videos failed: ${videosResponse.status}`)
  const videos = (await videosResponse.json()) as { items: ApiVideo[] }

  const feed = classifyVideos(videos.items)
  if (feed.services.length === 0 && feed.shorts.length === 0) throw new Error('YouTube feed was empty')

  writeCache(feed)
  return feed
}

// Dates are shown in Miami time; parsing "2024-12-22" as UTC would show the day before
export function formatServiceDate(isoTimestamp: string): string {
  return new Date(isoTimestamp).toLocaleDateString('es-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'America/New_York',
  })
}
