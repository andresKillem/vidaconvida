import { Cross, BookOpen, Flame, Heart, Users, Globe, Target } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

const values = [
  { icon: Cross, title: 'Cristo es el centro', hashtag: '#CristoEsElCentro', description: 'Jesús es nuestra razón de vivir' },
  { icon: BookOpen, title: 'Vida en la Palabra', hashtag: '#VidaEnLaPalabra', description: 'La Biblia guía cada paso' },
  { icon: Flame, title: 'Espíritu que transforma', hashtag: '#EspírituQueTransforma', description: 'Vivimos guiados por su presencia' },
  { icon: Heart, title: 'Amor que cambia vidas', hashtag: '#AmorQueCambiaVidas', description: 'Amamos como el Padre nos ama' },
  { icon: Users, title: 'Somos familia', hashtag: '#SomosFamilia', description: 'Caminamos juntos, nunca solos' },
  { icon: Globe, title: 'Impactamos generaciones', hashtag: '#ImpactamosGeneraciones', description: 'Dejamos huella en nuestra ciudad y más allá' },
  { icon: Target, title: 'Propósito de vida', hashtag: '#PropósitoDeVida', description: 'Nacimos para algo más grande' },
]

const Values = () => {
  return (
    <section id="values" className="bg-sand py-24 md:py-32">
      <div className="section-container">
        <SectionHeading eyebrow="Nuestros valores" title="Lo que nos define como iglesia" />

        <ul className="grid gap-px overflow-hidden rounded-3xl bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <li key={value.title} className="reveal flex flex-col bg-sand p-7 md:p-8">
              <value.icon className="mb-6 h-6 w-6 text-ember" strokeWidth={1.6} aria-hidden="true" />
              <h3 className="mb-2 text-xl font-medium text-ink">{value.title}</h3>
              <p className="text-ink-muted">{value.description}</p>
              <p className="mt-auto pt-6 text-sm font-medium text-lagoon-deep">{value.hashtag}</p>
            </li>
          ))}
          <li className="reveal flex flex-col justify-end bg-ink p-7 text-cream md:p-8">
            <p className="font-display text-2xl italic leading-snug">
              &ldquo;Formando discípulos, transformando generaciones.&rdquo;
            </p>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Values
