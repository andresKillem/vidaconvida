import Navigation from '@/components/sections/Navigation'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Values from '@/components/sections/Values'
import History from '@/components/sections/History'
import Pastors from '@/components/sections/Pastors'
import Schedule from '@/components/sections/Schedule'
import Ministries from '@/components/sections/Ministries'
import DynamicVideos from '@/components/sections/DynamicVideos'
import Gallery from '@/components/sections/Gallery'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Values />
      <History />
      <Pastors />
      <Schedule />
      <Ministries />
      <DynamicVideos />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  )
}
