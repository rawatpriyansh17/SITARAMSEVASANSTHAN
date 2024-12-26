import { Analytics } from "@vercel/analytics/react"
import Header from '@/components/Header'
import ImageCarousel from '@/components/ImageCarousel'
import Services from '@/components/Services'
import Footer from '@/components/Footer'
import Link from 'next/link'
import PulsatingButton from "@/components/PulsatingButton";
import { LanguageSwitch, LanguageToggle } from '@/components/LanguageSwitch'
import ObserverProvider from '@/components/ObserverProvider';
export default function HomePage() {


  return (
    <ObserverProvider>
      <div className=" min-h-screen bg-pink-50">
          <Analytics />
        <Header />
        <main className="container mx-auto mt-8 px-4">
        <Services />
        <br />
        <div className="motion-preset-rebound-down motion-delay-[400ms]">
          <div className="text-center mt-8 mb-8 ">
              <Link href="/latest-event" className=" text-xl md:text-2xl font-semibold transition-colors inline-block">
              <div className="-motion-translate-y-loop-50 motion-duration-[3s] motion-ease-spring-smooth">
                <PulsatingButton><LanguageSwitch
                                  en="Click here for information on upcoming programs..."
                                  hi="संस्था द्वारा संचालित आगामी कार्यक्रम की जानकारी की लिए यहाँ क्लिक करें..."
                                  tailwindStyles={{
                                    en: "font-mono text-white text-lg md:text-2xl p-3 font-extrabold",
                                    hi: "text-white text-2xl space-x-8 p-2 font-semibold"
                                  }}
                                />
                </PulsatingButton>
              </div></Link>;
            </div>
        </div>
            <ImageCarousel />
        </main>
        <Footer />
      </div>
    </ObserverProvider>
  )
}