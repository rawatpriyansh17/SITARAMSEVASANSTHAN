import { fetchPosts } from '@/lib/cms-api'
import PostList, { PostSectionSkeleton } from './PostList'
import { T } from 'gt-next'
import { tx } from 'gt-next/server'

export { PostSectionSkeleton }

async function translatePostText(value: string, context: string) {
  if (!value?.trim()) return value
  return tx(value, { $context: context })
}

export default async function PostSection() {
  const posts = await fetchPosts().catch((error) => {
    console.error('Failed to load posts:', error)
    return null
  })

  if (!posts) {
    return (
      <div className="container mx-auto mt-4 p-4">
        <div className="text-center py-5 px-2 bg-red-50 border-2 border-red-300 w-fit mx-auto rounded-lg shadow-lg">
          <p className="text-red-700 font-mono font-extrabold"><T>Failed to load posts.</T></p>
        </div>
      </div>
    )
  }

  const translatedPosts = await Promise.all(
    posts.map(async (post) => ({
      ...post,
      title_en: await translatePostText(post.title_en, 'CMS post title'),
      description_en: await translatePostText(post.description_en, 'CMS post description'),
    }))
  )

  return <PostList posts={translatedPosts} />
}
