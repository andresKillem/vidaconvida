import Navigation from '@/components/sections/Navigation'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Schedule from '@/components/sections/Schedule'
import Ministries from '@/components/sections/Ministries'
import Gallery from '@/components/sections/Gallery'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Schedule />
      <Ministries />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  )
}
