'use client'

import { useEffect, useRef } from 'react'
import { Calendar, Heart, Users, Home } from 'lucide-react'

const History = () => {
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

  const historyTimeline = [
    {
      year: '1999',
      title: 'El Inicio',
      description: 'El 14 de febrero de 1999, en el Doral, Florida, un pequeño grupo de 40 hermanos de origen brasileño se reunió en la sala de una casa para adorar juntos.',
      icon: Home,
      color: 'from-orange-500 to-orange-600'
    },
    {
      year: '2000s',
      title: 'Crecimiento y Multiplicación',
      description: 'Lo que comenzó como una reunión de oración se convirtió en una familia espiritual, guiada por la enseñanza de Jesús y la doctrina de los apóstoles.',
      icon: Users,
      color: 'from-teal-500 to-teal-600'
    },
    {
      year: '2010s',
      title: 'Expansión Cultural',
      description: 'Alrededor de 15 años atrás, Dios siguió trayendo más personas y nuevas culturas. Un grupo de familias hispanohablantes se unió y celebró su primer servicio en español.',
      icon: Heart,
      color: 'from-pink-500 to-pink-600'
    },
    {
      year: 'Hoy',
      title: 'Vida con Vida Miami',
      description: 'Hoy seguimos siendo esa misma familia que empezó en una sala de casa: personas que creen en el poder del amor de Dios para transformar vidas y que sueñan con impactar a Miami y a las nuevas generaciones.',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600'
    }
  ]

  return (
    <section ref={sectionRef} id="history" className="py-16 bg-white">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat text-gray-900 mb-4">
            Nuestra Historia
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* Compact Timeline */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {historyTimeline.map((item, index) => (
            <div
              key={item.year}
              className="animate-on-scroll bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">{item.year}</span>
              </div>
              <h3 className="text-lg font-bold font-montserrat text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Groups in House Section - Compact */}
        <div className="animate-on-scroll">
          <div className="bg-gradient-to-br from-orange-50 to-teal-50 rounded-xl p-6 md:p-8 border border-orange-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold font-montserrat text-gray-900">
                🏡 Grupos en Casa
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm">
              En el inicio, nuestra iglesia comenzó con un pequeño grupo que se reunía para crecer en fe. Hoy, estos grupos son el corazón de nuestra iglesia: espacios íntimos donde oramos, estudiamos la Palabra y nos apoyamos mutuamente. A través de los Grupos de Edificación, buscamos que nadie camine solo.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default History
