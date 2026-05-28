import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { LanguageSwitch } from '@/app/components/LanguageSwitch'
import Image from 'next/image'
export default function DonatePage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-b from-pink-100 via-purple-200 to-pink-600">
      <Header />
      <main className="flex-grow mx-auto mt-8 px-4">
        <p className="motion-scale-in-[0.5] motion-translate-x-in-[26%] motion-translate-y-in-[17%] motion-opacity-in-[0%] motion-rotate-in-[24deg] motion-blur-in-[5px] motion-duration-[0.35s] motion-duration-[0.53s]/scale motion-duration-[0.53s]/translate motion-duration-[0.63s]/rotate motion-delay-800 text-center  text-transparent bg-clip-text bg-gradient-to-br from-pink-600 to-purple-800">
          <LanguageSwitch
            en="Sitaram Seva Sansthan is dedicated to supporting women battling cancer, guided by the ideology of 'Seva se Samadhan', which translates to 'Solution through Service.' Our NGO has successfully organized numerous programs in the past, aiming to provide care, assistance, and resources to empower these women in their fight against cancer and improve their quality of life."
            hi=" सीताराम सेवा संस्थान कैंसर से जूझ रही महिलाओं की सहायता के लिए समर्पित है,जिसका मार्गदर्शन 'सेवा से समाधान' की विचारधारा से होता है,जिसका अर्थ है 'सेवा के माध्यम से समाधान।'हमारे एनजीओ ने अतीत में कई कार्यक्रमों का सफलतापूर्वक आयोजन किया है,जिसका उद्देश्य इन महिलाओं को कैंसर के खिलाफ लड़ाई में सशक्त बनाने और उनके जीवन की गुणवत्ता में सुधार करने के लिए देखभाल, सहायता और संसाधन प्रदान करना है। "
            tailwindStyles={{
              en: "font-serif text-lg md:text-2xl  mb-8 px-4 font-extrabold  text-transparent bg-clip-text bg-gradient-to-br from-pink-600 via-purple-600 to-pink-600",
              hi: "font-mono text-lg md:text-2xl  mb-8 px-4 font-extrabold  text-transparent bg-clip-text bg-gradient-to-br from-pink-600 via-purple-600 to-pink-600"
            }}
          />
        </p>
        <div className=" h-[178px] md:h-[725px] relative shadow-2xl rounded-2xl overflow-hidden motion-preset-rebound-right motion-delay-[840ms]">
  <Image src="/groupphoto.png" alt="image not available" layout="fill" objectFit="cover" className="sm:object-contain object-contain" />
</div>
      </main>
      <Footer />
    </div>
  )
}