'use client'

import { useRef, useState, useSyncExternalStore } from 'react'
import { motion, useInView } from 'motion/react'
import { ProgressBarLink } from '@/app/components/progress-bar'
import { VideoDialog } from './VideoDialog'
import { type Post } from '@/lib/cms-api'
import { OptimizedImage } from './optimized-image'
import { Skeleton } from '@/app/components/ui/skeleton'
import { Separator } from './ui/separator'
import { ComponentIcon } from 'lucide-react'
import { T, useGT } from 'gt-next/client'

const DESKTOP_POSTS_PER_PAGE = 16
const MOBILE_POSTS_PER_PAGE = 8

function subscribeToViewport(callback: () => void) {
  window.addEventListener('resize', callback, { passive: true })
  return () => window.removeEventListener('resize', callback)
}

function getPostsPerPageSnapshot() {
  return window.innerWidth >= 1024 ? DESKTOP_POSTS_PER_PAGE : MOBILE_POSTS_PER_PAGE
}

function getServerPostsPerPageSnapshot() {
  return DESKTOP_POSTS_PER_PAGE
}

function usePostsPerPage() {
  return useSyncExternalStore(
    subscribeToViewport,
    getPostsPerPageSnapshot,
    getServerPostsPerPageSnapshot
  )
}

function getThumbnailUrl(post: Post) {
  if (post.thumbnailUrl) {
    if (post.thumbnailUrl.startsWith('/event-highlights')) {
      return post.thumbnailUrl
    }

    if (post.thumbnailUrl.includes('ik.imagekit.io')) {
      return post.thumbnailUrl
    }
  }

  return '/event-highlights1.png'
}

function getPostImageUrl(post: Post) {
  return post.mediaUrl?.trim() || '/placeholder.jpg'
}

