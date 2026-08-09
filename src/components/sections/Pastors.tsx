import SectionHeading from '@/components/ui/SectionHeading'

const pastors = [
  {
    role: 'Pastores principales',
    names: 'Jhon y Angela Arévalo',
    initials: 'J & A',
    paragraphs: [
      'Jhon y Angela Arévalo son los pastores principales de Iglesia Vida con Vida Miami. Su pasión es ver vidas transformadas por el amor de Dios y familias restauradas por el poder de Su Palabra.',
      'Con corazones dispuestos a servir, lideran con fe, humildad y una visión clara: levantar una iglesia donde cada persona pueda conocer a Jesús de manera real, crecer espiritualmente y vivir una vida plena en Él.',
      'Bajo su liderazgo, Vida con Vida se ha convertido en una familia espiritual donde todos son bienvenidos, valorados y amados, sin importar su historia o trasfondo.',
    ],
  },
  {
    role: 'Co-pastores',
    names: 'Mauricio y Marilei Ramírez',
    initials: 'M & M',
    paragraphs: [
      'Mauricio y Marilei Ramírez sirven como co-pastores en Iglesia Vida con Vida Miami, apoyando la visión pastoral con compromiso, alegría y amor por las personas.',
      'Su ministerio refleja un corazón de servicio y una profunda pasión por acompañar a otros en su crecimiento espiritual. Juntos trabajan para fortalecer la fe, fomentar la unidad y crear un ambiente donde las familias puedan encontrar esperanza y propósito en Cristo.',
    ],
  },
]

const Pastors = () => {
  return (
    <section id="pastors" className="bg-sand py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Liderazgo pastoral"
          title="Formando discípulos, transformando generaciones"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {pastors.map((pastor) => (
            <article key={pastor.names} className="reveal flex flex-col rounded-[2rem] bg-cream p-8 md:p-10">
              <div className="mb-8 flex items-center gap-5">
                <div
                  aria-hidden="true"
                  className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-ink font-display text-lg italic text-gold"
                >
                  {pastor.initials}
                </div>
                <div>
                  <p className="eyebrow mb-1 text-ember-deep">{pastor.role}</p>
                  <h3 className="text-2xl font-medium text-ink md:text-3xl">{pastor.names}</h3>
                </div>
              </div>
              <div className="space-y-4 leading-relaxed text-ink-muted">
                {pastor.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pastors
