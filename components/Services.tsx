import { LanguageSwitch, LanguageToggle } from '@/components/LanguageSwitch'


export default function Services() {
  return (
    <section id="services-section" className="mt-10 scroll-mt-24 ">
      <h2 className="  motion-scale-in-[0.5] motion-translate-x-in-[-25%] motion-translate-y-in-[25%] motion-opacity-in-[0%] motion-rotate-in-[-10deg] motion-blur-in-[5px] motion-duration-[0.35s] motion-duration-[0.53s]/scale motion-duration-[0.53s]/translate motion-duration-[0.63s]/rotate motion-delay-1000 text-center "><LanguageSwitch
                  en="Our Services..."
                  hi=" हमारी सेवाएँ"
                  tailwindStyles={{
                    en: " font-serif text-4xl md:text-6xl font-bold text-pink-800 mb-2 md-mb-8  ",
                    hi: "text-4xl md:text-6xl font-bold text-pink-800 mb-2 md-mb-8"
                  }}
                /></h2>
      <p className=" motion-scale-in-[0.5] motion-translate-x-in-[26%] motion-translate-y-in-[17%] motion-opacity-in-[0%] motion-rotate-in-[24deg] motion-blur-in-[5px] motion-duration-[0.35s] motion-duration-[0.53s]/scale motion-duration-[0.53s]/translate motion-duration-[0.63s]/rotate motion-delay-1500 text-center ">
        <LanguageSwitch
                en="Sitaram Seva Sansthan is dedicated to the women suffering from cancer following the ideology of 'Seva se Samadhan', Programs run by our NGO:"
                  hi=" सीताराम सेवा संस्थान 'सेवा से समाधान' की विचार धारा का अनुसरण करते हुए कैंसर पीड़ित महिलाओं के लिए समर्पित है, हमारे NGO द्वारा संचालित प्रोग्राम:"
                  tailwindStyles={{
                    en: "font-serif text-base md:text-xl text-gray-700 mb-8  px-4 font-bold ",
                    hi: "text-base md:text-2xl text-gray-700 mb-8  px-4 font-bold"
                  }}
                />
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7 ">
        <div className='motion-preset-rebound-right motion-delay-[800ms]'>
          <ServiceCard><LanguageSwitch
                  en="Free distribution of artificial silicone breasts to breast cancer patient women."
                  hi=" ब्रेस्ट कैंसर पेशेंट महिलाओं को आर्टिफिशियल ओरिजिनल सिलिकॉन ब्रेस्ट निःशुल्क वितरण।"
                  tailwindStyles={{
                    en: "font-serif text-center font-extrabold text-lg md:text-2xl  ",
                    hi: "text-xl text-center md:text-2xl font-bold"
                  }}
                />
          </ServiceCard>
        </div>
        <div className='motion-preset-rebound-left motion-delay-[820ms]'>
          <ServiceCard><LanguageSwitch
                  en="Free distribution of medicines given in chemotherapy to women breast cancer patients."
                  hi=" ब्रेस्ट कैंसर पेशेंट महिलाओं को कीमो थैरेपी में दी जाने वाली दवाई का निःशुल्क वितरण।"
                  tailwindStyles={{
                    en: "font-serif text-center font-extrabold text-lg md:text-2xl  ",
                    hi: "text-xl text-center md:text-2xl font-bold"
                  }}
                />
          </ServiceCard>
        </div>
        <div className='motion-preset-rebound-right motion-delay-[840ms]'>
          <ServiceCard><LanguageSwitch
                  en="Free distribution of medicines given in chemotherapy to women suffering from ovarian cancer."
                  hi=" ओवेरियन कैंसर पेशेंट महिलाओं को कीमो थैरेपी में दी जाने वाली दवाई का निःशुल्क वितरण।"
                  tailwindStyles={{
                    en: "font-serif text-center font-extrabold text-lg md:text-2xl  ",
                    hi: "text-xl text-center md:text-2xl font-bold"
                  }}
                />
          </ServiceCard>
        </div>
        <div className='motion-preset-rebound-left motion-delay-[860ms]'>
          <ServiceCard><LanguageSwitch
                  en="Organizing multiple blood donation camps"
                  hi="रक्तदान शिविर का आयोजन।"
                  tailwindStyles={{
                    en: "font-serif md:p-4 w-auto md:w-[680px] text-wrap text-center font-extrabold text-lg md:text-2xl ",
                    hi: "text-xl px-11 md:p-4  md:w-[680px] text-center md:text-2xl font-bold"
                  }}
                />
          </ServiceCard>
        </div>
 
          <div className='motion-preset-rebound-right motion-delay-[880ms]'>
            <ServiceCard><LanguageSwitch
                    en="Free distribution of essential supplies to the students studying in government schools."
                    hi=" सरकारी स्कूलों में पढ़ने वाले विद्यार्थियों को आवश्यक सामग्री का वितरण।"
                    tailwindStyles={{
                      en: "font-serif text-center font-extrabold text-lg md:text-2xl  ",
                      hi: "text-xl text-center md:text-2xl font-bold py-4 px-10"
                    }}
                  />
            </ServiceCard>
          </div>
      
        <div className='motion-preset-rebound-left motion-delay-[900ms]'>
          <ServiceCard><LanguageSwitch
                  en="Programs organized for free thermal mammography test for breast cancer patients"
                  hi="स्तन कैंसर रोगियों के लिए निःशुल्क थर्मल मैमोग्राफी परीक्षण हेतु कार्यक्रम का आयोजन"
                  tailwindStyles={{
                    en: "font-serif text-center font-extrabold text-lg md:text-2xl  ",
                    hi: "text-xl text-center md:text-2xl font-bold"
                  }}
                />
          </ServiceCard>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ children }: { children: React.ReactNode }) {
  return (
    <div className=" font-semibold  text-wrap  h-auto p-2 items-center justify-center overflow-hidden rounded-md  bg-gradient-to-r dark:from-[#070e41] dark:to-[#263381] from-[#f6f7ff] to-[#f5f6ff] dark:border-[rgb(206_67_117)] border-2 border-[#a31b93]  bg-transparent px-6  dark:text-white text-black transition-all duration-100 [box-shadow:5px_5px_rgb(206_67_125)] dark:[box-shadow:5px_5px_rgb(76_100_255)] hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_rgb(38_51_129)] dark:hover:[box-shadow:0px_0px_rgb(76_100_255)]">
      <p className=" text-gray-800">{children}</p>
    </div>
  )
}