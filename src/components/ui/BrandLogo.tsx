import { cn } from '@/lib/utils'

interface BrandLogoProps {
  className?: string
}

// The logo's arcs run almost to the edge of its square artwork, so cropping it to a circle
// cut them off. Instead the artwork sits slightly inset on a black disc that matches its background.
const BrandLogo = ({ className }: BrandLogoProps) => (
  <span
    aria-hidden="true"
    className={cn('flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-black ring-1 ring-white/15', className)}
  >
    <img src="/images/logoVida.jpg" alt="" width={480} height={480} className="h-[88%] w-[88%] object-contain" />
  </span>
)

export default BrandLogo
