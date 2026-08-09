import { Home } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

const historyTimeline = [
  {
    year: '1999',
    title: 'El inicio',
    description:
      'El 14 de febrero de 1999, en el Doral, Florida, un pequeño grupo de 40 hermanos de origen brasileño se reunió en la sala de una casa para adorar juntos.',
  },
  {
    year: '2000s',
    title: 'Crecimiento y multiplicación',
    description:
      'Lo que comenzó como una reunión de oración se convirtió en una familia espiritual, guiada por la enseñanza de Jesús y la doctrina de los apóstoles.',
  },
  {
    year: '2010s',
    title: 'Expansión cultural',
    description:
      'Alrededor de 15 años atrás, Dios siguió trayendo más personas y nuevas culturas. Un grupo de familias hispanohablantes se unió y celebró su primer servicio en español.',
  },
  {
    year: 'Hoy',
    title: 'Vida con Vida Miami',
    description:
      'Hoy seguimos siendo esa misma familia que empezó en una sala de casa: personas que creen en el poder del amor de Dios para transformar vidas y que sueñan con impactar a Miami y a las nuevas generaciones.',
  },
]

const History = () => {
  return (
    <section id="history" className="bg-cream py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Nuestra historia"
          title="Empezó en la sala de una casa"
          lead="Más de 25 años de fidelidad de Dios en el Doral."
        />

        <ol className="relative grid gap-10 md:grid-cols-4 md:gap-8">
          {/* Timeline rule */}
          <div aria-hidden="true" className="absolute left-0 right-0 top-[1.15rem] hidden h-px bg-ink/15 md:block" />
          {historyTimeline.map((item) => (
            <li key={item.year} className="reveal relative border-l border-ink/15 pl-6 md:border-l-0 md:pl-0">
              <span aria-hidden="true" className="absolute -left-[5px] top-3 h-[9px] w-[9px] rounded-full bg-ember ring-4 ring-cream md:left-0" />
              <p className="mb-4 font-display text-4xl font-medium text-ink md:pt-10">{item.year}</p>
              <h3 className="mb-2 text-lg font-semibold text-ink">{item.title}</h3>
              <p className="text-[0.95rem] leading-relaxed text-ink-muted">{item.description}</p>
            </li>
          ))}
        </ol>

        <div className="reveal mt-20 grid items-center gap-8 rounded-[2rem] bg-lagoon-soft p-8 md:grid-cols-[auto_1fr] md:gap-12 md:p-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lagoon text-white">
            <Home className="h-7 w-7" strokeWidth={1.6} aria-hidden="true" />
          </div>
          <div>
            <h3 className="mb-3 text-3xl font-medium text-ink">Grupos en casa</h3>
            <p className="max-w-prose leading-relaxed text-ink-soft">
              En el inicio, nuestra iglesia comenzó con un pequeño grupo que se reunía para crecer en fe. Hoy, estos grupos son el corazón de nuestra iglesia: espacios íntimos donde oramos, estudiamos la Palabra y nos apoyamos mutuamente. A través de los Grupos de Edificación, buscamos que nadie camine solo.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default History
