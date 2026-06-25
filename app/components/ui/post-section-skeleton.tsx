'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Skeleton } from '@/app/components/ui/skeleton'

const cardTransition = {
  duration: 1.25,
  repeat: Infinity,
  repeatType: 'reverse' as const,
  ease: 'easeInOut' as const,
}

const shimmerTransition = {
  duration: 1.35,
  repeat: Infinity,
  ease: 'easeInOut' as const,
}

export function PostSectionSkeleton() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative container mx-auto px-4 py-5" aria-label="Loading previous programs">
      <div className="mb-5 mt-2 flex items-center gap-3">
        <motion.div
          className="h-px flex-1 bg-linear-to-b from-pink-600 via-fuchsia-500 to-transparent"
          animate={shouldReduceMotion ? undefined : { opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          animate={shouldReduceMotion ? undefined : { opacity: [0.72, 1, 0.72], scale: [0.99, 1.02, 0.99] }}
          transition={{ duration: 1.35, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Skeleton className="h-10 w-48 rounded-xl bg-linear-to-b from-purple-600 via-purple-500 to-violet-600 shadow-lg shadow-pink-700/20 sm:w-64" />
        </motion.div>
        <motion.div
          className="h-px flex-1 bg-linear-to-b from-pink-600 via-fuchsia-500 to-transparent"
          animate={shouldReduceMotion ? undefined : { opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
        />
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <motion.div
            key={index}
            className="relative grid overflow-hidden rounded-xl border-2 border-r-4 border-b-4 border-pink-500 bg-white/90 shadow-[0_12px_28px_rgba(190,24,93,0.16)]"
            initial={shouldReduceMotion ? false : { opacity: 0.65, y: 8 }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: [0.72, 1, 0.72],
                    y: [0, -3, 0],
                    boxShadow: [
                      '0 12px 28px rgba(190,24,93,0.14)',
                      '0 18px 38px rgba(190,24,93,0.24)',
                      '0 12px 28px rgba(190,24,93,0.14)',
                    ],
                  }
            }
            transition={{ ...cardTransition, delay: index * 0.12 }}
          >
            {!shouldReduceMotion && (
              <motion.div
                className="pointer-events-none absolute inset-y-0 z-10 w-2/5 bg-linear-to-r from-transparent via-white/55 to-transparent"
                initial={{ x: '-120%', skewX: -12 }}
                animate={{ x: '260%', skewX: -12 }}
                transition={{ ...shimmerTransition, delay: index * 0.12 }}
              />
            )}
            <Skeleton className="aspect-[4/3] w-full rounded-none bg-linear-to-br from-pink-400 via-fuchsia-300 to-violet-400" />
            <div className="border-t-2 border-pink-100 bg-pink-50/90 p-5">
              <div className="mb-4 flex items-center gap-2">
                <Skeleton className="size-4 shrink-0 rounded-full bg-pink-500" />
                <Skeleton className="h-5 w-4/5 rounded-md bg-linear-to-b from-pink-400 via-fuchsia-300 to-pink-400" />
              </div>
              <Skeleton className="mb-2 h-3.5 w-full rounded-md bg-pink-200" />
              <Skeleton className="mb-5 h-3.5 w-2/3 rounded-md bg-pink-200" />
              <Skeleton className="h-9 w-28 rounded-xl bg-linear-to-b from-pink-600 to-fuchsia-700 shadow-md shadow-pink-700/20" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
