'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin, Clock, Phone, Mail, Send, Heart, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    isFirstTime: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      alert('¡Gracias por contactarnos! Te responderemos pronto.')
      setFormData({ name: '', email: '', phone: '', message: '', isFirstTime: false })
      setIsSubmitting(false)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Dirección',
      content: '10200 NW 25 St, Unit 113\n2nd Floor, Doral, FL 33172',
      action: () => window.open('https://maps.google.com/?q=10200+NW+25+St,+Unit+113,+Doral,+FL+33172', '_blank')
    },
    {
      icon: Clock,
      title: 'Horarios',
      content: 'Domingos: 10:30 AM\nMiércoles: 7:00 PM\nViernes: 7:30 PM (Grupos)',
    },
    {
      icon: Phone,
      title: 'Teléfono',
      content: '(305) 123-4567',
      action: () => window.open('tel:+13051234567', '_self')
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@vidaconvidamiami.org',
      action: () => window.open('mailto:info@vidaconvidamiami.org', '_self')
    }
  ]

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-gray-100">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat text-gray-900 mb-4">
            Contáctanos
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Nos encantaría conocerte
          </p>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="animate-on-scroll">
            <div className="mb-8">
              <h3 className="text-2xl font-bold font-montserrat text-gray-900 mb-4">
                Información de Contacto
              </h3>
              <p className="text-gray-600">
                ¿Tienes preguntas? ¿Necesitas oración? ¿Es tu primera vez? ¡Contáctanos!
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                    info.action ? 'cursor-pointer hover:-translate-y-1' : ''
                  }`}
                  onClick={info.action}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold font-montserrat text-gray-900 mb-2">
                        {info.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {info.content}
                      </p>
                      {info.action && (
                        <div className="flex items-center gap-2 mt-2 text-orange-500 text-sm font-medium">
                          <span>Abrir</span>
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
              <h4 className="font-bold font-montserrat text-gray-900 mb-4">
                Síguenos en Redes Sociales
              </h4>
              <div className="flex gap-4">
                <button
                  onClick={() => window.open('https://www.facebook.com/profile.php?id=61572900027929', '_blank')}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-medium transition-colors duration-300"
                >
                  Facebook
                </button>
                <button
                  onClick={() => window.open('https://www.instagram.com/vidaconvida', '_blank')}
                  className="flex-1 bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-xl font-medium transition-colors duration-300"
                >
                  Instagram
                </button>
                <button
                  onClick={() => window.open('https://www.youtube.com/@VidaConVidaMiami', '_blank')}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl font-medium transition-colors duration-300"
                >
                  YouTube
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-on-scroll">
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold font-montserrat text-gray-900 mb-6">
                Conecta con Nosotros
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-semibold text-gray-900 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-colors duration-300"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-semibold text-gray-900 mb-2">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-colors duration-300"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block font-semibold text-gray-900 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-colors duration-300"
                    placeholder="(305) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-semibold text-gray-900 mb-2">
                    Mensaje o Petición de Oración *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-colors duration-300 resize-vertical"
                    placeholder="Cuéntanos cómo podemos orar por ti o si tienes alguna pregunta..."
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isFirstTime"
                    name="isFirstTime"
                    checked={formData.isFirstTime}
                    onChange={handleChange}
                    className="w-5 h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <label htmlFor="isFirstTime" className="text-gray-800 font-medium">
                    Esta es mi primera vez visitando la iglesia
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  {isSubmitting ? (
                    'Enviando...'
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar Mensaje
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-orange-500/10 rounded-xl text-center">
                <Heart className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <p className="text-sm text-gray-800">
                  Si esta es tu primera vez, ¡te damos una bienvenida especial!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-16 animate-on-scroll">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div
              className="h-96 bg-gradient-to-br from-teal-500/20 to-orange-500/20 flex items-center justify-center cursor-pointer hover:from-teal-500/30 hover:to-orange-500/30 transition-all duration-300"
              onClick={() => window.open('https://maps.google.com/?q=10200+NW+25+St,+Unit+113,+Doral,+FL+33172', '_blank')}
            >
              <div className="text-center">
                <MapPin className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold font-montserrat text-gray-900 mb-2">
                  Encuéntranos en Google Maps
                </h4>
                <p className="text-gray-600 mb-4">
                  10200 NW 25 St, Unit 113, 2nd Floor, Doral, FL 33172
                </p>
                <button className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300">
                  Ver en Google Maps
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact