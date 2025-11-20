import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import GovernmentBody from '../components/GovernmentBody'
import Footer from '../components/Footer'
import Gallery from '../components/Gallery'
import BoardBody from '../components/boardBody'
import ImportantLinks from '../components/ImportantLinks'
import APMCGlance from '../components/APMCGlance'
import TodayRate from '../components/TodayRate'
import AboutFront from '../components/AboutFront'

export default function Home() {
  return (
    <>
      <Head>
        <title>APMC - Agricultural Produce Market Committee</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Official site of the Agricultural Produce Market Committee. View market stats, commodity rates, and information about governing bodies." />
        
      </Head>

      <Header />

      <main className="main-content">
        <Hero />
        <TodayRate />
        <AboutFront />
        <GovernmentBody />
        <BoardBody />
        <APMCGlance />
        <Gallery />
        <ImportantLinks />
      </main>

      <Footer />
    </>
  )
}
