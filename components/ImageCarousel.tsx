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
    <div className="relative w-1/2 h-[400px] md:h-[725px] overflow-hidden rounded-lg">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image src={slide.image} alt={slide.title} layout="fill" objectFit="cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 md:flex md:justify-between md:items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
              <p className="mb-2 hidden md:block">{slide.description}</p>
            </div>
            <Link href={slide.link} className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors inline-block">
              Read More
            </Link>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}