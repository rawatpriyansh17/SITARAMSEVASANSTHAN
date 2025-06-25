
'use client'

import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import ReactPlayer from 'react-player'
import { LanguageSwitch } from '@/app/components/LanguageSwitch'


export default function SeptemberEventPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-pink-100  via-purple-300 to-pink-500">
      <Header />
      <main className="container mx-auto mt-8 px-4">
        <h1><LanguageSwitch
                  en="Programs conducted by the organization on 21 September 2024 :-"
                  hi="पुनः संस्था द्वारा संचालित कार्यक्रम 21 सितंबर 2024 :-"
                  tailwindStyles={{
                    en: "font-mono text-xl md:text-4xl font-extrabold text-pink-800 mb-8 text-center ",
                    hi: "md:text-4xl text-2xl font-bold text-pink-800 mb-8 text-center"
                  }}
                /></h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <p >
           <LanguageSwitch
                  en="On 21 September 2024, again under the program run by the organization, original silicone breasts were distributed free of cost to breast cancer patient women."
                  hi=" 21 सितंबर 2024 को पुनः संस्था द्वारा संचालित कार्यक्रम के अंतर्गत ब्रेस्ट कैंसर पेशेंट महिलाओं को ओरिजिनल सिलिकॉन ब्रेस्ट निःशुल्क डिस्ट्रीब्यूट किए गए।"
                  tailwindStyles={{
                    en: "font-serif text-base md:text-2xl font-extrabold text-pink-800 mb-3 ",
                    hi: "font-serif text-base md:text-2xl font-extrabold text-pink-800 mb-3"
                  }}
                />
          </p>
          <p >
         
            <LanguageSwitch
                  en="This initiative aims to improve the confidence and quality of life of women affected by breast cancer. We are grateful for the support of our community members and donors who made this program possible."
                  hi="   इस पहल का उद्देश्य ब्रेस्ट कैंसर से पीड़ित महिलाओं के आत्मविश्वास और जीवन की गुणवत्ता में सुधार लाना है। हम अपने समुदाय के सदस्यों और दानदाताओं के समर्थन के लिए आभारी हैं, जिन्होंने इस कार्यक्रम को संभव बनाया।"
                  tailwindStyles={{
                    en: "font-serif md:text-xl text-sm font-semibold text-purple-700 mb-2 ",
                    hi: "font-serif md:text-xl text-base font-semibold text-purple-700 mb-2"
                  }}
                />
          </p>
        </div>

        <h2 className='ml-2'>
        <LanguageSwitch
                  en="Video Coverage:-"
                  hi=" वीडियो कवरेज:-"
                  tailwindStyles={{
                    en: "font-mono text-2xl  md:text-4xl font-bold text-pink-800 mb-6",
                    hi: "font-serif text-3xl md:text-4xl font-bold text-pink-800 mb-6"
                  }}
                />
        </h2>
        <div className="md:grid grid-cols-2 gap-8">
          <div className="bg-white p-2 mb-2 rounded-md shadow-md h-[270px] md:h-[450px] sm:h-[375px]">
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
          <div className="bg-white p-2 mb-2 rounded-md shadow-md h-[270px] md:h-[450px] sm:h-[375px]">
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
          <div className="bg-white p-2 rounded-md shadow-md h-[270px] md:h-[450px] sm:h-[375px]">
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