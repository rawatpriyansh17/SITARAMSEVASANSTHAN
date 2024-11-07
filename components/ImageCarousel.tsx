'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Slide = {
  image: string;
  title: string;
  description: string;
  link: string;
}

interface ImageCarouselProps {
  slides: Slide[];
}

export default function ImageCarousel({ slides }: ImageCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-[400px] md:h-[725px] relative">
          <Image src={slides[0].image} alt={slides[0].title} layout="fill" objectFit="cover" />
        </div>
        <div className="w-full md:w-[850px] bg-pink-100 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4 text-pink-800">{slides[0].title}</h2>
          <p className="mb-6 text-lg text-gray-700">{slides[0].description}</p>
          <Link href={slides[0].link} className="bg-pink-500 text-white px-3 py-3 rounded-full text-lg font-semibold hover:bg-pink-600 transition-colors inline-block text-center">
            Read More
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 relative h-[300px] md:h-[400px]">
            <video 
              className="w-full h-full object-cover rounded-lg"
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src="/your-video-file.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="w-full md:w-1/2 bg-pink-100 p-8 rounded-lg flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4 text-pink-800">Making a Difference</h3>
            <p className="text-lg text-gray-700 mb-2">
              Our NGO has been working tirelessly to support breast cancer patients and raise awareness. 
              Through our programs, we've helped countless individuals and their families navigate this challenging journey.
            </p>
            <Link href={slides[0].link} className="bg-pink-500 text-white px-3 py-3 rounded-full text-lg font-semibold hover:bg-pink-600 transition-colors inline-block text-center">
            Read More
          </Link>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 relative h-[300px] md:h-[400px]">
            <video 
              className="w-full h-full object-cover rounded-lg"
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src="/your-video-file.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="w-full md:w-1/2 bg-pink-100 p-8 rounded-lg flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4 text-pink-800">Making a Difference</h3>
            <p className="text-lg text-gray-700 mb-2">
              Our NGO has been working tirelessly to support breast cancer patients and raise awareness. 
              Through our programs, we've helped countless individuals and their families navigate this challenging journey.
            </p>
            <Link href={slides[0].link} className="bg-pink-500 text-white px-3 py-3 rounded-full text-lg font-semibold hover:bg-pink-600 transition-colors inline-block text-center">
            Read More
          </Link>
          </div>
        </div>
      </div>
    </div>
  )
}