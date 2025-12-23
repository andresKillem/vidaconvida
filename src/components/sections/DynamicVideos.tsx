'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, ExternalLink, Calendar } from 'lucide-react'

interface VideoItem {
  id: string
  title: string
  description: string
  youtubeId: string
  publishedAt: string
}

const DynamicVideos = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)
  const [showEmbed, setShowEmbed] = useState(false)

  // Videos recientes del canal - actualizados manualmente o via API
  const videos: VideoItem[] = [
    {
      id: '1',
      title: 'Servicio Dominical en Vivo',
      description: 'Únete a nuestro servicio de adoración cada domingo',
      youtubeId: 'uEqbM91RRfc',
      publishedAt: '2024-12-22'
    },
    {
      id: '2',
      title: '¡Cuando el Cielo Marca la Hora!',
      description: 'Pastor Mauricio Ramírez - Un mensaje de esperanza y fe',
      youtubeId: '01nU2nxw8Ig',
      publishedAt: '2024-12-15'
    },
    {
      id: '3',
      title: 'Papá, ¿dónde estás?',
      description: 'Pastor Jhon Arévalo - Mensaje sobre la paternidad',
      youtubeId: 'OpPESruSh7g',
      publishedAt: '2024-12-08'
    },
    {
      id: '4',
      title: 'Superando el Agobio',
      description: 'Mensaje de esperanza y fortaleza en tiempos difíciles',
      youtubeId: 'N84lOSimzFY',
      publishedAt: '2024-12-01'
    },
    {
      id: '5',
      title: 'Lucha por tu Familia',
      description: 'El valor de la familia en el plan de Dios',
      youtubeId: 'BF1MYQ4UmkM',
      publishedAt: '2024-11-24'
    }
  ]

  useEffect(() => {
    setSelectedVideo(videos[0])
  }, [])

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const playVideo = (video: VideoItem) => {
    setSelectedVideo(video)
    setShowEmbed(true)
  }

  return (
    <section ref={sectionRef} id="videos" className="py-20 bg-gray-100">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat text-gray-900 mb-4">
            Videos Recientes
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            Revive nuestros sermones y momentos especiales
          </p>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2 animate-on-scroll">
            {selectedVideo && (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Video Player or Thumbnail */}
                <div className="relative aspect-video bg-gray-900">
                  {showEmbed ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                      title={selectedVideo.title}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <img
                        src={`https://img.youtube.com/vi/${selectedVideo.youtubeId}/maxresdefault.jpg`}
                        alt={selectedVideo.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to hqdefault if maxresdefault doesn't exist
                          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${selectedVideo.youtubeId}/hqdefault.jpg`
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <button
                          onClick={() => setShowEmbed(true)}
                          className="bg-red-600 hover:bg-red-700 text-white rounded-full p-5 transition-all duration-300 hover:scale-110 shadow-2xl"
                        >
                          <Play className="w-10 h-10" />
                        </button>
                      </div>
                    </>
                  )}
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
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Video List */}
          <div className="animate-on-scroll">
            <h3 className="text-xl font-bold font-montserrat text-gray-900 mb-6">
              Más Videos
            </h3>
            <div className="space-y-4">
              {videos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => playVideo(video)}
                  className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ${
                    selectedVideo?.id === video.id ? 'ring-2 ring-orange-500' : 'hover:-translate-y-1'
                  }`}
                >
                  <div className="flex gap-4 p-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-24 h-16 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg">
                        <Play className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                        {video.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(video.publishedAt)}</span>
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
                Ver Todos los Videos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DynamicVideos
