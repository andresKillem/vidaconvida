'use client'

import { useEffect, useRef } from 'react'
import { User, Heart, Users } from 'lucide-react'

const Pastors = () => {
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

  const pastors = [
    {
      name: 'Mauricio Ramírez',
      description: 'Liderando con amor y sabiduría nuestra familia de fe',
      icon: Heart,
      color: 'from-orange-500 to-orange-600'
    },
    {
      name: 'Jhon Arevalo',
      description: 'Acompañando el crecimiento espiritual de nuestra comunidad',
      icon: Users,
      color: 'from-teal-500 to-teal-600'
    },
    {
      name: 'Marcos Santos',
      description: 'Pastor de Jóvenes - Guiando a la nueva generación en su caminar con Cristo',
      icon: User,
      color: 'from-purple-500 to-purple-600'
    }
  ]

  return (
    <section ref={sectionRef} id="pastors" className="py-16 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-10 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-gray-900 mb-4">
            Liderazgo Pastoral
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* Pastors Grid - Compact */}
        <div className="grid md:grid-cols-3 gap-6 animate-on-scroll">
          {pastors.map((pastor, index) => (
            <div
              key={pastor.name}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${pastor.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <pastor.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold font-montserrat text-gray-900">
                  {pastor.name}
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {pastor.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pastors
