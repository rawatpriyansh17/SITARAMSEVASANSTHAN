import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import Image from 'next/image'
import * as motion from 'motion/react-client'
import { CalendarX } from 'lucide-react'
import { fetchLatestEvent } from '@/lib/cms-api'
import { delayed, reboundLeft, reboundRight } from '@/app/components/motion-presets'
import { Highlight2 } from '@/app/components/ui/highlight2'

export default async function LatestEventPage() {
  const latestEvent = await fetchLatestEvent()
  const shouldShowFlyer = Boolean(latestEvent?.isActive && latestEvent.imageUrl)

  return (
    <div className="flex min-h-screen flex-col gap-2 overflow-x-hidden bg-pink-50">
      <Header />
      <main className="flex flex-1 flex-col px-4 py-8">
        <div className="flex flex-1 items-start justify-center p-1">
          {shouldShowFlyer ? (
            <motion.div
              className="mt-4 w-full rounded-lg bg-white p-2 shadow-md sm:mt-8 sm:w-auto"
              variants={reboundLeft}
              {...delayed(0.9)}
            >
              <motion.h1
                className="mb-5 px-2 pt-2 text-center"
                variants={reboundLeft}
                {...delayed(0.8)}
              >
                <span className="inline-block max-w-full font-mono text-2xl font-extrabold leading-tight sm:text-3xl md:text-5xl">
                  <Highlight2 className="px-2 py-1 text-white">
                    📌 Upcoming Programs:
                  </Highlight2>
                </span>
              </motion.h1>
              <motion.div variants={reboundRight} {...delayed(0.9)}>
                <Image
                  src={latestEvent!.imageUrl}
                  alt={latestEvent!.imageAlt || 'Upcoming program flyer'}
                  width={1200}
                  height={800}
                  className="h-auto w-full rounded-xl"
                  sizes="(max-width: 640px) 100vw, 600px"
                  priority
                />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className="mt-6 w-full max-w-3xl rounded-2xl border border-r-4 border-b-4 border-pink-500 bg-white px-5 py-8 text-center shadow-[0_18px_50px_rgba(219,39,119,0.12)] sm:px-8 md:mt-10 md:px-12 md:py-10"
              variants={reboundLeft}
              {...delayed(0.9)}
            >
              <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-red-500 text-white ring-1 ring-pink-100 sm:size-16">
                <CalendarX className="size-7 sm:size-8" />
              </div>
              <div className="mx-auto max-w-2xl pb-2">
                <h2 className="font-serif text-base md:text-5xl  font-bold leading-[1.15] text-pink-900 sm:text-4xl">
                  <Highlight2 className="text-white px-2 py-1">
                    No Upcoming Program
                    <br />
                    Right Now
                  </Highlight2>
                </h2>
              </div>
              <p className="mx-auto mt-2 max-w-xl rounded-xl bg-pink-50 p-2 font-mono  font-semibold leading-relaxed text-pink-700 shadow-sm border border-t-3 border-l-3 border-pink-200 text-xs sm:text-base md:p-2">
                🙏 Please check back soon, or use the contact section below for any immediate queries.
              </p>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
