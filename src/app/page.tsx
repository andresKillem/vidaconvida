import Navigation from '@/components/sections/Navigation'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Values from '@/components/sections/Values'
import History from '@/components/sections/History'
import Pastors from '@/components/sections/Pastors'
import Schedule from '@/components/sections/Schedule'
import Ministries from '@/components/sections/Ministries'
import Community from '@/components/sections/Community'
import DynamicVideos from '@/components/sections/DynamicVideos'
import Gallery from '@/components/sections/Gallery'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Values />
        <History />
        <Pastors />
        <Schedule />
        <Ministries />
        <Community />
        <DynamicVideos />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
