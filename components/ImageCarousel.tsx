
'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import PulsatingButton from "@/components/PulsatingButton";
import { LanguageSwitch, LanguageToggle } from '@/components/LanguageSwitch'
export default function ImageCarousel() {
  const VideoPlayer = ({ src }: { src: string }) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const [volume, setVolume] = useState(1)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [showControls, setShowControls] = useState(true)
    const videoRef = useRef<HTMLVideoElement>(null)
    const progressRef = useRef<HTMLInputElement>(null)
    const controlsTimerRef = useRef<NodeJS.Timeout | null>(null)

    const togglePlay = () => {
      if (videoRef.current) {
        if (videoRef.current.paused) {
          videoRef.current.play()
          setIsPlaying(true)
        } else {
          videoRef.current.pause()
          setIsPlaying(false)
        }
      }
    }

    const toggleMute = () => {
      if (videoRef.current) {
        videoRef.current.muted = !videoRef.current.muted
        setIsMuted(videoRef.current.muted)
      }
    }

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value)
      setVolume(newVolume)
      if (videoRef.current) {
        videoRef.current.volume = newVolume
        setIsMuted(newVolume === 0)
      }
    }

    const handleTimeUpdate = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime)
      }
    }

    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration)
      }
    }

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      const time = parseFloat(e.target.value)
      setCurrentTime(time)
      if (videoRef.current) {
        videoRef.current.currentTime = time
      }
    }
    const resetControlsTimer = () => {
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current)
      }
      setShowControls(true)
      controlsTimerRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }

    useEffect(() => {
      const video = videoRef.current
      if (video) {
        video.addEventListener('loadedmetadata', handleLoadedMetadata)
        video.addEventListener('timeupdate', handleTimeUpdate)
        video.addEventListener('ended', () => setIsPlaying(false))

        return () => {
          video.removeEventListener('loadedmetadata', handleLoadedMetadata)
          video.removeEventListener('timeupdate', handleTimeUpdate)
          video.removeEventListener('ended', () => setIsPlaying(false))
        }
      }
    }, [])

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.volume = volume
      }
    }, [volume])

    useEffect(() => {
      resetControlsTimer()
      return () => {
        if (controlsTimerRef.current) {
          clearTimeout(controlsTimerRef.current)
        }
      }
    }, [])

    return (
      <div 
      className="relative w-full h-full" 
      onMouseMove={resetControlsTimer}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
        <div className="absolute inset-0 cursor-pointer" onClick={togglePlay}>
          <video
            ref={videoRef}
            className="w-full h-full object-cover rounded-lg"
            loop
            muted={isMuted}
            playsInline
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div 
         className={`absolute bottom-0 left-0 right-0 bg-opacity-10 p-2 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        >
          <input
            ref={progressRef}
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-white opacity-80 rounded-lg appearance-none cursor-pointer"
            style={{
              backgroundImage: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / (duration || 1)) * 100}%, #ffffff ${(currentTime / (duration || 1)) * 100}%, #ffffff 100%)`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2">
              <button
                className="text-white p-1 rounded-full hover:bg-white hover:bg-opacity-20"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button
                className="text-white p-1 rounded-full hover:bg-white hover:bg-opacity-20"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-white bg-opacity-80 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="text-white text-sm">
              {formatTime(currentTime)} 
            </div>
          </div>
        </div>
      </div>
    )
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
 
            <button className=" motion-scale-in-[0.5] motion-translate-x-in-[26%] motion-translate-y-in-[17%] motion-opacity-in-[0%] motion-rotate-in-[24deg] motion-blur-in-[5px] motion-duration-[0.35s] motion-duration-[0.53s]/scale motion-duration-[0.53s]/translate motion-duration-[0.63s]/rotate motion-delay-1500 text-center bg-gradient-to-b from-violet-500 via-purple-800 to-violet-600 p-2 rounded-lg mb-3 mt-8 md:mt-4 ">
              <LanguageSwitch
                      en=" Previous program ran by our NGO:-"
                        hi="हमारे NGO द्वारा संचालित पूर्व प्रोग्राम:-"
                        tailwindStyles={{
                          en: "font-mono motion-scale-loop-95 motion-duration-[3s] motion-ease-spring-smooth text-lg md:text-2xl text-white mb-2  px-4 font-bold ",
                          hi: "font-mono motion-scale-loop-95 motion-duration-[3s] motion-ease-spring-smooth text-xl md:text-2xl text-white  mb-2  px-4 font-bold"
                        }}
                      />
            </button>
        <div className='intersect:motion-preset-fade motion-delay-[100ms]'>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="w-full md:w-1/2 h-[400px] md:h-[725px] relative">
              <Image src="/image1.jpeg" alt='image not available' layout="fill" objectFit="cover" />
            </div>
            <div className="w-full px- md:w-[850px] bg-pink-100 p-6 flex flex-col justify-center">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 text-pink-800"> ओवेरियन कैंसर पेशेंट महिलाओं को कीमो थैरेपी में दी जाने वाली दवाई निःशुल्क दी गई</h2>
              <p className="mb-6 font-semibold text-base md-text-xl text-pink-900">05 अक्टूबर 2024, 18 अक्टूबर 2024, 19 अक्टूबर 2024, 25 अक्टूबर 2024 को ओवेरियन कैंसर पेशेंट महिलाओं को कीमो थैरेपी में दी जाने वाली दवाई निःशुल्क दी गई, इसमें डॉक्टर अनूप मंत्री के द्वारा प्रिस्क्राइब दवाई निःशुल्क प्रदान की गई..</p>
             <div className='w-1/3'>
               <PulsatingButton> <Link href="/awareness/october-event" className="bg-pink-500 text-nowrap text-white size-full rounded-lg ">
                <LanguageSwitch
                                  en=" Know More..."
                                  hi="और जाने..."
                                  tailwindStyles={{
                                    en: "bg-gradient-to-b from-pink-500 to-pink-700 font-mono text-lg font-semibold py-3 px-[60px] transition-colors text-center",
                                    hi: "bg-gradient-to-b from-pink-500 to-pink-700 text-xl font-bold  py-3 px-[60px]  transition-colors text-center"
                                  }}
                                />
                </Link></PulsatingButton>
             </div>
            </div>
          </div>
        </div>
      <div className='intersect:motion-preset-fade motion-delay-[300ms]'>
        <div className="mt-8">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="w-full md:w-1/2 relative h-[300px] md:h-[400px]">
              <VideoPlayer src="/septvideo.mp4" />
            </div>
            <div className="w-full md:w-1/2 bg-pink-100 p-8 rounded-lg flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4 text-pink-800">पुनः संस्था द्वारा संचालित कार्यक्रम 21 सितंबर 2024 को आयोजित किया गया</h3>
              <p className="text-lg text-gray-700 mb-2">
                21 सितंबर 2024 को पुनः संस्था द्वारा संचालित कार्यक्रम के अंतर्गत ब्रेस्ट कैंसर पेशेंट महिलाओं को ओरिजिनल सिलिकॉन ब्रेस्ट निःशुल्क डिस्ट्रीब्यूट किए गए।
              </p>
              <div className='w-1/3'>
               <PulsatingButton> <Link href="/awareness/september-event" className="bg-pink-500 text-nowrap text-white size-full rounded-lg ">
                <LanguageSwitch
                                  en=" Know More..."
                                  hi="और जाने..."
                                  tailwindStyles={{
                                    en: "bg-gradient-to-b from-pink-500 to-pink-700 font-mono text-lg font-semibold py-3 px-[60px] transition-colors text-center",
                                    hi: "bg-gradient-to-b from-pink-500 to-pink-700 text-xl font-bold  py-3 px-[60px]  transition-colors text-center"
                                  }}
                                />
                </Link></PulsatingButton>
             </div>
            </div>
          </div>
        </div>
      </div>
      <div className="intersect:motion-preset-fade motion-delay-[500ms]">
        <div className="mt-8">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="w-full md:w-1/2 relative h-[300px] md:h-[400px]">
              <VideoPlayer src="/augvideo.mp4" />
            </div>
            <div className="w-full md:w-1/2 bg-pink-100 p-8 rounded-lg flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4 text-pink-800">15th अगस्त ओरिजिनल सिलिकॉन ब्रेस्ट निःशुल्क डिस्ट्रिब्यूशन</h3>
              <p className="text-lg text-gray-700 mb-2">
                15 अगस्त 2024 को संस्था द्वारा संचालित कार्यक्रम के अंतर्गत ब्रेस्ट कैंसर पेशेंट महिलाओं को ओरिजिनल सिलिकॉन डिस्ट्रीब्यूट किए।
              </p>
              <div className='w-1/3'>
               <PulsatingButton> <Link href="/awareness/august-event" className="bg-pink-500 text-nowrap text-white size-full rounded-lg ">
                <LanguageSwitch
                                  en=" Know More..."
                                  hi="और जाने..."
                                  tailwindStyles={{
                                    en: "bg-gradient-to-b from-pink-500 to-pink-700 font-mono text-lg font-semibold py-3 px-[60px]  transition-colors text-center",
                                    hi: "bg-gradient-to-b from-pink-500 to-pink-700 text-xl font-bold  py-3 px-[60px]  transition-colors text-center"
                                  }}
                                />
                </Link></PulsatingButton>
             </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}