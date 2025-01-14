
'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import ReactPlayer from 'react-player'

export default function SeptemberEventPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100  via-purple-400 to-pink-500">
      <Header />
      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-4xl font-bold text-pink-800 mb-8 text-center">पुनः संस्था द्वारा संचालित कार्यक्रम 21 सितंबर 2024</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <p className="md:text-xl text-base font-semibold text-gray-700 mb-4">
            21 सितंबर 2024 को पुनः संस्था द्वारा संचालित कार्यक्रम के अंतर्गत ब्रेस्ट कैंसर पेशेंट महिलाओं को ओरिजिनल सिलिकॉन ब्रेस्ट निःशुल्क डिस्ट्रीब्यूट किए गए।
          </p>
          <p className="md:text-xl text-base font-semibold text-gray-700 mb-4">
            इस पहल का उद्देश्य ब्रेस्ट कैंसर से पीड़ित महिलाओं के आत्मविश्वास और जीवन की गुणवत्ता में सुधार लाना है। हम अपने समुदाय के सदस्यों और दानदाताओं के समर्थन के लिए आभारी हैं, जिन्होंने इस कार्यक्रम को संभव बनाया।
          </p>
        </div>

        <h2 className="text-3xl font-bold text-pink-800 mb-6">वीडियो कवरेज</h2>
        <div className="md:grid grid-cols-2 gap-8">
          <div className="bg-white p-4 rounded-md shadow-md h-[270px] md:h-[450px] sm:h-[375px]">
            {/* <VideoPlayer src="/septvideo3.mp4" /> */}
             <ReactPlayer url='https://youtu.be/EszTiupSP64'
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
          <div className="bg-white p-4 rounded-md shadow-md h-[270px] md:h-[450px] sm:h-[375px]">
            {/* <VideoPlayer src="/septvideo2.mp4" /> */}
             <ReactPlayer url='https://youtu.be/WXV-oHRYSK8'
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
          <div className="bg-white p-4 rounded-md shadow-md h-[270px] md:h-[450px] sm:h-[375px]">
            {/* <VideoPlayer src="/septvideo.mp4" /> */}
             <ReactPlayer url='https://youtu.be/jRsZ14DnqM0'
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