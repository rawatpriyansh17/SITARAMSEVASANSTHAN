import { fetchPosts } from '@/lib/cms-api'
import { translateCmsText } from '@/lib/translation-helper'
import PostList from './PostList'
import { PostSectionSkeleton } from './ui/post-section-skeleton'
import { T } from 'gt-next'

export { PostSectionSkeleton }

export default async function PostSection({ page }: { page: number }) {
  const postsPage = await fetchPosts(page).catch((error) => {
    console.error('Failed to load posts:', error)
    return null
  })

  if (!postsPage) {
    return (
      <div className="container mx-auto mt-4 p-4">
        <div className="text-center py-5 px-2 bg-red-50 border-2 border-red-300 w-fit mx-auto rounded-lg shadow-lg">
          <p className="text-red-700 font-mono font-extrabold"><T>Failed to load posts.</T></p>
        </div>
      </div>
    )
  }

  const translatedPosts = await Promise.all(
    postsPage.posts.map(async (post) => ({
      ...post,
      title_en: await translateCmsText(post.title_en, 'CMS post title'),
      description_en: await translateCmsText(post.description_en, 'CMS post description'),
    }))
  )

  return <PostList posts={translatedPosts} pagination={postsPage.pagination} />
}
