'use client'

import { useEffect, useRef } from 'react'
import { Heart, Music, Users } from 'lucide-react'

const About = () => {
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

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: Users,
      title: 'Visión',
      description: 'Nuestra visión es ser una familia de discípulos de Cristo que impacta a nuestra ciudad y a las nuevas generaciones. Queremos que cada persona descubra que en Dios hay propósito, esperanza y un amor que transforma vidas.',
      animation: 'animate-slide-left'
    },
    {
      icon: Music,
      title: 'Nuestra Misión',
      description: 'Formar y acompañar discípulos de Cristo en Miami que vivan una fe auténtica, fundamentada en la Palabra, guiados por el Espíritu Santo y el amor del Padre; una familia espiritual que refleja a Jesús, transforma vidas y deja un impacto eterno en nuestra comunidad y en las nuevas generaciones.',
      animation: 'animate-on-scroll'
    },
    {
      icon: Heart,
      title: 'Ciclo Completo del Discipulado',
      description: 'CONQUISTAR, CONSOLIDAR, EDIFICAR, ENVIAR Y ACOMPAÑAR. Aquí encontrarás amigos, propósito y un lugar donde crecer en tu fe. Porque al final, somos una gran familia de discípulos que vive para amar y servir como Jesús.',
      animation: 'animate-slide-right'
    }
  ]

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-gray-100">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat text-gray-900 mb-4">
            Quiénes Somos
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Somos una iglesia apasionada por Cristo, basada en la Biblia y abierta al mover del Espíritu Santo. 
            Creemos en el amor del Padre que sana, restaura y nos impulsa a impactar a nuestra ciudad y a las nuevas generaciones.
          </p>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center border-t-4 border-transparent hover:border-gradient-warm ${feature.animation}`}
            >
              {/* Icon */}
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold font-montserrat text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-on-scroll">
          <div className="bg-orange-50 rounded-2xl p-8 md:p-12 border border-orange-200">
            <h3 className="text-2xl md:text-3xl font-bold font-montserrat text-gray-900 mb-4">
              &ldquo;Respondemos bíblicamente a la vida&rdquo;
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Únete a nuestra familia de fe y descubre el propósito que Dios tiene para tu vida
            </p>
            <div className="flex justify-center gap-4 text-sm text-orange-500 font-medium">
              <span>• Comunidad auténtica</span>
              <span>• Crecimiento espiritual</span>
              <span>• Propósito eterno</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About