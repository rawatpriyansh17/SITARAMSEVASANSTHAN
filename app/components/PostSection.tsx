'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import PulsatingButton from "@/app/components/PulsatingButton";
import { LanguageSwitch } from '@/app/components/LanguageSwitch'
import { VideoDialog } from './VideoDialog';
import { fetchPosts, type Post } from '@/lib/cms-api';
import { OptimizedImage } from './optimized-image';

export default function PostSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        console.log('Attempting to fetch posts...'); // Debug log
        const fetchedPosts = await fetchPosts();
        console.log('Fetched posts:', fetchedPosts); // Debug log
        setPosts(fetchedPosts);
        setError(null);
      } catch (error) {
        console.error('Failed to load posts:', error);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  // Helper function to get the correct thumbnail
  const getThumbnailUrl = (post: Post) => {
    if (post.thumbnailUrl) {
      // If it's a CMS thumbnail path, convert to NGOCODE equivalent
      if (post.thumbnailUrl.startsWith('/event-highlights')) {
        return post.thumbnailUrl; // Use the same path in NGOCODE
      }
      // If it's already an ImageKit URL, use it
      if (post.thumbnailUrl.includes('ik.imagekit.io')) {
        return post.thumbnailUrl;
      }
    }
    // Default fallback
    return '/event-highlights1.png';
  };

  if (loading) {
    return (
    <div className="container mx-auto mt-4 p-4 flex justify-center">
      <div className="flex items-center bg-white border-2 border-pink-600 rounded-lg shadow-lg px-4 py-2 w-fit">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-600 mr-2"></div>
        <p className="text-pink-700 font-mono font-extrabold">Loading posts...</p>
      </div>
    </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto mt-4 p-4">
        <div className="text-center py-5 px-2 bg-red-50 border-2 border-red-300 w-fit mx-auto rounded-lg shadow-lg">
          <p className="text-red-700 font-mono font-extrabold">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="container mx-auto mt-4 p-4">
        <div className="text-center py-5 px-2 bg-white border-2 border-pink-600 w-fit mx-auto rounded-lg shadow-lg">
          <p className="text-pink-700 font-mono font-extrabold">No posts available at the moment, Come back again later!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <button className="motion-scale-in-[0.5] motion-translate-x-in-[26%] motion-translate-y-in-[17%] motion-opacity-in-[0%] motion-rotate-in-[24deg] motion-blur-in-[5px] motion-duration-[0.35s] motion-duration-[0.53s]/scale motion-duration-[0.53s]/translate motion-duration-[0.63s]/rotate motion-delay-1500 text-center bg-gradient-to-b from-violet-500 via-purple-800 to-violet-600 p-2 rounded-lg mb-3 mt-8 md:mt-4">
        <LanguageSwitch
          en="Previous programs run by our NGO:-"
          hi="हमारे NGO द्वारा संचालित पूर्व प्रोग्राम:-"
          tailwindStyles={{
            en: "font-mono text-white text-lg md:text-2xl font-extrabold",
            hi: "text-white text-xl md:text-2xl font-bold"
          }}
        />
      </button>

      {posts.map((post, index) => (
        <div key={post.id} className={`mt-8 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="w-full md:w-1/2 relative">
              {post.mediaType === 'video' ? (
                <VideoDialog
                  className="w-full"
                  animationStyle="from-center"
                  videoSrc={post.mediaUrl}
                  thumbnailSrc={getThumbnailUrl(post)}
                  thumbnailAlt={post.title_en}
                />
              ) : (
                <OptimizedImage
                  src={post.mediaUrl}
                  alt={post.title_en}
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-lg shadow-lg"
                  transformation={[
                    { width: 800, height: 600, crop: 'maintain_ratio' },
                    { quality: 80 },
                    { format: 'webp' }
                  ]}
                />
              )}
            </div>
            
            <div className="w-full md:w-1/2 bg-pink-100 p-8 rounded-lg flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4 text-pink-800">
                <LanguageSwitch
                  en={post.title_en}
                  hi={post.title_hi}
                  tailwindStyles={{
                    en: "font-mono text-2xl font-bold text-pink-800",
                    hi: "text-2xl font-bold text-pink-800"
                  }}
                />
              </h3>
              <p className="text-pink-700 mb-6">
                <LanguageSwitch
                  en={post.description_en}
                  hi={post.description_hi}
                  tailwindStyles={{
                    en: "mb-3 font-mono font-bold text-xs md:text-base text-pink-700",
                    hi: "mb-3 font-semibold text-sm md:text-base text-pink-700"
                  }}
                />
              </p>
              
              {post.eventPageSlug && (
                <div className='w-1/3'>
                  <PulsatingButton>
                    <Link href={`/events/${post.eventPageSlug}`} className="bg-pink-500 text-nowrap text-white size-full rounded-lg">
                      <LanguageSwitch
                        en="Know More..."
                        hi="और जाने..."
                        tailwindStyles={{
                          en: "bg-gradient-to-b from-pink-500 to-pink-700 font-mono text-lg font-semibold py-3 px-[60px] transition-colors text-center",
                          hi: "bg-gradient-to-b from-pink-500 to-pink-700 text-xl font-bold py-3 px-[60px] transition-colors text-center"
                        }}
                      />
                    </Link>
                  </PulsatingButton>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

