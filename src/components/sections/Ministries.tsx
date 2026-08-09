import { ArrowRight, FileText, Mail, Smartphone } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { churchInfo } from '@/lib/church'

const ministries = [
  { title: 'Vida Kids', description: 'Enseñando la palabra de Dios a los más pequeños con amor, creatividad y diversión.', accent: 'bg-lagoon' },
  { title: 'Vida Youth', description: 'Un espacio vibrante donde los jóvenes de 12-17 años crecen en fe, amistad y propósito.', accent: 'bg-ember' },
  { title: 'Adoración', description: 'Guiando a la congregación a experimentar la presencia de Dios a través de la música.', accent: 'bg-gold' },
  { title: 'Ayuda pastoral & sanidad interior', description: 'Acompañándote en tu caminar espiritual hacia la libertad, sanidad y restauración en Cristo.', accent: 'bg-lagoon' },
  { title: 'Intercesión', description: 'Guerreros de oración intercediendo por las necesidades de nuestra comunidad.', accent: 'bg-ember' },
  { title: 'Servicio', description: 'Sirviendo con excelencia para crear un ambiente acogedor para todos.', accent: 'bg-gold' },
]

// Zelle QR exactly as published by the church; it encodes the Zelle recipient, so confirm with them before changing it
const ZELLE_QR_URL =
  'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://enroll.zellepay.com/qr-codes?data=eyJuYW1lIjoiRElTQ0lQTEVTIE9GIENIUklTVCBDSFVSQ0ggU1BBTklTSCBJTkMuIiwiYWN0aW9uIjoicGF5bWVudCIsInRva2VuIjoic3BhbmlzaEB2aWRhY29udmlkYS5jb20ifQ==&bgcolor=ffffff&color=000000&format=png&ecc=H'

const givingMethods = [
  { icon: Smartphone, title: 'Zelle / transferencia', detail: churchInfo.email, href: `mailto:${churchInfo.email}` },
  { icon: FileText, title: 'Cheque', detail: 'A nombre de “Disciple of Christ Church Spanish”' },
  { icon: Mail, title: 'Sobre de ofrendas', detail: 'Disponible durante el servicio' },
]

const Ministries = () => {
  return (
    <section id="ministries" className="bg-cream py-24 md:py-32">
      <div className="section-container">
        <SectionHeading eyebrow="Nuestros ministerios" title="Áreas donde puedes servir y crecer" />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ministries.map((ministry) => (
            <li key={ministry.title} className="reveal group flex flex-col rounded-3xl border border-ink/10 bg-white/60 p-7 transition-colors hover:border-ink/25 md:p-8">
              <span aria-hidden="true" className={`mb-8 h-1.5 w-10 rounded-full ${ministry.accent}`} />
              <h3 className="mb-3 text-2xl font-medium text-ink">{ministry.title}</h3>
              <p className="mb-8 leading-relaxed text-ink-muted">{ministry.description}</p>
              <a href="#contact" className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-ember-deep">
                Quiero servir aquí
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        {/* Pastoral care */}
        <div className="reveal mt-24 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-4 text-ember-deep">Ayuda pastoral & sanidad interior</p>
            <h3 className="mb-6 text-3xl font-medium leading-tight text-ink md:text-4xl">No estás solo(a)</h3>
            <figure className="border-l-2 border-ember pl-6">
              <blockquote className="font-display text-2xl italic leading-snug text-ink">
                &ldquo;El Señor está cerca de los quebrantados de corazón y salva a los de espíritu abatido.&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-sm text-ink-muted">Salmo 34:18</figcaption>
            </figure>
          </div>
          <div className="space-y-5 leading-relaxed text-ink-soft">
            <p>
              En Iglesia Vida con Vida Miami, creemos en un Dios que restaura, sana y transforma corazones. Nuestro ministerio de ayuda pastoral y sanidad interior está dedicado a acompañarte en tu caminar espiritual, ayudándote a encontrar libertad y paz en Cristo.
            </p>
            <p>
              Ofrecemos espacios de consejería, oración y acompañamiento guiados por el Espíritu Santo, donde podrás recibir dirección bíblica, apoyo emocional y ministración personal. Sabemos que todos atravesamos momentos de dolor, confusión o desánimo, pero también sabemos que Dios es fiel para sanar cada herida y renovar tu esperanza.
            </p>
            <p>
              Si deseas agendar una cita o hablar con un miembro del equipo pastoral, escríbenos a{' '}
              <a href={`mailto:${churchInfo.email}`} className="text-link break-all">{churchInfo.email}</a> o llama al{' '}
              <a href={churchInfo.phoneHref} className="text-link whitespace-nowrap">{churchInfo.phoneDisplay}</a>.
            </p>
            <p className="font-medium text-ink">
              Estamos aquí para caminar contigo hacia la sanidad y la restauración que solo Dios puede dar.
            </p>
          </div>
        </div>

        {/* Giving */}
        <div id="donar" className="reveal mt-24 overflow-hidden rounded-[2rem] bg-gold-soft">
          <div className="grid items-center gap-10 p-8 md:grid-cols-[auto_1fr] md:gap-14 md:p-12">
            <figure className="mx-auto text-center">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <img
                  src={ZELLE_QR_URL}
                  alt="Código QR de Zelle para donar a Disciples of Christ Church Spanish Inc."
                  width={224}
                  height={224}
                  loading="lazy"
                  className="h-48 w-48 md:h-56 md:w-56"
                />
              </div>
              <figcaption className="mt-3 text-sm text-ink-muted">Escanea para donar vía Zelle</figcaption>
            </figure>

            <div className="min-w-0">
              <p className="eyebrow mb-4 text-ember-deep">Formas de contribuir</p>
              <h3 className="mb-8 text-3xl font-medium leading-tight text-ink md:text-4xl">Tu generosidad hace posible que sigamos impactando vidas</h3>

              <ul className="divide-y divide-ink/10 border-y border-ink/10">
                {givingMethods.map((method) => (
                  <li key={method.title} className="flex items-start gap-4 py-4">
                    <method.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-ember" strokeWidth={1.8} aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="font-semibold text-ink">{method.title}</p>
                      {method.href ? (
                        <a href={method.href} className="text-link break-all text-sm">{method.detail}</a>
                      ) : (
                        <p className="text-sm text-ink-muted">{method.detail}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-8 font-display italic text-ink-soft">
                &ldquo;Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre.&rdquo;
                <span className="ml-2 font-body text-sm not-italic text-ink-muted">2 Corintios 9:7</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Ministries
