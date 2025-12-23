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

        {/* Donations Section - Redesigned */}
        <div className="mt-12 animate-on-scroll">
          <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-2xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto border border-orange-200">
            <h3 className="text-2xl md:text-3xl font-bold font-montserrat text-gray-900 mb-2 text-center">
              Formas de Contribuir
            </h3>
            <p className="text-gray-600 mb-8 text-center">
              Tu generosidad hace posible que sigamos impactando vidas
            </p>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* QR Code - Clean and Large */}
              <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-2xl shadow-lg">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://enroll.zellepay.com/qr-codes?data=eyJuYW1lIjoiRElTQ0lQTEVTIE9GIENIUklTVCBDSFVSQ0ggU1BBTklTSCBJTkMuIiwiYWN0aW9uIjoicGF5bWVudCIsInRva2VuIjoic3BhbmlzaEB2aWRhY29udmlkYS5jb20ifQ==&bgcolor=ffffff&color=000000&format=png&ecc=H"
                    alt="Código QR Zelle para donaciones - Disciples of Christ Church Spanish Inc."
                    className="w-48 h-48 md:w-56 md:h-56"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-3 text-center">
                  Escanea para donar vía Zelle
                </p>
              </div>

              {/* Donation Methods */}
              <div className="space-y-6">
                {/* Cheque */}
                <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Cheque</h4>
                      <p className="text-gray-600 text-sm">&ldquo;Disciple of Christ Church Spanish&rdquo;</p>
                    </div>
                  </div>
                </div>

                {/* Sobre de Ofrendas */}
                <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Sobre de Ofrendas</h4>
                      <p className="text-gray-600 text-sm">Disponible durante el servicio</p>
                    </div>
                  </div>
                </div>

                {/* Transferencia/Zelle */}
                <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Zelle / Transferencia</h4>
                      <a href="mailto:secretaria@vidaconvidamiami.com" className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                        secretaria@vidaconvidamiami.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-500 text-sm mt-8">
              &ldquo;Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre.&rdquo; - 2 Corintios 9:7
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Ministries