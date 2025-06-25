import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import Image from 'next/image'
import { LanguageSwitch, LanguageToggle } from '@/app/components/LanguageSwitch'

export default function LatestEventPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-pink-50">
      <Header />
      <h1 className="motion-preset-rebound-left motion-delay-[800ms] text-center">
        <LanguageSwitch
                                          en="Upcoming Programs:"
                                          hi="आगामी कार्यक्रम:"
                                          tailwindStyles={{
                                            en: " font-mono md:text-5xl text-2xl font-extrabold  text-pink-800 mt-3 text-center",
                                            hi: " md:text-5xl font-mono text-3xl font-bold text-pink-800 mt-3 text-center"
                                          }}
                                        />
      </h1>
      <div className="flex items-center justify-center p-1">
        <div className="bg-white rounded-lg shadow-md p-2 w-full sm:w-auto mt-4 sm:mt-8 motion-preset-rebound-left motion-delay-[900ms]"> {/* Adjusted margin */}
          <div >
            <Image
              src="/flyer.png"
              alt="आगामी कार्यक्रम का फ्लायर"
              width={1200}
              height={800}
              layout="responsive"
              className="rounded-xl  motion-preset-rebound-right motion-delay-[900ms]"
              sizes="(max-width: 640px) 100vw, 600px"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
