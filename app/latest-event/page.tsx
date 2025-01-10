import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { LanguageSwitch, LanguageToggle } from '@/components/LanguageSwitch'

export default function LatestEventPage() {
  return (
    <div className="min-h-screen bg-pink-50">
      <Header />
      <h1 className="text-5xl font-bold underline text-pink-800 mt-3 text-center">
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
        <div className="bg-white rounded-lg shadow-md p-2 w-full sm:w-auto mt-4 sm:mt-8"> {/* Adjusted margin */}
          <div >
            <Image
              src="/flyer.png"
              alt="आगामी कार्यक्रम का फ्लायर"
              width={1200}
              height={800}
              layout="responsive"
              className="rounded"
              sizes="(max-width: 640px) 100vw, 600px"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
