
'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import React from 'react'
import ReactPlayer from 'react-player'


export default function AugustEventPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100  via-purple-400 to-pink-500">
      <Header />
      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-4xl font-bold text-pink-800 mb-8 text-center">15th अगस्त ओरिजिनल सिलिकॉन ब्रेस्ट निःशुल्क डिस्ट्रिब्यूशन</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <p className="md:text-xl text-base font-semibold text-gray-700 mb-4">
            15 अगस्त 2024 को संस्था द्वारा संचालित कार्यक्रम के अंतर्गत ब्रेस्ट कैंसर पेशेंट महिलाओं को ओरिजिनल सिलिकॉन डिस्ट्रीब्यूट किए।
          </p>
          <p className="md:text-xl text-base font-semibold text-gray-700 mb-4">
           यह कार्यक्रम हमारे देश की स्वतंत्रता के साथ-साथ कैंसर से लड़ रही महिलाओं की स्वतंत्रता और आत्मनिर्भरता का प्रतीक है।
          </p>
          <p className="md:text-xl text-base font-semibold text-gray-700 mb-4">
         हम अपने समुदाय के सदस्यों और चिकित्सा पेशेवरों के योगदान के लिए धन्यवाद देते हैं।
          </p>
        </div>

        <h2 className="text-3xl font-bold text-pink-800 mb-6">समाचार पत्र की कतरनें</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Image src="/15augnews1.png" alt="Newspaper Clipping 1" width={400} height={300} className="w-full h-auto mb-4" />
            <p className="text-gray-700 font-semibold text -xl md:text-2xl">Source-Patrika(Indore,M.P,India)</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Image src="/15augnews3.png" alt="Newspaper Clipping 2" width={400} height={600} className="w-full h-auto mb-4" />
            <p className="text-gray-700 font-semibold text -xl md:text-2xl">Source-Patrika(Indore,M.P.,India)</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Image src="/15augnews2.png" alt="Newspaper Clipping 2" width={400} height={600} className="w-full h-auto mb-4" />
            <p className="text-gray-700 font-semibold text -xl md:text-2xl">Source-Dainik Bhaskar(Indore,M.P.,India)</p>
          </div>
        </div>
        

        <h2 className="text-3xl font-bold text-white mb-6">वीडियो कवरेज :-</h2>
        <div className=" md:grid grid-cols-2 gap-10">
          <div className="bg-white p-1 mb-5 rounded-md shadow-md h-[270px] md:h-[550px] sm:h-[375px] ">
          {/* <VideoPlayer src="/augvideo2.mp4" /> */}
          <ReactPlayer url='https://youtu.be/DD2IfpMzato'
          controls
          light="/interview.png" // Custom thumbnail URL
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1, // Remove YouTube logo
                showinfo: 0,       // Hide video title and uploader info (deprecated but still works on some videos)
                rel: 0,            // Prevent showing related videos at the end
              },
            },
          }}
          width="100%"
          height="100%" />
          </div>
          <div className="bg-white p-1 rounded-md shadow-md h-[270px] md:h-[550px] sm:h-[375px]">
  {/* <VideoPlayer src="/augvideo1.mp4" /> */}
  <ReactPlayer url='https://youtu.be/zfWBRYjAVSs?si=9YJQQ1FQy4_sP0Lk'
          controls
          light="/distribution.png" // Custom thumbnail URL
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1, // Remove YouTube logo
                showinfo: 0,       // Hide video title and uploader info (deprecated but still works on some videos)
                rel: 0,            // Prevent showing related videos at the end
              },
            },
          }}
          width="100%"
          height="100%" />
</div>
        </div>
      </main>
      <Footer />
    </div>
  )
}