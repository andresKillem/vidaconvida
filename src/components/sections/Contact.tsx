'use client'

import { useState } from 'react'
import { MapPin, Clock, Phone, Mail, Send, CheckCircle2 } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { churchInfo } from '@/lib/church'

const initialFormData = { name: '', email: '', phone: '', message: '', isFirstTime: false }

const inputClassName =
  'w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink placeholder:text-ink/40 transition-colors focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/20'

const Contact = () => {
  const [formData, setFormData] = useState(initialFormData)
  const [hasOpenedEmail, setHasOpenedEmail] = useState(false)

  // There is no backend (static site), so the form composes an email in the visitor's mail app
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const emailBody = [
      'Nuevo mensaje de contacto desde vidaconvidamiami.com',
      '',
      `Nombre: ${formData.name}`,
      `Email: ${formData.email}`,
      `Teléfono: ${formData.phone || 'No proporcionado'}`,
      `Primera vez: ${formData.isFirstTime ? 'Sí' : 'No'}`,
      '',
      'Mensaje:',
      formData.message,
    ].join('\n')

    const subject = encodeURIComponent('Nuevo mensaje de contacto - vidaconvidamiami.com')
    window.location.href = `mailto:${churchInfo.email}?subject=${subject}&body=${encodeURIComponent(emailBody)}`

    setHasOpenedEmail(true)
    setFormData(initialFormData)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target
    setFormData((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? (event.target as HTMLInputElement).checked : value,
    }))
  }

  return (
    <section id="contact" className="bg-cream py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Planea tu visita"
          title="Nos encantaría conocerte"
          lead="¿Tienes preguntas? ¿Necesitas oración? ¿Es tu primera vez? Escríbenos y con gusto te acompañamos."
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="reveal">
            <dl className="divide-y divide-ink/10 border-y border-ink/10">
              <div className="flex gap-4 py-5">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-ember" aria-hidden="true" />
                <div>
                  <dt className="eyebrow mb-1 text-ink-muted">Dirección</dt>
                  <dd>
                    <a href={churchInfo.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-ember-deep">
                      {churchInfo.addressLines[0]}
                      <br />
                      {churchInfo.addressLines[1]}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-4 py-5">
                <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-ember" aria-hidden="true" />
                <div>
                  <dt className="eyebrow mb-1 text-ink-muted">Horarios</dt>
                  {churchInfo.serviceTimes.map((service) => (
                    <dd key={service.day} className="text-ink">
                      {service.day}: {service.time} <span className="text-ink-muted">· {service.label}</span>
                    </dd>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 py-5">
                <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-ember" aria-hidden="true" />
                <div>
                  <dt className="eyebrow mb-1 text-ink-muted">Teléfono</dt>
                  <dd><a href={churchInfo.phoneHref} className="text-ink hover:text-ember-deep">{churchInfo.phoneDisplay}</a></dd>
                </div>
              </div>
              <div className="flex gap-4 py-5">
                <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-ember" aria-hidden="true" />
                <div className="min-w-0">
                  <dt className="eyebrow mb-1 text-ink-muted">Email</dt>
                  <dd><a href={`mailto:${churchInfo.email}`} className="break-all text-ink hover:text-ember-deep">{churchInfo.email}</a></dd>
                </div>
              </div>
            </dl>

            <div className="mt-8 overflow-hidden rounded-3xl bg-sand">
              <iframe
                src={churchInfo.mapsEmbedUrl}
                title="Mapa de la ubicación de Vida con Vida Miami en Doral"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full border-0"
              />
            </div>
          </div>

          <div className="reveal rounded-[2rem] bg-sand p-6 sm:p-8 md:p-10">
            <h3 className="mb-2 text-3xl font-medium text-ink">Conecta con nosotros</h3>
            <p className="mb-8 text-ink-muted">Si esta es tu primera vez, ¡te damos una bienvenida especial!</p>

            {hasOpenedEmail && (
              <div role="status" className="mb-6 flex gap-3 rounded-2xl bg-lagoon-soft p-4 text-ink">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-lagoon-deep" aria-hidden="true" />
                <p className="text-sm">
                  ¡Gracias por escribirnos! Abrimos tu aplicación de correo con el mensaje listo; solo tienes que enviarlo.
                  Si no se abrió, escríbenos directamente a{' '}
                  <a href={`mailto:${churchInfo.email}`} className="text-link break-all">{churchInfo.email}</a>.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-ink">Nombre completo *</label>
                  <input type="text" id="name" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required className={inputClassName} placeholder="Tu nombre" />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-ink">Teléfono</label>
                  <input type="tel" id="phone" name="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} className={inputClassName} placeholder="(305) 123-4567" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ink">Correo electrónico *</label>
                <input type="email" id="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required className={inputClassName} placeholder="tu@email.com" />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-ink">Mensaje o petición de oración *</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className={`${inputClassName} resize-y`} placeholder="Cuéntanos cómo podemos orar por ti o si tienes alguna pregunta..." />
              </div>

              <label htmlFor="isFirstTime" className="flex cursor-pointer items-center gap-3 text-ink">
                <input type="checkbox" id="isFirstTime" name="isFirstTime" checked={formData.isFirstTime} onChange={handleChange} className="h-5 w-5 rounded border-ink/30 accent-ember" />
                Esta es mi primera vez visitando la iglesia
              </label>

              <button type="submit" className="btn-primary w-full py-3.5">
                <Send className="h-4 w-4" aria-hidden="true" />
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
