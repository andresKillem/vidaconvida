'use client'

import { useEffect, useRef } from 'react'

const Ministries = () => {
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

  const ministries = [
    {
      title: 'VCV Kids',
      description: 'Enseñando la palabra de Dios a los más pequeños con amor, creatividad y diversión.',
      gradient: 'from-teal-500 to-orange-400',
      textColor: 'text-white',
    },
    {
      title: 'Jóvenes',
      description: 'Un espacio vibrante donde los jóvenes crecen en fe, amistad y propósito.',
      gradient: 'from-orange-500 to-yellow-400',
      textColor: 'text-white',
    },
    {
      title: 'Adoración',
      description: 'Guiando a la congregación a experimentar la presencia de Dios a través de la música.',
      gradient: 'from-yellow-400 to-yellow-500',
      textColor: 'text-gray-900',
    },
    {
      title: 'Matrimonios',
      description: 'Fortaleciendo familias y restaurando corazones con principios bíblicos.',
      gradient: 'from-orange-400 to-teal-500',
      textColor: 'text-white',
    },
    {
      title: 'Intercesión',
      description: 'Guerreros de oración intercediendo por las necesidades de nuestra comunidad.',
      gradient: 'from-teal-500 to-orange-500',
      textColor: 'text-white',
    },
    {
      title: 'Servicio',
      description: 'Sirviendo con excelencia para crear un ambiente acogedor para todos.',
      gradient: 'from-orange-500 to-orange-400',
      textColor: 'text-white',
    },
  ]

  return (
    <section ref={sectionRef} id="ministries" className="py-20 bg-white">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat text-gray-900 mb-4">
            Nuestros Ministerios
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Áreas donde puedes servir y crecer
          </p>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* Ministries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {ministries.map((ministry) => (
            <div
              key={ministry.title}
              className="group animate-on-scroll rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Ministry Card */}
              <div className={`bg-gradient-to-br ${ministry.gradient} h-64 p-8 flex flex-col justify-center items-center text-center`}>
                <h3 className={`text-2xl font-bold font-montserrat mb-4 ${ministry.textColor}`}>
                  {ministry.title}
                </h3>
                <p className={`leading-relaxed ${ministry.textColor} opacity-95`}>
                  {ministry.description}
                </p>
              </div>
              
              {/* Hover Effect */}
              <div className="bg-white p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-3">
                    ¿Te interesa servir en este ministerio?
                  </p>
                  <button 
                    onClick={() => {
                      const contactSection = document.getElementById('contact')
                      contactSection?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="text-orange-500 font-semibold hover:text-orange-400 transition-colors duration-300"
                  >
                    Contáctanos →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ministry Leadership */}
        <div className="text-center mt-16 animate-on-scroll">
          <div className="bg-gradient-to-r from-gray-100 to-white rounded-2xl p-8 md:p-12 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold font-montserrat text-gray-900 mb-4">
              Liderazgo Pastoral
            </h3>
            <div className="flex justify-center items-center gap-8 text-lg text-gray-800 flex-wrap">
              <div className="text-center">
                <p className="font-semibold">Pastor Mauricio Ramírez</p>
                <p className="text-sm text-gray-600">Pastor Principal</p>
              </div>
              <div className="w-px h-12 bg-gray-600 hidden md:block" />
              <div className="text-center">
                <p className="font-semibold">Pastor Jhon Arevalo</p>
                <p className="text-sm text-gray-600">Pastor Asociado</p>
              </div>
              <div className="w-px h-12 bg-gray-600 hidden md:block" />
              <div className="text-center">
                <p className="font-semibold">Pastor Marcos Santos</p>
                <p className="text-sm text-gray-600">Pastor de Jóvenes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Ministries