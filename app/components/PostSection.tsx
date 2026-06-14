import { fetchPosts } from '@/lib/cms-api'
import PostList, { PostSectionSkeleton } from './PostList'

export { PostSectionSkeleton }

export default async function PostSection() {
  const posts = await fetchPosts().catch((error) => {
    console.error('Failed to load posts:', error)
    return null
  })

  if (!posts) {
    return (
      <div className="container mx-auto mt-4 p-4">
        <div className="text-center py-5 px-2 bg-red-50 border-2 border-red-300 w-fit mx-auto rounded-lg shadow-lg">
          <p className="text-red-700 font-mono font-extrabold">Failed to load posts.</p>
        </div>
      </div>
    )
  }

  return <PostList posts={posts} />
}