function PostItem({ post, index }: { post: Post; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const gt = useGT()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.3,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      className="h-fit"
    >
      <div className="grid grid-cols-1 gap-1">
        <div className="relative">
          {post.mediaType === 'video' ? (
            <VideoDialog
              className="w-full"
              animationStyle="from-center"
              videoSrc={post.mediaUrl}
              thumbnailSrc={getThumbnailUrl(post)}
              thumbnailAlt={post.title_en || gt('Program media')}
            />
          ) : (
            <OptimizedImage
              src={getPostImageUrl(post)}
              alt={post.title_en || gt('Program media')}
              width={800}
              height={600}
              sizes="(max-width: 1024px) 100vw, 25vw"
              className="w-full h-auto rounded-lg shadow-lg border-2 border-r-4 border-purple-700"
              transformation={[
                { width: 1200, crop: 'at_max' },
                { quality: 90 },
                { format: 'auto' }
              ]}
            />
          )}
        </div>

        <motion.div
          className="bg-pink-50 border-r-8 border-2 border-b-8 border-pink-700 p-6 rounded-xl flex flex-col justify-center"
          whileHover={{
            scale: 1.02,
            boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)"
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.h3
            className="flex font-bold "
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="relative flex h-4 w-4 mt-1 md:mt-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-gradient-to-b from-pink-500 to-pink-600" />
            </span>
            <span className="font-mono text-base md:text-lg font-bold text-pink-900">
              {post.title_en}
            </span>
          </motion.h3>

          <motion.p
            className="text-pink-700 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {post.description_en &&(
              <span className="mb-3 font-mono font-bold text-xs md:text-sm text-pink-600">
                👉 { post.description_en}
              </span>
            )}
          </motion.p>

          {post.eventPageSlug && (
            <motion.div
              className="w-fit min-w-32 mt-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ProgressBarLink
                href={`/events/${post.eventPageSlug}`}
                className="block text-white bg-gradient-to-b text-nowrap from-pink-500 to-pink-700 font-mono text-xs md:text-base font-semibold py-2 px-4 transition-colors text-center rounded-xl w-full shadow-xl shadow-pink-500/50"
              >
                <T>Know More...</T>
              </ProgressBarLink>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

interface PaginationControlsProps {
  totalPages: number
  currentPage: number
  goToPrevious: () => void
  goToNext: () => void
  goToPage: (page: number) => void
}

function PaginationControls({
  totalPages,
  currentPage,
  goToPrevious,
  goToNext,
  goToPage,
}: PaginationControlsProps) {
  if (totalPages <= 1) return null

  return (
    <motion.div
      className="flex justify-center items-center my-3 gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.1 }}
    >
      <motion.button
        type="button"
        onClick={goToPrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-xl font-mono font-bold border-2 transition-all text-xs text-nowrap ${
          currentPage === 1
            ? 'bg-gradient-to-b from-gray-300 to-gray-400 text-gray-700 border-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-b from-violet-700 to-purple-900 text-white border-pink-700 hover:scale-105'
        }`}
        whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
        whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
      >
        ← Previous
      </motion.button>

      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <motion.button
            type="button"
            key={page}
            onClick={() => goToPage(page)}
            className={`w-10 h-10 rounded-xl font-mono font-bold border-2 transition-all text-xs ${
              currentPage === page
                ? 'bg-gradient-to-b from-blue-500 to-purple-700 text-white border-purple-700'
                : 'bg-white text-pink-700 border-pink-700 hover:bg-pink-50 border-2'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            {page}
          </motion.button>
        ))}
      </div>

      <motion.button
        type="button"
        onClick={goToNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-xl font-mono font-bold border-2 transition-all text-nowrap text-xs ${
          currentPage === totalPages
            ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-b from-violet-700 to-purple-900 text-white border-pink-700 hover:scale-105'
        }`}
        whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
        whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
      >
        Next →
      </motion.button>
    </motion.div>
  )
}

export function PostSectionSkeleton() {
  return (
    <section className="container mx-auto px-4 relative" aria-label="Loading previous programs">
      <Skeleton className="mb-3 mt-6 h-12 w-72 rounded-lg bg-[#F4F5F7]" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="grid grid-cols-1 gap-1">
            <Skeleton className="aspect-[4/3] w-full rounded-lg bg-[#F4F5F7]" />
            <div className="rounded-xl border-2 border-r-8 border-b-8 border-pink-200 bg-pink-50 p-6">
              <Skeleton className="mb-4 h-5 w-4/5 bg-[#F4F5F7]" />
              <Skeleton className="mb-2 h-4 w-full bg-[#F4F5F7]" />
              <Skeleton className="mb-5 h-4 w-2/3 bg-[#F4F5F7]" />
              <Skeleton className="h-10 w-32 rounded-xl bg-[#F4F5F7]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function PostList({ posts }: { posts: Post[] }) {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = usePostsPerPage()
  const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (safeCurrentPage - 1) * postsPerPage
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    document.getElementById('posts-section-title')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  const goToPrevious = () => {
    if (safeCurrentPage > 1) {
      goToPage(safeCurrentPage - 1)
    }
  }

  const goToNext = () => {
    if (safeCurrentPage < totalPages) {
      goToPage(safeCurrentPage + 1)
    }
  }

  if (posts.length === 0) {
    return (
      <motion.div
        className="container mx-auto mt-4 p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center py-5 px-2 bg-white border-2 border-pink-600 w-fit mx-auto rounded-lg shadow-lg">
          <p className="text-pink-700 font-mono font-extrabold">
            <T>No posts available at the moment, come back again later!</T>
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="container mx-auto p-4 relative">
        <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
        <Separator className="flex-1 mask-l-from-60% bg-linear-to-l from-purple-600 via-pink-600 to-pink-700" />
          <ComponentIcon className="size-4 md:size-6 text-purple-600" />
      <motion.button
        type="button"
        id="posts-section-title"
        className="flex text-center bg-gradient-to-b from-violet-500 via-purple-800 to-violet-600 p-2 px-4 rounded-lg mb-3 mt-3 md:mt-2 font-mono text-white text-xs md:text-base font-black"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.25)" }}
      >

         <T>🌟 Recent Activities</T>
         <span className="hidden md:block ml-2">
          <T>& Updates</T>
          </span>

        </motion.button>
      <ComponentIcon className="size-4 md:size-6 text-purple-600" />
        < Separator className="flex-1 mask-r-from-60% bg-linear-to-r from-purple-600 via-pink-600 to-pink-700"  />
    </div>

      <div className={
        currentPosts.length <= 4
          ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5"
          : "masonry-container"
      }>
        {currentPosts.map((post, index) => (
          <div key={post.id} className={currentPosts.length <= 4 ? "h-fit" : "masonry-item"}>
            <PostItem post={post} index={index} />
          </div>
        ))}
      </div>

      <PaginationControls
        totalPages={totalPages}
        currentPage={safeCurrentPage}
        goToPrevious={goToPrevious}
        goToNext={goToNext}
        goToPage={goToPage}
      />
    </div>
  )
}
