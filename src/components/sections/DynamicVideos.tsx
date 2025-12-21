'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, ExternalLink, Calendar, Eye } from 'lucide-react'
import { YouTubeVideo, YouTubeService } from '@/lib/socialMedia'
import { socialMediaConfig } from '@/lib/config'

const DynamicVideos = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true)
      setError(null)

      // Mock videos as fallback
      const mockVideos: YouTubeVideo[] = [
        {
          id: '1',
          title: '¡Cuando el Cielo Marca la Hora!',
          description: 'Pastor Mauricio Ramírez - Un mensaje de esperanza y fe',
          thumbnail: '/images/508389914_18317686120230284_2398832695113211027_n.jpg',
          publishedAt: '2025-01-15T10:30:00Z',
          duration: '45:30',
          viewCount: '1,234',
          url: 'https://www.youtube.com/watch?v=uEqbM91RRfc'
        },
        {
          id: '2',
          title: 'El Verdadero Significado de la Comunión',
          description: 'Pastor Jhon Arevalo - Descubre el poder de la comunión',
          thumbnail: '/images/514512136_122143202714763334_5327026518122331566_n.jpg',
          publishedAt: '2025-01-08T10:30:00Z',
          duration: '38:45',
          viewCount: '987',
          url: 'https://www.youtube.com/watch?v=hHITa-xZtso'
        },
        {
          id: '3',
          title: '¡El Día que la Iglesia Cambió para Siempre!',
          description: '¿Qué pasó en Pentecostés? - Un estudio bíblico',
          thumbnail: '/images/515331624_122146811864763334_7375282397365992320_n.jpg',
          publishedAt: '2025-01-01T10:30:00Z',
          duration: '42:15',
          viewCount: '1,567',
          url: 'https://www.youtube.com/watch?v=6hXMjxONejc'
        },
        {
          id: '4',
          title: '¡No estás solo! Dios ya preparó el camino',
          description: 'Un mensaje de esperanza y propósito',
          thumbnail: '/images/518363420_122146648802763334_8311388389080316128_n.jpg',
          publishedAt: '2024-12-25T10:30:00Z',
          duration: '35:20',
          viewCount: '892',
          url: 'https://www.youtube.com/watch?v=ZnOj0kLnEC8'
        },
        {
          id: '5',
          title: '¿Eres independiente, codependiente o interdependiente?',
          description: 'Pastor Marcos Santos - Relaciones sanas en Cristo',
          thumbnail: '/images/518412642_122146979552763334_4886373583611456787_n.jpg',
          publishedAt: '2024-12-18T10:30:00Z',
          duration: '40:10',
          viewCount: '1,123',
          url: 'https://www.youtube.com/watch?v=PgTlb2C4xH0'
        }
      ]

      // Try to fetch from YouTube API if configured
      if (socialMediaConfig.youtube.apiKey) {
        try {
          const youtubeService = new YouTubeService(
            socialMediaConfig.youtube.apiKey,
            socialMediaConfig.youtube.channelId,
            socialMediaConfig.youtube.channelHandle
          )

          const fetchedVideos = await youtubeService.getRecentVideos(5)

          if (fetchedVideos.length > 0) {
            setVideos(fetchedVideos)
            setSelectedVideo(fetchedVideos[0])
            setIsLoading(false)
            return
          }
        } catch (err) {
          console.error('Failed to fetch YouTube videos:', err)
          setError('No se pudieron cargar los videos de YouTube. Mostrando contenido de respaldo.')
        }
      }

      // Fall back to mock data
      setVideos(mockVideos)
      setSelectedVideo(mockVideos[0])
      setIsLoading(false)
    }

    fetchVideos()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section ref={sectionRef} id="videos" className="py-20 bg-gray-100">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat text-gray-900 mb-4">
            Videos de YouTube
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full" />
          {error && (
            <p className="mt-4 text-sm text-orange-600 bg-orange-50 px-4 py-2 rounded-lg inline-block">
              {error}
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <>
            {videos.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600">No hay videos disponibles en este momento.</p>
              </div>
            ) : null}
          </>
        )}

        {!isLoading && videos.length > 0 && (

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2 animate-on-scroll">
            {selectedVideo && (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Video Thumbnail/Player */}
                <div className="relative aspect-video bg-gray-900">
                  <img
                    src={selectedVideo.thumbnail}
                    alt={selectedVideo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button
                      onClick={() => window.open(selectedVideo.url, '_blank')}
                      className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 transition-all duration-300 hover:scale-110 shadow-2xl"
                    >
                      <Play className="w-8 h-8" />
                    </button>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {selectedVideo.duration}
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold font-montserrat text-gray-900 mb-2">
                    {selectedVideo.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {selectedVideo.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(selectedVideo.publishedAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {selectedVideo.viewCount} vistas
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Video List */}
          <div className="animate-on-scroll">
            <h3 className="text-xl font-bold font-montserrat text-gray-900 mb-6">
              Videos Recientes
            </h3>
            <div className="space-y-4">
              {videos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ${
                    selectedVideo?.id === video.id ? 'ring-2 ring-orange-500' : 'hover:-translate-y-1'
                  }`}
                >
                  <div className="flex gap-4 p-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-20 h-16 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg">
                        <Play className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                        {video.title}
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">
                        {video.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{formatDate(video.publishedAt)}</span>
                        <span>•</span>
                        <span>{video.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* YouTube Channel Link */}
            <div className="mt-6 text-center">
              <button
                onClick={() => window.open('https://www.youtube.com/@VidaConVidaMiami', '_blank')}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
              >
                <ExternalLink className="w-4 h-4" />
                Ver Canal de YouTube
              </button>
            </div>
          </div>
        </div>
        )}
      </div>
    </section>
  )
}

export default DynamicVideos
