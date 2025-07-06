import { Analytics } from "@vercel/analytics/react"
import Header from '@/app/components/Header'
import PostSection from '@/app/components/PostSection'
import Services from '@/app/components/Services'
import Footer from '@/app/components/Footer'
import Link from 'next/link'
import PulsatingButton from "@/app/components/PulsatingButton";
import { LanguageSwitch, LanguageToggle } from '@/app/components/LanguageSwitch'
import ObserverProvider from '@/app/components/ObserverProvider';
export default function HomePage() {


  return (
    <ObserverProvider>
                <Analytics />
       <Header />
      <div className=" min-h-screen w-full max-w-full overflow-hidden bg-gradient-to-b from-pink-100  via-purple-400 to-pink-600">

       
        <main className="container mx-auto p-4 ">
        <Services />
        <div className="motion-preset-rebound-down motion-delay-[400ms] ">
          <div className="text-center mt-2 md:mb-2 ">
              <Link href="/latest-event" className=" text-xl md:text-2xl font-semibold transition-colors inline-block rounded-2xl">
              <div className="motion-translate-y-loop-25 motion-duration-[3s] motion-ease-spring-smooth ">
                <PulsatingButton><LanguageSwitch
                                  en="👉 Click here for information on upcoming programs..."
                                  hi="👉 संस्था द्वारा संचालित आगामी कार्यक्रम की जानकारी की लिए यहाँ क्लिक करें..."
                                  tailwindStyles={{
                                    en: "font-mono text-white text-lg md:text-2xl p-3 font-extrabold bg-gradient-to-b from-pink-500 to-pink-700 rounded-2xl",
                                    hi: "text-white text-2xl space-x-10 p-2 font-semibold bg-gradient-to-b from-pink-500 to-pink-700 rounded-2xl"
                                  }}
                                />
                </PulsatingButton>
              </div></Link>
            </div>
        </div>
            <PostSection />
        </main>

      </div>
              <Footer />
    </ObserverProvider>
  )
}