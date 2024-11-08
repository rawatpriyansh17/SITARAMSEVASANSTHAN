'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'


export default function ImageCarousel() {

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-[400px] md:h-[725px] relative">
          <Image src="/image1.jpeg" alt='image not available' layout="fill" objectFit="cover" />
        </div>
        <div className="w-full md:w-[850px] bg-pink-100 p-6 flex flex-col justify-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-pink-800"> ओवेरियन कैंसर पेशेंट महिलाओं को कीमो थैरेपी में दी जाने वाली दवाई निःशुल्क दी गई</h2>
          <p className="mb-6 font-semibold text-base md-text-xl text-pink-900">05 अक्टूबर 2024, 18 अक्टूबर 2024, 19 अक्टूबर 2024, 25 अक्टूबर 2024 को ओवेरियन कैंसर पेशेंट महिलाओं को कीमो थैरेपी में दी जाने वाली दवाई निःशुल्क दी गई, इसमें डॉक्टर अनूप मंत्री के द्वारा प्रिस्क्राइब दवाई निःशुल्क प्रदान की गई..</p>
          <Link href="/awareness/october-event" className="bg-pink-500 text-white px-3 py-3 rounded-full text-lg font-semibold hover:bg-pink-600 transition-colors inline-block text-center">
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
            <h3 className="text-2xl font-bold mb-4 text-pink-800">पुनः संस्था द्वारा संचालित कार्यक्रम 21 सितंबर 2024 को आयोजित किया गया</h3>
            <p className="text-lg text-gray-700 mb-2">
            21 सितंबर 2024 को पुनः संस्था द्वारा संचालित कार्यक्रम के अंतर्गत ब्रेस्ट कैंसर पेशेंट महिलाओं को ओरिजिनल सिलिकॉन ब्रेस्ट निःशुल्क डिस्ट्रीब्यूट किए गए।
            </p>
            <Link href="/awareness/september-event" className="bg-pink-500 text-white px-3 py-3 rounded-full text-lg font-semibold hover:bg-pink-600 transition-colors inline-block text-center">
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
            <h3 className="text-2xl font-bold mb-4 text-pink-800">15th अगस्त ओरिजिनल सिलिकॉन ब्रेस्ट निःशुल्क डिस्ट्रिब्यूशन</h3>
            <p className="text-lg text-gray-700 mb-2">

              15 अगस्त 2024 को संस्था द्वारा संचालित कार्यक्रम के अंतर्गत ब्रेस्ट कैंसर पेशेंट महिलाओं को ओरिजिनल सिलिकॉन डिस्ट्रीब्यूट किए।
            </p>
            <Link href="/awareness/august-event" className="bg-pink-500 text-white px-3 py-3 rounded-full text-lg font-semibold hover:bg-pink-600 transition-colors inline-block text-center">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}