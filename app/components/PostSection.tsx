'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import PulsatingButton from "@/app/components/PulsatingButton";
import { LanguageSwitch } from '@/app/components/LanguageSwitch'
import { VideoDialog } from './VideoDialog';
import { fetchPosts, type Post } from '@/lib/cms-api';
import { OptimizedImage } from './optimized-image';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function PostSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8); // default to desktop

  useEffect(() => {
    const updatePostsPerPage = () => {
      setPostsPerPage(window.innerWidth >= 1024 ? 8 : 5);
    };
    updatePostsPerPage();
    window.addEventListener('resize', updatePostsPerPage);
    return () => window.removeEventListener('resize', updatePostsPerPage);
  }, []);

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

  // Pagination calculations
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

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

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to the section with id
    const element = document.getElementById('posts-section-title');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Component for individual Post item
  const PostItem = ({ post, index }: { post: Post; index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const router = useRouter();

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
        key={post.id} 
        className='h-fit'
      >
        <div className="grid grid-cols-1 gap-1">
   
          {/* Post content */}
          <div className="relative ">
              {post.mediaType === 'video' ? (
                <VideoDialog
                  className="w-full "
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
                  className="w-full h-auto rounded-lg shadow-lg border-2 border-r-4 border-purple-700"
                  transformation={[
                    { width: 800, crop: 'at_max' },
                    { quality: 80 },
                    { format: 'webp' }
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
              className="flex font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
        
                <span className="relative flex h-4 w-4 mt-1 md:mt-2 mr-2">
                
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-gradient-to-b from-pink-500 to-pink-600"></span>
                </span>
              <LanguageSwitch
                en={post.title_en}
                hi={post.title_hi}
                tailwindStyles={{
                  en: "font-mono text-base md:text-lg font-bold text-pink-900 ",
                  hi: "text-base md:text-xl font-bold text-pink-900"
                }}
              />
            </motion.h3>
            
            <motion.p 
              className="text-pink-700 "
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <LanguageSwitch
                en={"👉 " + post.description_en}
                hi={"👉 " + post.description_hi}
                tailwindStyles={{
                  en: "mb-3 font-mono font-bold text-xs md:text-sm text-pink-600",
                  hi: "mb-3 font-semibold text-sm text-pink-700"
                }}
              />
            </motion.p>

            {post.eventPageSlug && (
              <motion.div 
                className='w-1/3'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      
                      // Show redirecting toast
                      toast("Redirecting you...", {
                        duration: 3000,
                        style: {
                          background: 'linear-gradient(to bottom, #FF0C86, #A70347)',
                          color: 'white',
                          border: '2px solid #be185d',
                          fontWeight:'bolder',
                          borderRadius: '12px',
                          fontSize: '16px',
                          fontFamily: 'monospace'
                        }
                      });
                      
                      // Navigate after showing toast
                      setTimeout(() => {
                        // Store success message in sessionStorage
                        sessionStorage.setItem('redirectSuccess', 'true');
                        router.push(`/events/${post.eventPageSlug}`);
                      }, 800);
                    }}
                    className="w-full"
                  >
                    <LanguageSwitch
                      en="Know More..."
                      hi="और जाने..."
                      tailwindStyles={{
                        en: "text-white bg-gradient-to-b text-nowrap from-pink-500 to-pink-700 font-mono text-base font-semibold py-2 px-4 transition-colors text-center rounded-xl w-full shadow-xl shadow-pink-500/50",
                        hi: "text-white bg-gradient-to-b text-nowrap from-pink-500 to-pink-700 text-lg font-bold py-2 px-4 transition-colors text-center rounded-xl w-full shadow-xl shadow-pink-500/50"
                      }}
                    />
                  </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    );
  };

  // Pagination Component
  const PaginationControls = () => {
    if (totalPages <= 1) return null;

    return (
      <motion.div 
        className="flex justify-center items-center my-3 gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        {/* Previous Button */}
        <motion.button
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

        {/* Page Numbers */}
        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <motion.button
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

        {/* Next Button */}
        <motion.button
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
    );
  };

  if (loading) {
    return (
      <motion.div 
        className="container mx-auto mt-4 p-4 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1 }}
      >
        <div className="flex items-center bg-white border-2 border-r-8 border-b-8 border-pink-700 rounded-lg shadow-lg px-4 py-2 w-fit">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-600 mr-2"></div>
          <p className="text-pink-700 font-mono font-extrabold">Loading posts...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="container mx-auto mt-4 p-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center py-5 px-2 bg-red-50 border-2 border-red-300 w-fit mx-auto rounded-lg shadow-lg">
          <p className="text-red-700 font-mono font-extrabold">Error: {error}</p>
          <motion.button 
            onClick={() => window.location.reload()} 
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Retry
          </motion.button>
        </div>
      </motion.div>
    );
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
          <p className="text-pink-700 font-mono font-extrabold">No posts available at the moment, Come back again later!</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto p-4 relative">
      <motion.button 
        id="posts-section-title"
        className="text-center bg-gradient-to-b from-violet-500 via-purple-800 to-violet-600 p-2 px-4 rounded-lg mb-3 mt-6 md:mt-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.25)" }}
      >
        <LanguageSwitch
          en="Previous Programs by NGO:-"
          hi="हमारे NGO द्वारा संचालित पूर्व प्रोग्राम:-"
          tailwindStyles={{
            en: "font-mono text-white text-lg md:text-2xl font-extrabold",
            hi: "text-white text-xl md:text-2xl font-bold"
          }}
        />
      </motion.button>

      {/* Post container */}
      <div className={
        currentPosts.length <= 4 
          ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5" 
          : "masonry-container"
      }>
        {currentPosts.map((post, index) => (
          <div key={post.id} className={
            currentPosts.length <= 4 
              ? "h-fit" 
              : "masonry-item"
          }>
            <PostItem post={post} index={index} />
          </div>
        ))}
      </div>
      
      {/* Pagination Controls */}
      <PaginationControls />
    </div>
  );
}

