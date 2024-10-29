'use client'

import Image from 'next/legacy/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    {
      image: '/image1.jpeg',
      title: 'स्तन कैंसर जागरूकता',
      description: 'स्तन कैंसर के बारे में जानें और इसे कैसे रोका जा सकता है।',
      link: '/awareness'
    },
    {
      image: '/image2.jpeg',
      title: 'हमारी सेवाएँ',
      description: 'हम किस प्रकार की सहायता प्रदान करते हैं, इसके बारे में जानें।',
      link: '/services'
    },
    {
      image: '/image3.jpeg',
      title: 'समुदाय समर्थन',
      description: 'हमारे समुदाय कार्यक्रमों और सहायता समूहों के बारे में जानें।',
      link: '/community'
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-pink-50">
      <header className="bg-pink-600 text-white p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="rounded-full w-40 h-40 mr-6 relative overflow-hidden">
              <Image
                src="/logo.png"
                alt="सीताराम सेवा संस्थान Logo"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h1 className="text-6xl font-bold">    
               <span className="text-6xl">सीताराम सेवा संस्थान</span>
            <span className="text-4xl ml-4 italic">सेवा से समाधान...</span>
            </h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/about" className="hover:underline text-2xl font-semibold">About</a></li>
              <li><a href="/home" className="hover:underline text-2xl font-semibold">Home</a></li>
              <li><a href="/services" className="hover:underline text-2xl font-semibold">Services</a></li>
              <li><a href="#bottom-of-page" className="hover:underline text-2xl font-semibold">Contact</a></li>
            </ul>
          </nav>
          <Link href="/donate" className="bg-white text-pink-600 px-6 py-2 rounded-full text-xl font-semibold hover:bg-pink-100 transition-colors">
              Donate Now
            </Link>
        </div>
      </header>

      <main className="container mx-auto mt-8">
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
                  className={`absolute transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                />
              ))}
            </div>
            <div className="w-1/2 bg-pink-100 p-8 flex flex-col justify-center">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0 absolute'
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

        <section className="mt-8">
          <h2 className="text-3xl font-bold text-pink-800 mb-4">
            <span className="text-4xl">सीताराम सेवा संस्थान...</span>
            <span className="text-2xl ml-4 italic">"सेवा से समाधान"</span>
          </h2>
          <p className="text-lg text-gray-700">
            हम स्तन कैंसर के रोगियों का समर्थन करने और जागरूकता बढ़ाने के लिए समर्पित हैं। हमारा मिशन स्तन कैंसर से प्रभावित लोगों को देखभाल और संसाधन प्रदान करना है।
          </p>
        </section>

        <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-pink-700 mb-2">हमारी सेवाएँ :</h3>
            <p className="text-gray-600">मरीजों और परिवारों को हमारे द्वारा प्रदान की जाने वाली विभिन्न सहायता सेवाओं के बारे में जानें।</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-pink-700 mb-2">पिछले इवेंट</h3>
            <p className="text-gray-600">हमारे आगामी कार्यक्रमों और जागरूकता कार्यक्रमों के बारे में अद्यतन जानकारी प्राप्त करें।</p>
          </div>
        </section>
      </main>

      <footer className="bg-pink-600 text-white mt-12 py-6">
        <div className="container mx-auto text-center" id="bottom-of-page">
          <p>&copy; 2023 सीताराम सेवा संस्थान</p>
        </div>
      </footer>
    </div>
  )
}