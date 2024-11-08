import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function AugustEventPage() {
  return (
    <div className="min-h-screen bg-pink-50">
      <Header />
      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-4xl font-bold text-pink-800 mb-8 text-center">15th अगस्त ओरिजिनल सिलिकॉन ब्रेस्ट निःशुल्क डिस्ट्रिब्यूशन</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <p className="text-lg text-gray-700 mb-4">
            15 अगस्त 2024 को संस्था द्वारा संचालित कार्यक्रम के अंतर्गत ब्रेस्ट कैंसर पेशेंट महिलाओं को ओरिजिनल सिलिकॉन डिस्ट्रीब्यूट किए।
          </p>
          <p className="text-lg text-gray-700 mb-4">
            स्वतंत्रता दिवस के अवसर पर, हमने 75 महिलाओं को निःशुल्क ओरिजिनल सिलिकॉन ब्रेस्ट प्रोस्थेसिस प्रदान किए। यह कार्यक्रम हमारे देश की स्वतंत्रता के साथ-साथ कैंसर से लड़ रही महिलाओं की स्वतंत्रता और आत्मनिर्भरता का प्रतीक है।
          </p>
          <p className="text-lg text-gray-700 mb-4">
            इस कार्यक्रम में हमने ब्रेस्ट कैंसर जागरूकता पर एक विशेष सत्र भी आयोजित किया, जिसमें प्रारंभिक पहचान और नियमित स्क्रीनिंग के महत्व पर प्रकाश डाला गया। हम अपने समुदाय के सदस्यों और चिकित्सा पेशेवरों के योगदान के लिए धन्यवाद देते हैं।
          </p>
        </div>

        <h2 className="text-3xl font-bold text-pink-800 mb-6">समाचार पत्र की कतरनें</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Image src="/placeholder.svg" alt="Newspaper Clipping 1" width={400} height={300} className="w-full h-auto mb-4" />
            <p className="text-gray-700">15 अगस्त कार्यक्रम की समाचार पत्र में कवरेज। स्वतंत्रता दिवस के साथ जुड़े इस आयोजन ने राष्ट्रीय मीडिया में भी ध्यान आकर्षित किया।</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Image src="/placeholder.svg" alt="Newspaper Clipping 2" width={400} height={300} className="w-full h-auto mb-4" />
            <p className="text-gray-700">हमारे कार्यक्रम के प्रभाव और महत्व को उजागर करता एक विस्तृत समाचार लेख।</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-pink-800 mb-6">वीडियो कवरेज</h2>
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <video
              className="w-full h-auto mb-4 rounded"
              controls
              poster="/placeholder.svg"
            >
              <source src="/your-video-file-1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="text-gray-700">15 अगस्त कार्यक्रम का मुख्य वीडियो। इसमें आप देख सकते हैं कि कैसे हमने स्वतंत्रता दिवस के साथ ब्रेस्ट कैंसर जागरूकता को जोड़ा।</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <video
              className="w-full h-auto mb-4 rounded"
              controls
              poster="/placeholder.svg"
            >
              <source src="/your-video-file-2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="text-gray-700">इस वीडियो में कार्यक्रम के दौरान आयोजित विशेष जागरूकता सत्र की झलकियाँ दिखाई गई हैं।</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}