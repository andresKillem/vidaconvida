'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Play, Calendar } from 'lucide-react'

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [showVideoPlayer, setShowVideoPlayer] = useState(false)
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null)

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

  // Real church photos matched with actual YouTube videos from Vida con Vida Miami
  
  const galleryItems = [
    {
      type: 'worship' as const,
      title: 'Ven y sé parte de ella',
      subtitle: 'Te esperamos el próximo domingo',
      image: '/images/508389914_18317686120230284_2398832695113211027_n.jpg',
      overlay: 'from-black/40 to-black/60',
      youtubeId: 'Ov5phGiaKtU', // Service invitation video
      hasVideo: true
    },
    {
      type: 'celebration' as const,
      title: 'Celebramos a los padres su día!',
      subtitle: 'Momentos especiales en familia',
      image: '/images/508651136_18317686075230284_6588668133463852526_n.jpg',
      overlay: 'from-blue-900/40 to-purple-900/60',
      youtubeId: 'P4PlQBxOHfY', // Father's Day celebration
      hasVideo: true
    },
    {
      type: 'worship' as const,
      title: 'Adoración y Alabanza',
      subtitle: 'Experimentamos la presencia de Dios',
      date: '6/8/25',
      image: '/images/514512136_122143202714763334_5327026518122331566_n.jpg',
      overlay: 'from-purple-900/40 to-pink-900/60',
      youtubeId: 'yHIKN3Frz_Q', // Worship and praise service
      hasVideo: true
    },
    {
      type: 'sermon' as const,
      title: '¡Cuando el Cielo Marca la Hora!',
      speaker: 'Pastor Mauricio Ramírez',
      image: '/images/518363420_122146648802763334_8311388389080316128_n.jpg',
      overlay: 'from-orange-900/40 to-yellow-900/60',
      youtubeId: '01nU2nxw8Ig', // Pastor Mauricio sermon
      hasVideo: true
    },
    {
      type: 'sermon' as const,
      title: 'Papá, ¿dónde estás?',
      speaker: 'Pastor Jhon Arevalo',
      image: '/images/522901346_122147144402763334_4934869960914086109_n.jpg',
      overlay: 'from-gray-900/40 to-gray-800/60',
      youtubeId: 'OpPESruSh7g', // Pastor Jhon sermon about fathers
      hasVideo: true
    },
    {
      type: 'sermon' as const,
      title: 'Superando el Agobio',
      subtitle: 'Mensaje de esperanza y fortaleza',
      image: '/images/508679822_18317686093230284_4830059795066410769_n.jpg',
      overlay: 'from-teal-900/40 to-blue-900/60',
      youtubeId: 'N84lOSimzFY', // Overcoming burdens sermon
      hasVideo: true
    },
    {
      type: 'sermon' as const,
      title: 'Lucha por tu Familia',
      subtitle: 'Pastor Marcos Santos',
      image: '/images/508712985_18317686111230284_3475606480792674855_n.jpg',
      overlay: 'from-green-900/40 to-teal-900/60',
      youtubeId: 'BF1MYQ4UmkM', // Family ministry sermon
      hasVideo: true
    },
    {
      type: 'worship' as const,
      title: 'Servicio Dominical',
      subtitle: 'Adoración y Palabra de Dios',
      image: '/images/515331624_122146811864763334_7375282397365992320_n.jpg',
      overlay: 'from-indigo-900/40 to-purple-900/60',
      youtubeId: 'NogVvV81I1Y', // Sunday service
      hasVideo: true
    },
    {
      type: 'teaching' as const,
      title: 'Enseñanza Bíblica',
      subtitle: 'Creciendo en la Palabra',
      image: '/images/520176153_122147144372763334_1673602458747975946_n.jpg',
      overlay: 'from-emerald-900/40 to-teal-900/60',
      youtubeId: 'yg3JWv2UV5A', // Biblical teaching
      hasVideo: true
    },
    {
      type: 'ministry' as const,
      title: 'Ministerio de Restauración',
      subtitle: 'Sanidad y liberación',
      image: '/images/508682158_18317686084230284_4491681199789920268_n.jpg',
      overlay: 'from-purple-900/40 to-indigo-900/60',
      youtubeId: 'Ip6UrP9lKKw', // Ministry of restoration
      hasVideo: true
    }
  ]

  const scrollToYouTube = () => {
    window.open('https://www.youtube.com/@VidaConVidaMiami', '_blank')
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setSelectedImage(null)
    }
  }

  const playVideo = (videoId: string) => {
    setCurrentVideoId(videoId)
    setShowVideoPlayer(true)
    setSelectedImage(null)
  }

  const closeVideoPlayer = () => {
    setShowVideoPlayer(false)
    setCurrentVideoId(null)
  }

  const handleItemClick = (index: number) => {
    const item = galleryItems[index]
    if (item.hasVideo && item.youtubeId) {
      playVideo(item.youtubeId)
    } else {
      setSelectedImage(index)
    }
  }

  return (
    <section ref={sectionRef} id="gallery" className="py-20 bg-white">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat text-gray-900 mb-4">
            Nuestra Familia
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Momentos que compartimos juntos
          </p>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="group animate-on-scroll rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-80 relative"
              onClick={() => handleItemClick(index)}
            >
              {/* Real Photo Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              
              {/* Sophisticated Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.overlay} transition-opacity duration-300 group-hover:opacity-80`} />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                  {(item.type === 'ministry' || item.type === 'community' || item.type === 'fellowship') && (
                    <>
                      <h3 className="text-xl font-bold font-montserrat mb-2 drop-shadow-lg">{item.title}</h3>
                      <p className="text-sm opacity-90 leading-relaxed drop-shadow">{item.subtitle}</p>
                    </>
                  )}
                  
                  {(item.type === 'worship' || item.type === 'celebration') && (
                    <>
                      <h3 className="text-lg font-bold font-montserrat mb-2 drop-shadow-lg">{item.title}</h3>
                      <p className="text-sm opacity-90 leading-relaxed drop-shadow">{item.subtitle}</p>
                      {item.date && <p className="text-xs opacity-75 mt-2 drop-shadow">{item.date}</p>}
                    </>
                  )}
                  
                  {item.type === 'sermon' && (
                    <>
                      <h3 className="text-lg font-bold font-montserrat mb-3 drop-shadow-lg leading-tight">{item.title}</h3>
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg inline-block">
                        <p className="text-sm font-medium">{item.speaker}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {/* Video Indicator */}
              {item.hasVideo && (
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-red-600 text-white p-2 rounded-full shadow-lg">
                    <Play className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* Elegant Hover Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-center justify-center">
                <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="w-16 h-16 border-2 border-white/60 rounded-full flex items-center justify-center mb-3 mx-auto backdrop-blur-sm">
                    <Play className="w-6 h-6 ml-1" />
                  </div>
                  <p className="text-sm font-medium">
                    {item.hasVideo ? 'Ver Video' : 'Ver más'}
                  </p>
                </div>
              </div>
              
              {/* Sophisticated Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-2xl transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center animate-on-scroll">
          <div className="bg-gradient-to-r from-orange-500/10 via-orange-400/10 to-teal-500/10 rounded-2xl p-8 md:p-12 border border-orange-500/20">
            <h3 className="text-2xl md:text-3xl font-bold font-montserrat text-gray-900 mb-4">
              ¿Quieres ver más contenido?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Visita nuestro canal de YouTube para sermones completos, testimonios y más momentos especiales
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={scrollToYouTube}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Ver Canal de YouTube
              </button>
              <button
                onClick={() => window.open('https://www.facebook.com/profile.php?id=61572900027929', '_blank')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Síguenos en Facebook
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sophisticated Modal for detailed view */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative max-w-5xl w-full max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-20 bg-black/50 rounded-full p-2 backdrop-blur-sm transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="relative w-full h-[80vh] rounded-2xl overflow-hidden shadow-2xl">
              {/* Full Size Photo Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${galleryItems[selectedImage].image})` }}
              />
              
              {/* Elegant Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${galleryItems[selectedImage].overlay} from-black/80 via-transparent to-black/40`} />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-end p-8">
                <div className="text-white max-w-2xl">
                  <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-4 leading-tight drop-shadow-lg">
                    {galleryItems[selectedImage].title}
                  </h2>
                  
                  {galleryItems[selectedImage].subtitle && (
                    <p className="text-xl mb-4 opacity-90 leading-relaxed drop-shadow">
                      {galleryItems[selectedImage].subtitle}
                    </p>
                  )}
                  
                  {'speaker' in galleryItems[selectedImage] && (
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg inline-block mb-6">
                      <p className="text-lg font-medium">
                        {(galleryItems[selectedImage] as { speaker: string }).speaker}
                      </p>
                    </div>
                  )}
                  
                  {'date' in galleryItems[selectedImage] && galleryItems[selectedImage].date && (
                    <p className="text-sm opacity-75 mb-6 drop-shadow">
                      {galleryItems[selectedImage].date}
                    </p>
                  )}
                  
                  <div className="flex gap-4 flex-wrap">
                    {galleryItems[selectedImage].hasVideo && galleryItems[selectedImage].youtubeId && (
                      <button
                        onClick={() => playVideo(galleryItems[selectedImage].youtubeId!)}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
                      >
                        <Play className="w-5 h-5" />
                        Ver Video
                      </button>
                    )}
                    <button
                      onClick={scrollToYouTube}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                      <Play className="w-5 h-5" />
                      Canal de YouTube
                    </button>
                    <button
                      onClick={() => scrollToSection('contact')}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                    >
                      Contáctanos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* YouTube Video Player Modal */}
      {showVideoPlayer && currentVideoId && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-6xl max-h-[90vh]">
            <button
              onClick={closeVideoPlayer}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 z-20 bg-black/50 rounded-full p-3 backdrop-blur-sm transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="relative w-full h-0 pb-[56.25%] rounded-2xl overflow-hidden shadow-2xl bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title="Video del Servicio"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            
            {/* Video Info Overlay */}
            <div className="absolute -bottom-16 left-0 right-0 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
                <p className="text-white text-sm">
                  ¿Te gusta este contenido? 
                  <button
                    onClick={scrollToYouTube}
                    className="text-red-400 hover:text-red-300 ml-2 font-semibold"
                  >
                    Suscríbete a nuestro canal
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery