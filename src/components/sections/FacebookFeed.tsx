'use client'

import { useEffect, useRef, useState } from 'react'
import { Facebook, ExternalLink, Calendar, MessageCircle, Heart } from 'lucide-react'
import { FacebookPost } from '@/lib/socialMedia'

const FacebookFeed = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [posts, setPosts] = useState<FacebookPost[]>([])
  const [loading, setLoading] = useState(true)

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
    // Simulate API call - replace with actual Facebook Graph API
    const fetchPosts = async () => {
      setLoading(true)
      try {
        // Mock data for now - replace with actual API call
        const mockPosts: FacebookPost[] = [
          {
            id: '1',
            message: '¡Bendecido domingo! Hoy celebramos la presencia de Dios en nuestras vidas. Gracias por ser parte de nuestra familia de fe. 🙏✨',
            created_time: '2024-01-15T10:30:00Z',
            full_picture: '/images/508389914_18317686120230284_2398832695113211027_n.jpg',
            permalink_url: 'https://facebook.com/post1',
            type: 'photo'
          },
          {
            id: '2',
            message: 'Nuestros jóvenes participando en el ministerio de alabanza. ¡Qué hermoso ver cómo Dios los usa! 🎵❤️',
            created_time: '2024-01-12T15:45:00Z',
            full_picture: '/images/514512136_122143202714763334_5327026518122331566_n.jpg',
            permalink_url: 'https://facebook.com/post2',
            type: 'photo'
          },
          {
            id: '3',
            message: 'Recordando nuestro aniversario como iglesia. 25 años de bendiciones y crecimiento en la fe. ¡Gloria a Dios! 🎉',
            created_time: '2024-01-10T09:20:00Z',
            full_picture: '/images/515331624_122146811864763334_7375282397365992320_n.jpg',
            permalink_url: 'https://facebook.com/post3',
            type: 'photo'
          }
        ]
        
        setPosts(mockPosts)
      } catch (error) {
        console.error('Error fetching Facebook posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 24) {
      return `Hace ${diffInHours} horas`
    } else if (diffInHours < 168) { // 7 days
      return `Hace ${Math.floor(diffInHours / 24)} días`
    } else {
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  if (loading) {
    return (
      <section ref={sectionRef} id="facebook-feed" className="py-20 bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto mb-8"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-xl p-6 animate-pulse">
                <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

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
              Síguenos en Facebook
            </h2>
          </div>
          <p className="text-xl text-gray-600 mb-8">
            Mantente conectado con nuestra comunidad y las últimas noticias
          </p>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-on-scroll border border-gray-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Post Image */}
              {post.full_picture && (
                <div className="aspect-video overflow-hidden rounded-t-2xl">
                  <img
                    src={post.full_picture}
                    alt="Facebook post"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Post Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Facebook className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Vida con Vida Miami</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.created_time)}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  {truncateText(post.message)}
                </p>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>Me gusta</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>Comentar</span>
                    </div>
                  </div>
                  <button
                    onClick={() => window.open(post.permalink_url, '_blank')}
                    className="text-blue-600 hover:text-blue-700 transition-colors duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Facebook Page Link */}
        <div className="text-center animate-on-scroll">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold font-montserrat mb-4">
              Únete a Nuestra Comunidad
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Mantente al día con las últimas noticias, eventos y mensajes inspiradores de nuestra iglesia
            </p>
            <button
              onClick={() => window.open('https://www.facebook.com/profile.php?id=61572900027929', '_blank')}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <Facebook className="w-5 h-5" />
              Síguenos en Facebook
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FacebookFeed
