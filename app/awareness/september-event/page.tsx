import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function SeptemberEventPage() {
  return (
    <div className="min-h-screen bg-pink-50">
      <Header />
      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-4xl font-bold text-pink-800 mb-8 text-center">पुनः संस्था द्वारा संचालित कार्यक्रम 21 सितंबर 2024</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <p className="text-lg text-gray-700 mb-4">
            21 सितंबर 2024 को पुनः संस्था द्वारा संचालित कार्यक्रम के अंतर्गत ब्रेस्ट कैंसर पेशेंट महिलाओं को ओरिजिनल सिलिकॉन ब्रेस्ट निःशुल्क डिस्ट्रीब्यूट किए गए।
          </p>
          <p className="text-lg text-gray-700 mb-4">
            इस कार्यक्रम में कुल 50 महिलाओं को लाभ मिला। हमारे संस्थान के डॉक्टरों ने प्रत्येक महिला की व्यक्तिगत आवश्यकताओं का आकलन किया और उन्हें उपयुक्त ब्रेस्ट प्रोस्थेसिस प्रदान किया।
          </p>
          <p className="text-lg text-gray-700 mb-4">
            इस पहल का उद्देश्य ब्रेस्ट कैंसर से पीड़ित महिलाओं के आत्मविश्वास और जीवन की गुणवत्ता में सुधार लाना है। हम अपने समुदाय के सदस्यों और दानदाताओं के समर्थन के लिए आभारी हैं, जिन्होंने इस कार्यक्रम को संभव बनाया।
          </p>
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
            <p className="text-gray-700">21 सितंबर कार्यक्रम का हाइलाइट वीडियो। इस वीडियो में आप देख सकते हैं कि कैसे हमारी टीम ने महिलाओं को सहायता प्रदान की।</p>
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
            <p className="text-gray-700">इस वीडियो में कार्यक्रम के लाभार्थियों और हमारे स्वयंसेवकों के साथ साक्षात्कार शामिल हैं।</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}