import { Suspense } from 'react'
import { Analytics } from "@vercel/analytics/react"
import Header from '@/app/components/Header'
import PostSection, { PostSectionSkeleton } from '@/app/components/PostSection'
import Services from '@/app/components/Services'
import Footer from '@/app/components/Footer'

function getPostsPage(value: string | undefined) {
  const page = Number.parseInt(value ?? '', 10)
  return Number.isSafeInteger(page) && page > 0 ? page : 1
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ postsPage?: string }>
}) {
  const { postsPage } = await searchParams

  return (
    <>
      <Analytics />
      <div className=" w-full max-w-full overflow-hidden bg-linear-to-b from-pink-50  via-purple-400  to-pink-700">
      <Header />
        <main className="container mx-auto p-4">
          <Services />
          <Suspense fallback={<PostSectionSkeleton />}>
            <PostSection page={getPostsPage(postsPage)} />
          </Suspense>
        </main>
      </div>
      <Footer />
    </>
  )
}
