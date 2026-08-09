import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  lead?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  id?: string
  className?: string
}

const SectionHeading = ({ eyebrow, title, lead, align = 'left', tone = 'light', id, className }: SectionHeadingProps) => {
  const isDark = tone === 'dark'

  return (
    <div className={cn('reveal mb-12 md:mb-16', align === 'center' && 'mx-auto text-center', 'max-w-3xl', className)}>
      <p className={cn('eyebrow mb-4', isDark ? 'text-gold' : 'text-ember-deep')}>{eyebrow}</p>
      <h2
        id={id}
        className={cn('text-4xl font-medium leading-[1.1] md:text-5xl', isDark ? 'text-cream' : 'text-ink')}
      >
        {title}
      </h2>
      {lead && (
        <p className={cn('mt-5 text-lg leading-relaxed md:text-xl', isDark ? 'text-cream/75' : 'text-ink-muted', align === 'center' && 'mx-auto')}>
          {lead}
        </p>
      )}
    </div>
  )
}

export default SectionHeading
