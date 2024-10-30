import Image from 'next/legacy/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Slide {
  image: string
  title: string
  description: string
  link: string
}

interface ImageCarouselProps {
  slides: Slide[]
  currentSlide: number
  setCurrentSlide: (index: number) => void
}

export default function ImageCarousel({ slides, currentSlide, setCurrentSlide }: ImageCarouselProps) {
  return (
    <section className="relative h-[850px] mb-8">
      <div className="flex h-full rounded-lg overflow-hidden">
        <div className="w-1/2 relative">
          {slides.map((slide, index) => (
            <Image
              key={index}
              src={slide.image}
              alt={`Carousel Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className={`absolute transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
        <div className="w-1/2 bg-pink-100 p-8 flex flex-col justify-center">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0 absolute'
              }`}
            >
              <h2 className="text-3xl font-bold text-pink-800 mb-4">{slide.title}</h2>
              <p className="text-lg text-gray-700 mb-6">{slide.description}</p>
              <Link href={slide.link} className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors">
                और पढ़ें
              </Link>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 rounded-full p-2"
      >
        <ChevronLeft className="w-6 h-6 text-pink-600" />
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 rounded-full p-2"
      >
        <ChevronRight className="w-6 h-6 text-pink-600" />
      </button>
    </section>
  )
}