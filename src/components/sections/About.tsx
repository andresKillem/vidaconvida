import SectionHeading from '@/components/ui/SectionHeading'

const pillars = [
  {
    title: 'Visión',
    description:
      'Nuestra visión es ser una familia de discípulos de Cristo que impacta a nuestra ciudad y a las nuevas generaciones. Queremos que cada persona descubra que en Dios hay propósito, esperanza y un amor que transforma vidas.',
  },
  {
    title: 'Misión',
    description:
      'Formar y acompañar discípulos de Cristo en Miami que vivan una fe auténtica, fundamentada en la Palabra, guiados por el Espíritu Santo y el amor del Padre; una familia espiritual que refleja a Jesús, transforma vidas y deja un impacto eterno en nuestra comunidad y en las nuevas generaciones.',
  },
  {
    title: 'Ciclo completo del discipulado',
    description:
      'Aquí encontrarás amigos, propósito y un lugar donde crecer en tu fe. Porque al final, somos una gran familia de discípulos que vive para amar y servir como Jesús.',
    steps: ['Conquistar', 'Consolidar', 'Edificar', 'Enviar', 'Acompañar'],
  },
]

const About = () => {
  return (
    <section id="about" className="bg-cream py-24 md:py-32">
      <div className="section-container">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Quiénes somos"
              title="Una familia que responde bíblicamente a la vida"
              lead="Somos una iglesia apasionada por Cristo, basada en la Biblia y abierta al mover del Espíritu Santo. Creemos en el amor del Padre que sana, restaura y nos impulsa a impactar a nuestra ciudad y a las nuevas generaciones."
            />
            <figure className="reveal relative hidden overflow-hidden rounded-[2rem] lg:block">
              <img
                src="/images/hero-stage.jpg"
                alt="Equipo de alabanza frente a la cruz en el escenario de la iglesia"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </figure>
          </div>

          <ol className="divide-y divide-ink/10 border-y border-ink/10 lg:mt-24">
            {pillars.map((pillar, index) => (
              <li key={pillar.title} className="reveal grid gap-4 py-10 sm:grid-cols-[4rem_1fr]">
                <span className="font-display text-3xl italic text-ember" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="mb-3 text-2xl font-medium text-ink">{pillar.title}</h3>
                  {pillar.steps && (
                    <p className="mb-4 flex flex-wrap gap-x-3 gap-y-1 text-sm font-semibold uppercase tracking-[0.14em] text-lagoon-deep">
                      {pillar.steps.map((step, stepIndex) => (
                        <span key={step}>
                          {step}
                          {stepIndex < pillar.steps.length - 1 && <span className="ml-3 text-ink/25" aria-hidden="true">→</span>}
                        </span>
                      ))}
                    </p>
                  )}
                  <p className="leading-relaxed text-ink-muted">{pillar.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <figure className="reveal mx-auto mt-24 max-w-3xl text-center">
          <blockquote className="font-display text-3xl font-normal italic leading-snug text-ink md:text-4xl">
            &ldquo;Únete a nuestra familia de fe y descubre el propósito que Dios tiene para tu vida.&rdquo;
          </blockquote>
          <figcaption className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-ink-muted">
            <span>Comunidad auténtica</span>
            <span aria-hidden="true" className="text-ember">✦</span>
            <span>Crecimiento espiritual</span>
            <span aria-hidden="true" className="text-ember">✦</span>
            <span>Propósito eterno</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

export default About
