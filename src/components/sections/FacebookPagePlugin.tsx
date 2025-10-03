'use client'

import { useEffect, useRef } from 'react'
import { Facebook, ExternalLink } from 'lucide-react'

// Extend Window interface to include FB
declare global {
  interface Window {
    FB?: {
      init: (params: { xfbml: boolean; version: string }) => void
    }
  }
}

const FacebookPagePlugin = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const facebookRef = useRef<HTMLDivElement>(null)

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
    // Load Facebook SDK
    if (typeof window !== 'undefined' && !window.FB) {
      const script = document.createElement('script')
      script.src = 'https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v18.0'
      script.async = true
      script.defer = true
      script.crossOrigin = 'anonymous'
      document.body.appendChild(script)

      script.onload = () => {
        if (window.FB) {
          window.FB.init({
            xfbml: true,
            version: 'v18.0'
          })
        }
      }
    }
  }, [])

  return (
    <section ref={sectionRef} id="facebook-feed" className="py-20 bg-white">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12 animate-on-scroll">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Facebook className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-montserrat text-gray-900">
              📘 Facebook Feed
            </h2>
          </div>
          <p className="text-xl text-gray-600 mb-8">
            Mantente conectado con nuestra comunidad y las últimas noticias
          </p>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Facebook Page Plugin */}
          <div className="animate-on-scroll">
            <div 
              ref={facebookRef}
              className="fb-page" 
              data-href="https://www.facebook.com/profile.php?id=61572900027929"
              data-tabs="timeline,events"
              data-width="500"
              data-height="600"
              data-small-header="false"
              data-adapt-container-width="true"
              data-hide-cover="false"
              data-show-facepile="true"
            >
              <blockquote 
                cite="https://www.facebook.com/profile.php?id=61572900027929" 
                className="fb-xfbml-parse-ignore"
              >
                <a href="https://www.facebook.com/profile.php?id=61572900027929">
                  Vida con Vida Miami
                </a>
              </blockquote>
            </div>
          </div>

          {/* Alternative: Direct Link with Preview */}
          <div className="animate-on-scroll">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 h-full flex flex-col justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Facebook className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold font-montserrat text-gray-900 mb-4">
                  Únete a Nuestra Comunidad
                </h3>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Mantente al día con las últimas noticias, eventos y mensajes inspiradores de nuestra iglesia. 
                  Ve nuestros posts, eventos y conéctate con otros miembros de la comunidad.
                </p>

                <div className="space-y-4">
                  <button
                    onClick={() => window.open('https://www.facebook.com/profile.php?id=61572900027929', '_blank')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                  >
                    <Facebook className="w-5 h-5" />
                    Ver Página de Facebook
                  </button>
                  
                  <button
                    onClick={() => window.open('https://www.facebook.com/profile.php?id=61572900027929', '_blank')}
                    className="w-full bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Seguir en Facebook
                  </button>
                </div>

                <div className="mt-6 text-sm text-gray-600">
                  <p>📱 Recibe notificaciones de eventos</p>
                  <p>💬 Participa en conversaciones</p>
                  <p>📸 Ve fotos y videos recientes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FacebookPagePlugin
