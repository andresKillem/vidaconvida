'use client'

import { useEffect, useRef } from 'react'
import { Church, Baby, HandHeart, Users } from 'lucide-react'

const Schedule = () => {
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

  const services = [
    {
      icon: Church,
      title: 'Servicio Dominical',
      description: 'Adoración vibrante y palabra transformadora',
      time: 'Domingos 10:30 AM',
      color: 'bg-orange-500'
    },
    {
      icon: Baby,
      title: 'Vida Kids',
      description: 'Clases dinámicas adaptadas por edades',
      time: 'Durante el servicio',
      color: 'bg-teal-500'
    },
    {
      icon: HandHeart,
      title: 'Noche de Oración',
      description: 'Tiempo de intercesión y búsqueda vía Zoom',
      time: 'Miércoles 8:00 PM',
      color: 'bg-yellow-500'
    },
    {
      icon: Users,
      title: 'Vida Youth',
      description: 'Jóvenes creciendo en fe, amistad y propósito (12-17 años)',
      time: 'Durante el servicio',
      color: 'bg-blue-500'
    }
  ]

  return (
    <section ref={sectionRef} id="schedule" className="py-20 bg-white">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat text-gray-900 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Te esperamos cada semana para crecer juntos en fe
          </p>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group animate-on-scroll bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center overflow-hidden relative"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`relative z-10 w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-lg font-bold font-montserrat text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="text-orange-500 font-semibold text-lg">
                  {service.time}
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-br group-hover:${service.color} rounded-2xl transition-all duration-300`} />
            </div>
          ))}
        </div>

        {/* Call to Action - Compact */}
        <div className="text-center mt-12 animate-on-scroll">
          <div className="bg-gradient-to-r from-orange-50 to-teal-50 rounded-xl p-6 max-w-3xl mx-auto border border-orange-200">
            <h3 className="text-xl font-bold font-montserrat text-gray-900 mb-3">
              ¡Ven y únete a nuestra familia!
            </h3>
            <div className="flex justify-center items-center gap-4 text-sm text-gray-700 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <span>Ambiente familiar</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-500 rounded-full" />
                <span>Cuidado de niños</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <span>Estacionamiento gratis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Schedule