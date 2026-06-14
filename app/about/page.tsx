import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import Image from 'next/image'
import * as motion from 'motion/react-client'
import { delayed, reboundRight, softReveal } from '@/app/components/motion-presets'

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-pink-50 via-white to-pink-100">
      <Header />

      <main className="flex flex-1 items-center px-4 py-8 md:py-12">
        <section className="mx-auto grid w-full gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] lg:items-center">
          <motion.div
            className="overflow-hidden rounded-2xl border-4 border-white bg-white shadow-2xl shadow-pink-900/15"
            variants={reboundRight}
            {...delayed(0.22)}
          >
            <Image
              src="/group-photo-mobile.png"
              alt="Sitaram Seva Sansthan members standing together"
              width={1086}
              height={1448}
              priority
              sizes="(max-width: 767px) 100vw, 0vw"
              className="h-auto w-full object-cover md:hidden"
            />
            <Image
              src="/group-photo-desktop.png"
              alt="Sitaram Seva Sansthan members standing together"
              width={1747}
              height={900}
              priority
              sizes="(min-width: 768px) 58vw, 0vw"
              className="hidden h-auto w-full object-cover md:block"
            />
          </motion.div>

          <motion.div
            className="rounded-2xl border border-r-4 border-b-4  border-pink-200 bg-white/90 p-6 shadow-xl shadow-pink-900/10 md:p-8"
            variants={softReveal}
            {...delayed(0.32)}
          >
            <h1 className="text-pretty font-serif text-4xl font-extrabold leading-tight text-pink-900 md:text-5xl">
              🎗️ Seva se Samadhan
            </h1>
            <p className="mt-4 font-mono text-base font-semibold leading-7 text-pink-800 md:text-lg">
              “Seva se Samadhan” means finding solutions through service. For Sitaram Seva Sansthan, it is a simple promise: listen closely, respond with dignity, and stand beside people when support matters most.
            </p>
            <div className="mt-6 rounded-xl border border-r-4 border-b-4 border-pink-700 bg-pink-50 p-5">
              <h2 className="font-serif text-2xl font-bold text-pink-900">✊ Our Mission</h2>
              <p className="mt-2 font-mono text-sm font-semibold leading-7 text-pink-800 md:text-base">
                To support women battling cancer, organize health and donation initiatives, and provide timely help to families and students through practical, community-led service.
              </p>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
