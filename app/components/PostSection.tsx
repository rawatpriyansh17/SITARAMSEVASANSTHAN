import { fetchPosts } from '@/lib/cms-api'
import { translateCmsText } from '@/lib/translation-helper'
import PostList from './PostList'
import { PostSectionSkeleton } from './ui/post-section-skeleton'
import { T } from 'gt-next'

export { PostSectionSkeleton }

async function translatePost(post: Awaited<ReturnType<typeof fetchPosts>>['posts'][number]) {
  try {
    const [title, description] = await Promise.all([
      translateCmsText(post.title_en, 'CMS post title'),
      translateCmsText(post.description_en, 'CMS post description'),
    ])

    return {
      ...post,
      title_en: title,
      description_en: description,
    }
  } catch (error) {
    console.error('Failed to translate post, rendering English fallback:', {
      id: post.id,
      message: error instanceof Error ? error.message : String(error),
    })
    return post
  }
}

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

  const translatedPosts = await Promise.all(postsPage.posts.map(translatePost))

  return <PostList posts={translatedPosts} pagination={postsPage.pagination} />
}
