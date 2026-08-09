import { Facebook, Instagram, Youtube } from 'lucide-react'
import { churchInfo } from '@/lib/church'

const footerLinks = [
  { id: 'about', label: 'Nosotros' },
  { id: 'history', label: 'Historia' },
  { id: 'pastors', label: 'Pastores' },
  { id: 'schedule', label: 'Servicios' },
  { id: 'ministries', label: 'Ministerios' },
  { id: 'donar', label: 'Donar' },
  { id: 'videos', label: 'Mensajes' },
  { id: 'contact', label: 'Contacto' },
]

const socialLinks = [
  { href: churchInfo.social.facebook, label: 'Facebook', icon: Facebook },
  { href: churchInfo.social.instagram, label: 'Instagram', icon: Instagram },
  { href: churchInfo.social.youtube, label: 'YouTube', icon: Youtube },
]

const Footer = () => {
  return (
    <footer className="bg-ink text-cream">
      <div className="section-container py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1fr_1.3fr]">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <img src="/images/logoVida.jpg" alt="" width={48} height={48} className="h-12 w-12 rounded-full ring-1 ring-white/15" />
              <p className="font-display text-xl">Vida con Vida <span className="text-cream/50">Miami</span></p>
            </div>
            <p className="max-w-xs font-display text-2xl italic leading-snug text-cream/85">
              {churchInfo.motto}.
            </p>
            <div className="mt-8 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-cream/80 transition-colors hover:border-white/40 hover:text-cream"
                >
                  <social.icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Pie de página">
            <h2 className="eyebrow mb-5 font-body text-gold">Explora</h2>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="text-cream/70 transition-colors hover:text-cream">{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow mb-5 font-body text-gold">Horarios</h2>
            <ul className="space-y-4 text-cream/70">
              {churchInfo.serviceTimes.map((service) => (
                <li key={service.day}>
                  <span className="block text-cream">{service.day} · {service.time}</span>
                  {service.label}
                </li>
              ))}
            </ul>
            <h2 className="eyebrow mb-3 mt-8 font-body text-gold">Pastores</h2>
            <p className="text-cream/70">Jhon y Angela Arévalo</p>
            <p className="text-sm text-cream/50">Co-pastores: Mauricio y Marilei Ramírez</p>
          </div>

          <div>
            <h2 className="eyebrow mb-5 font-body text-gold">Visítanos</h2>
            <address className="space-y-4 not-italic text-cream/70">
              <a href={churchInfo.mapsUrl} target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-cream">
                {churchInfo.addressLines[0]}
                <br />
                {churchInfo.addressLines[1]}
              </a>
              <a href={churchInfo.phoneHref} className="block transition-colors hover:text-cream">{churchInfo.phoneDisplay}</a>
              <a href={`mailto:${churchInfo.email}`} className="block text-sm transition-colors [overflow-wrap:anywhere] hover:text-cream">{churchInfo.email}</a>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section-container flex flex-col gap-2 py-6 text-sm text-cream/50 md:flex-row md:justify-between">
          <p>&copy; {new Date().getFullYear()} Vida con Vida Miami. Todos los derechos reservados.</p>
          <p>Doral, Florida</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
