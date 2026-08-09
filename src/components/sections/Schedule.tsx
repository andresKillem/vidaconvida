import { Church, Baby, HandHeart, Users, Check } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

const services = [
  { icon: Church, title: 'Servicio dominical', description: 'Adoración vibrante y palabra transformadora', time: 'Domingos 10:30 AM' },
  { icon: Baby, title: 'Vida Kids', description: 'Clases dinámicas adaptadas por edades', time: 'Durante el servicio' },
  { icon: Users, title: 'Vida Youth', description: 'Jóvenes de 12 a 17 años creciendo en fe, amistad y propósito', time: 'Durante el servicio' },
  { icon: HandHeart, title: 'Noche de oración', description: 'Tiempo de intercesión y búsqueda vía Zoom', time: 'Miércoles 8:00 PM' },
]

const visitPerks = ['Ambiente familiar', 'Cuidado de niños', 'Estacionamiento gratis']

const Schedule = () => {
  return (
    <section id="schedule" className="relative overflow-hidden bg-ink py-24 text-cream md:py-32">
      {/* Warm glow that echoes the logo's arcs */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full border-[28px] border-ember/15" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-52 -right-32 h-[34rem] w-[34rem] rounded-full border-[28px] border-lagoon/15" />

      <div className="section-container relative">
        <SectionHeading
          tone="dark"
          eyebrow="Nuestros servicios"
          title="Te esperamos cada semana para crecer juntos en fe"
        />

        <div className="grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article key={service.title} className="reveal flex flex-col bg-ink p-7 md:p-8">
              <service.icon className="mb-8 h-6 w-6 text-gold" strokeWidth={1.6} aria-hidden="true" />
              <h3 className="mb-2 text-2xl font-medium text-cream">{service.title}</h3>
              <p className="mb-4 font-semibold text-gold">{service.time}</p>
              <p className="text-cream/60">{service.description}</p>
            </article>
          ))}
        </div>

        <div className="reveal mt-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-cream/80">
            {visitPerks.map((perk) => (
              <li key={perk} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-gold" aria-hidden="true" />
                {perk}
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn-primary">
            ¡Ven y únete a nuestra familia!
          </a>
        </div>
      </div>
    </section>
  )
}

export default Schedule
