import { Arrow } from '@radix-ui/react-tooltip'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-pink-50 px-4 py-10">
      <section className="w-full max-w-3xl rounded-2xl border-2 border-r-8 border-b-8 border-pink-500 bg-white p-6 text-center shadow-[0_20px_60px_rgba(190,24,93,0.18)] sm:p-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center text-4xl font-extrabold text-pink-600 sm:h-24 sm:w-24 sm:text-5xl font-serif">
  404 
        </div>  

        <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-pink-900 sm:text-4xl">
          We could not find this page.
        </h1>
        <p className="mx-auto mt-3 max-w-md font-mono text-sm font-semibold leading-relaxed text-pink-700 sm:text-base">
          The link may be old, or the program page may no longer be available yet.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-linear-to-b from-pink-500 to-pink-700 px-5 py-3 font-mono text-sm font-extrabold text-white shadow-lg shadow-pink-500/30 transition-transform hover:scale-[1.03] active:scale-95"
        >
          Go Home
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Link>
      </section>
    </main>
  )
}
