
'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PulsatingButton from "@/app/components/PulsatingButton";
import { LanguageSwitch } from '@/app/components/LanguageSwitch'
import ReactPlayer from 'react-player'
export default function PostSection() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div className=" w-full overflow-hidden rounded-lg">

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

      {/*  post 3 */}
      <div >
        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full md:w-1/2 h-[25rem] md:h-[45.313rem] relative rounded-2xl overflow-hidden">
            <Image src="/image1.jpeg" alt='image not available' layout="fill" objectFit="cover" />
          </div>
          <div className="w-full px- md:w-[850px] bg-pink-100 p-6 flex flex-col justify-center rounded-2xl overflow-hidden">
            <h2>  <LanguageSwitch
                  en="Ovarian cancer patient women were given free medicines for chemotherapy."
                  hi="ओवेरियन कैंसर पेशेंट महिलाओं को कीमो थैरेपी में दी जाने वाली दवाई निःशुल्क दी गई"
                  tailwindStyles={{
                    en: "font-mono text-xl md:text-4xl font-bold mb-4 text-pink-800",
                    hi: "text-2xl md:text-4xl font-bold mb-4 text-pink-800"
                  }}
                /></h2>
            <p>
            <LanguageSwitch
                  en="On 5 October 2024, 18 October 2024, 19 October 2024, 25 October 2024, medicines given in chemotherapy were given free of cost to ovarian cancer patient women, in which the medicines prescribed by Dr. Anoop Mantri were provided free of cost."
                  hi="5 अक्टूबर 2024, 18 अक्टूबर 2024, 19 अक्टूबर 2024, 25 अक्टूबर 2024 को ओवेरियन कैंसर पेशेंट महिलाओं को कीमो थैरेपी में दी जाने वाली दवाई निःशुल्क दी गई, इसमें डॉक्टर अनूप मंत्री के द्वारा प्रिस्क्राइब दवाई निःशुल्क प्रदान की गई.."
                  tailwindStyles={{
                    en: "mb-3 font-mono font-bold text-xs md:text-base text-pink-700",
                    hi: "mb-3 font-semibold text-sm md:text-base text-pink-700"
                  }}/>
            </p>
            <div className='w-1/3'>
              <PulsatingButton> <Link href="/events/event-3" className="bg-pink-500 text-nowrap text-white size-full rounded-lg ">
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
      {/*  post 2 */}
      <div>
        <div className="mt-8">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="w-full md:w-1/2 relative h-[250px] md:h-[400px] rounded-2xl overflow-hidden">
              {/* <VideoPlayer src="/septvideo.mp4" /> */}
              <ReactPlayer url='https://youtu.be/jRsZ14DnqM0'
                controls
                light={isSmallScreen ? "/bgsmall.png" : "/bg1.png"} // Custom thumbnail URL
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
                height="100%" 
                />
                
            </div>
            
            <div className="w-full md:w-1/2 bg-pink-100 p-8 rounded-lg flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4 text-pink-800">
              <LanguageSwitch
                  en="Again the program conducted by the NGO was organized on 21 September 2024"
                  hi="पुनः संस्था द्वारा संचालित कार्यक्रम 21 सितंबर 2024 को आयोजित किया गया"
                  tailwindStyles={{
                    en: "font-mono text-xl md:text-3xl font-bold  text-pink-800",
                    hi: "text-2xl md:text-4xl font-bold  text-pink-800"
                  }}
                />
              </h3>
              <p className="text-lg text-gray-700 mb-2">
            
                <LanguageSwitch
                  en="On 21 September 2024, again under the program run by the organization, original silicone breasts were distributed free of cost to breast cancer patient women."
                  hi="21 सितंबर 2024 को पुनः संस्था द्वारा संचालित कार्यक्रम के अंतर्गत ब्रेस्ट कैंसर पेशेंट महिलाओं को ओरिजिनल सिलिकॉन ब्रेस्ट निःशुल्क डिस्ट्रीब्यूट किए गए।"
                  tailwindStyles={{
                    en: "mb-3 font-mono font-bold text-xs md:text-base text-pink-700",
                    hi: "mb-3 font-semibold text-sm md:text-xl text-pink-700"
                  }}/>
              </p>
              <div className='w-1/3'>
                <PulsatingButton> <Link href="/events/event-2" className="bg-pink-500 text-nowrap text-white size-full rounded-lg ">
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
      {/* post 1 */}
      <div >
        <div className="mt-8">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="w-full md:w-1/2 relative h-[250px] md:h-[400px] rounded-2xl overflow-hidden">
              {/* <VideoPlayer src="/augvideo.mp4" /> */}
              <ReactPlayer url='https://youtu.be/yPDXuMtR9h8'
                controls
                light={isSmallScreen ? "/bgsmall.png" : "/bg2.png"} // Custom thumbnail URL
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
            <div className="w-full md:w-1/2 bg-pink-100 p-8 rounded-lg flex flex-col justify-center">
              <h3><LanguageSwitch
                  en="15th August Original Silicone Breast Free Distribution"
                  hi="15th अगस्त ओरिजिनल सिलिकॉन ब्रेस्ट निःशुल्क डिस्ट्रिब्यूशन"
                  tailwindStyles={{
                    en: "mb-4 font-mono text-xl md:text-4xl font-bold text-pink-800",
                    hi: "mb-4 text-2xl md:text-4xl font-bold text-pink-800"
                  }}
                /></h3>
              <p className="text-lg text-gray-700 mb-2">
              
                <LanguageSwitch
                  en="On August 15, 2024, original silicone was distributed to breast cancer patient women under the program run by the organization."
                  hi="  15 अगस्त 2024 को संस्था द्वारा संचालित कार्यक्रम के अंतर्गत ब्रेस्ट कैंसर पेशेंट महिलाओं को ओरिजिनल सिलिकॉन डिस्ट्रीब्यूट किए।"
                  tailwindStyles={{
                    en: "mb-3 font-mono font-bold text-xs md:text-base text-pink-700",
                    hi: "mb-3 font-semibold text-sm md:text-base text-pink-700"
                  }}/>
              </p>
              <div className='w-1/3'>
                <PulsatingButton> <Link href="/events/event-1" className="bg-pink-500 text-nowrap text-white size-full rounded-lg ">
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