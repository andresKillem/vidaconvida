'use client'

import { useEffect, useRef } from 'react'
import { Heart, Users } from 'lucide-react'

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

  return (
    <section ref={sectionRef} id="pastors" className="py-16 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-10 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-gray-900 mb-4">
            Liderazgo Pastoral
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            &ldquo;Formando discípulos, transformando generaciones.&rdquo;
          </p>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* Pastors Grid */}
        <div className="grid md:grid-cols-2 gap-8 animate-on-scroll max-w-5xl mx-auto">
          {/* Pastores Principales */}
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-sm font-semibold text-orange-500 uppercase tracking-wide">Pastores Principales</span>
                <h3 className="text-xl font-bold font-montserrat text-gray-900">
                  Jhon y Angela Arévalo
                </h3>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Jhon y Angela Arévalo son los pastores principales de Iglesia Vida con Vida Miami. Su pasión es ver vidas transformadas por el amor de Dios y familias restauradas por el poder de Su Palabra.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Con corazones dispuestos a servir, lideran con fe, humildad y una visión clara: levantar una iglesia donde cada persona pueda conocer a Jesús de manera real, crecer espiritualmente y vivir una vida plena en Él.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Bajo su liderazgo, Vida con Vida se ha convertido en una familia espiritual donde todos son bienvenidos, valorados y amados, sin importar su historia o trasfondo.
            </p>
          </div>

          {/* Co-Pastores */}
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-sm font-semibold text-teal-500 uppercase tracking-wide">Co-Pastores</span>
                <h3 className="text-xl font-bold font-montserrat text-gray-900">
                  Mauricio y Marilei Ramírez
                </h3>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Mauricio y Marilei Ramírez sirven como co-pastores en Iglesia Vida con Vida Miami, apoyando la visión pastoral con compromiso, alegría y amor por las personas.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Su ministerio refleja un corazón de servicio y una profunda pasión por acompañar a otros en su crecimiento espiritual. Juntos trabajan para fortalecer la fe, fomentar la unidad y crear un ambiente donde las familias puedan encontrar esperanza y propósito en Cristo.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pastors
