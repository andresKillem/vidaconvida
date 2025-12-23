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
      title: 'Vida Kids',
      description: 'Enseñando la palabra de Dios a los más pequeños con amor, creatividad y diversión.',
      gradient: 'from-teal-500 to-orange-400',
      textColor: 'text-white',
    },
    {
      title: 'Vida Youth',
      description: 'Un espacio vibrante donde los jóvenes de 12-17 años crecen en fe, amistad y propósito.',
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
      title: 'Ayuda Pastoral & Sanidad Interior',
      description: 'Acompañándote en tu caminar espiritual hacia la libertad, sanidad y restauración en Cristo.',
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

        {/* Ayuda Pastoral & Sanidad Interior - Detailed Section */}
        <div className="mt-16 animate-on-scroll">
          <div className="bg-gradient-to-r from-orange-50 to-teal-50 rounded-2xl p-8 md:p-12 shadow-lg border border-orange-200">
            <h3 className="text-2xl md:text-3xl font-bold font-montserrat text-gray-900 mb-6 text-center">
              Ayuda Pastoral & Sanidad Interior
            </h3>
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-700 leading-relaxed mb-4">
                En Iglesia Vida con Vida Miami, creemos en un Dios que restaura, sana y transforma corazones. Nuestro ministerio de ayuda pastoral y sanidad interior está dedicado a acompañarte en tu caminar espiritual, ayudándote a encontrar libertad y paz en Cristo.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Ofrecemos espacios de consejería, oración y acompañamiento guiados por el Espíritu Santo, donde podrás recibir dirección bíblica, apoyo emocional y ministración personal. Sabemos que todos atravesamos momentos de dolor, confusión o desánimo, pero también sabemos que Dios es fiel para sanar cada herida y renovar tu esperanza.
              </p>
              <blockquote className="border-l-4 border-orange-500 pl-4 my-6 italic text-gray-600">
                &ldquo;El Señor está cerca de los quebrantados de corazón y salva a los de espíritu abatido.&rdquo; - Salmo 34:18
              </blockquote>
              <p className="text-gray-700 leading-relaxed mb-6">
                Si deseas agendar una cita o hablar con un miembro del equipo pastoral, contáctanos a través de correo electrónico a <a href="mailto:secretaria@vidaconvidamiami.com" className="text-orange-500 hover:text-orange-600 font-semibold">secretaria@vidaconvidamiami.com</a> o llamar al <a href="tel:+15615914771" className="text-orange-500 hover:text-orange-600 font-semibold">(561) 591-4771</a>.
              </p>
              <p className="text-center text-gray-800 font-medium">
                No estás solo(a); estamos aquí para caminar contigo hacia la sanidad y la restauración que solo Dios puede dar.
              </p>
            </div>
          </div>
        </div>

        {/* Donations QR Code Section */}
        <div className="mt-12 animate-on-scroll">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-bold font-montserrat text-gray-900 mb-4">
              Formas de Contribuir
            </h3>
            <p className="text-gray-600 mb-6">
              Tu generosidad hace posible que sigamos impactando vidas. Escanea el código QR para hacer tu donación.
            </p>
            <div className="flex justify-center mb-4">
              <img
                src="/images/qr-donations.jpg"
                alt="QR Code para donaciones"
                className="w-48 h-48 rounded-lg shadow-md"
              />
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Cheque:</strong> &ldquo;Disciple of Christ Church Spanish&rdquo;</p>
              <p><strong>Transferencia:</strong> secretaria@vidaconvidamiami.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Ministries