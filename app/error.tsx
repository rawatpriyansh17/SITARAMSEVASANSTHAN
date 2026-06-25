'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Page render failed:', error)
  }, [error])

  return (
    <main className="flex min-h-screen items-center justify-center bg-pink-50 px-4 py-10">
      <section className="w-full max-w-xl rounded-2xl border-2 border-r-8 border-b-8 border-pink-500 bg-white p-6 text-center shadow-[0_20px_60px_rgba(190,24,93,0.18)] sm:p-8">
        <p className="font-mono text-xs font-extrabold uppercase tracking-[0.18em] text-pink-600">
          Something went wrong!
        </p>
        <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-pink-900 sm:text-4xl">
          This page could not load properly.
        </h1>
        <p className="mx-auto mt-3 max-w-md font-mono text-sm font-semibold leading-relaxed text-pink-700 sm:text-base">
          Please try again and refresh the page. If the problem persists, contact us at{'  sansthansitaramseva@gmail.com'}          
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-xl bg-linear-to-b from-pink-500 to-pink-700 px-5 py-3 font-mono text-sm font-extrabold text-white shadow-lg shadow-pink-500/30 transition-transform hover:scale-[1.03] active:scale-95"
        >
          Refresh Page
        </button>
      </section>
    </main>
  )
}
