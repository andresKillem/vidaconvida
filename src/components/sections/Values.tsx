'use client'

import { useEffect, useRef } from 'react'
import { Cross, BookOpen, Flame, Heart, Users, Globe, Target } from 'lucide-react'

const Values = () => {
  const sectionRef = useRef<HTMLElement>(null)

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

  const values = [
    {
      icon: Cross,
      title: '#CristoEsElCentro',
      description: 'Jesús es nuestra razón de vivir',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: BookOpen,
      title: '#VidaEnLaPalabra',
      description: 'La Biblia guía cada paso',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Flame,
      title: '#EspírituQueTransforma',
      description: 'Vivimos guiados por su presencia',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Heart,
      title: '#AmorQueCambiaVidas',
      description: 'Amamos como el Padre nos ama',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Users,
      title: '#SomosFamilia',
      description: 'Caminamos juntos, nunca solos',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Globe,
      title: '#ImpactamosGeneraciones',
      description: 'Dejamos huella en nuestra ciudad y más allá',
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: Target,
      title: '#PropósitoDeVida',
      description: 'Nacimos para algo más grande',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  return (
    <section ref={sectionRef} id="values" className="py-20 bg-gradient-to-br from-orange-50 to-teal-50">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat text-gray-900 mb-4">
            Nuestros Valores
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-teal-500 mx-auto rounded-full" />
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <value.icon className="w-8 h-8 text-white" />
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-bold font-montserrat text-gray-900 mb-3 text-center">
                {value.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed text-sm">
                {value.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Values
