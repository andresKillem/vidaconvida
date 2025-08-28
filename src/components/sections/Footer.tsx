'use client'

import { useState } from 'react'
import { Heart, Phone, Mail, MapPin, Clock, Send } from 'lucide-react'

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('¡Gracias por suscribirte! Pronto tendremos la versión en inglés disponible.')
    setEmail('')
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="section-container py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Church Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                <span className="text-white text-xl font-light">✝</span>
              </div>
              <div>
                <h3 className="font-montserrat font-bold text-lg text-orange-500">
                  Vida con Vida
                </h3>
                <p className="text-sm text-gray-400">Miami</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Una familia de fe creciendo juntos en el amor de Cristo. 
              Respondemos bíblicamente a la vida.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p><strong className="text-orange-500">Pastores:</strong></p>
              <p>Mauricio Ramírez</p>
              <p>Jhon Arevalo</p>
              <p>Marcos Santos</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-montserrat font-bold text-lg mb-6 text-orange-500">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3">
              {[
                { id: 'about', label: 'Acerca de Nosotros' },
                { id: 'schedule', label: 'Servicios' },
                { id: 'ministries', label: 'Ministerios' },
                { id: 'gallery', label: 'Galería' },
                { id: 'contact', label: 'Contacto' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Schedule */}
          <div>
            <h4 className="font-montserrat font-bold text-lg mb-6 text-orange-500">
              Horarios de Servicio
            </h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>Domingo: 10:30 AM</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>Miércoles: 7:00 PM (Oración)</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>Viernes: 7:30 PM (Grupos)</span>
              </li>
            </ul>

            {/* Contact Info */}
            <div className="mt-6 space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />
                <span className="text-sm leading-relaxed">
                  10200 NW 25 St, Unit 113<br />
                  2nd Floor, Doral, FL 33172
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a 
                  href="tel:+13051234567" 
                  className="text-sm hover:text-yellow-400 transition-colors duration-300"
                >
                  (305) 123-4567
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a 
                  href="mailto:info@vidaconvidamiami.org" 
                  className="text-sm hover:text-yellow-400 transition-colors duration-300"
                >
                  info@vidaconvidamiami.org
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="font-montserrat font-bold text-lg mb-6 text-orange-500">
              Mantente Conectado
            </h4>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              Suscríbete para recibir noticias, devocionales y actualizaciones de nuestra iglesia.
            </p>
            
            {/* Newsletter Form */}
            <form onSubmit={handleNewsletterSubmit} className="mb-6">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu email"
                  required
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                />
                <button
                  type="submit"
                  className="bg-orange-500 px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Social Media Links */}
            <div className="space-y-3">
              <h5 className="font-semibold text-white">Síguenos:</h5>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61572900027929"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <span className="text-sm font-bold">f</span>
                </a>
                <a
                  href="https://www.instagram.com/vidaconvida"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <span className="text-sm font-bold">i</span>
                </a>
                <a
                  href="https://www.youtube.com/@VidaConVidaMiami"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <span className="text-sm font-bold">▶</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-gray-400 text-sm">
              &copy; 2024 Vida con Vida Miami. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>Doral, FL 33172</span>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-orange-500" />
                <span>Respondemos bíblicamente a la vida</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={() => scrollToSection('contact')}
          className="w-14 h-14 bg-orange-500 rounded-full shadow-2xl flex items-center justify-center animate-pulse hover:scale-110 transition-all duration-300"
          title="¡Soy Nuevo!"
        >
          <Heart className="w-6 h-6 text-white" />
        </button>
      </div>
    </footer>
  )
}

export default Footer