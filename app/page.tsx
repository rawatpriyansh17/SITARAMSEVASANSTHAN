'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import ImageCarousel from '@/components/ImageCarousel'
import MissionStatement from '@/components/MissionStatement'
import Services from '@/components/Services'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import Moreinfo from '@/components/Moreinfo'
export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const slides = [  
    {
      image: '/image1.jpeg',
      title: 'स्तन कैंसर जागरूकता',
      description: 'स्तन कैंसर के बारे में जानें और इसे कैसे रोका जा सकता है।',
      link: './awareness/page.tsx'
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

  return (
    <div className="min-h-screen bg-pink-50">
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="container mx-auto mt-8 px-4">
        <ImageCarousel slides={slides} />
        <MissionStatement />
        <Services />
        <Moreinfo />
      </main>
      <Footer />
    </div>
  )
}