'use client'

import Image from 'next/legacy/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Header from './components/Header'
import ImageCarousel from './components/ImageCarousel'
import MissionStatement from './components/MissionStatement'
import Moreinfo from './components/Moreinfo'
import Footer from './components/Footer'

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
      <Header />
      <main className="container mx-auto mt-8">
        <ImageCarousel slides={slides} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
        <MissionStatement />
        <Moreinfo />
      </main>
      <Footer />
    </div>
  )
}