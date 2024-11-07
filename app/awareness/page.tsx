import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function AwarenessPage() {
  return (
    <div className="min-h-screen bg-pink-50">
      <Header  />
      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-4xl font-bold text-pink-800 mb-8 text-center">स्तन कैंसर जागरूकता</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <NewsStory
            image="/image1.jpeg"
            title="स्तन कैंसर के लक्षण"
            content="स्तन कैंसर के प्रारंभिक लक्षणों में स्तन या बगल में गांठ, स्तन के आकार या रूप में परिवर्तन, निपल से असामान्य स्राव, या त्वचा में परिवर्तन शामिल हो सकते हैं। नियमित स्व-परीक्षण और स्क्रीनिंग महत्वपूर्ण हैं।"
          />
          <NewsStory
            image="/image2.jpeg"
            title="जोखिम कारक"
            content="स्तन कैंसर के जोखिम कारकों में उम्र, आनुवंशिकी, हार्मोनल कारक, और जीवनशैली के विकल्प शामिल हैं। स्वस्थ आहार, नियमित व्यायाम, और शराब के सेवन को सीमित करना जोखिम को कम कर सकता है।"
          />
          <NewsStory
            image="/image3.jpeg"
            title="उपचार विकल्प"
            content="स्तन कैंसर के उपचार में सर्जरी, रेडिएशन थेरेपी, कीमोथेरेपी, हार्मोन थेरेपी, और लक्षित थेरेपी शामिल हो सकती हैं। उपचार योजना व्यक्तिगत होती है और कैंसर के प्रकार और चरण पर निर्भर करती है।"
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}

function NewsStory({ image, title, content }: { image: string; title: string; content: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image src={image} alt={title} width={400} height={300} className="w-full h-100 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-pink-800">{title}</h2>
        <p className="text-gray-700">{content}</p>
      </div>
    </div>
  )
}