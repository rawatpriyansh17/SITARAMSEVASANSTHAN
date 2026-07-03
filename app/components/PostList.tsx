'use client'

import { startTransition, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { ProgressBarLink, useProgressBar } from '@/app/components/progress-bar'
import { useRouter } from 'next/navigation'
import { VideoDialog } from './VideoDialog'
import { type Post, type PostsPagination } from '@/lib/cms-api'
import { Pagination } from './pagination'
import { OptimizedImage } from './optimized-image'
import { Separator } from './ui/separator'
import { ComponentIcon } from 'lucide-react'
import { T } from 'gt-next/client'

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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.2,
        delay: index * 0.05,
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
              thumbnailAlt={post.title_en || 'Program media'}
            />
          ) : (
            <OptimizedImage
              src={getPostImageUrl(post)}
              alt={post.title_en || 'Program media'}
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

function getPostsPageHref(page: number) {
  return `/?postsPage=${page}#posts-section-title`
}

export default function PostList({
  posts,
  pagination,
}: {
  posts: Post[]
  pagination: PostsPagination
}) {
  const router = useRouter()
  const progress = useProgressBar()

  const goToPage = (page: number) => {
    if (page === pagination.page) return

    progress.start()
    startTransition(() => {
      router.push(getPostsPageHref(page), { scroll: false })
      progress.done()
    })
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
        posts.length <= 4
          ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5"
          : "masonry-container"
      }>
        {posts.map((post, index) => (
          <div key={post.id} className={posts.length <= 4 ? "h-fit" : "masonry-item"}>
            <PostItem post={post} index={index} />
          </div>
        ))}
      </div>

      {pagination.totalPages > 1 && (
        <div className="mt-5">
          <Pagination
            totalPages={pagination.totalPages}
            value={pagination.page}
            onChange={goToPage}
          />
        </div>
      )}
    </div>
  )
}
