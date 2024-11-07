
import Header from '@/components/Header'
import ImageCarousel from '@/components/ImageCarousel'
import Services from '@/components/Services'
import Footer from '@/components/Footer'

export default function HomePage() {
  const slides = [  
    {
      image: '/image1.jpeg',
      title: 'स्तन कैंसर जागरूकता',
      description: 'स्तन कैंसर के बारे में जानें और इसे कैसे रोका जा सकता है। हमारे जागरूकता कार्यक्रमों के माध्यम से, हम समुदायों को शिक्षित कर रहे हैं और जीवन बचा रहे हैं।',
      link: '/awareness'
    },
  ]

  return (
    <div className="min-h-screen bg-pink-50">
      <Header />
      <main className="container mx-auto mt-8 px-4">
      <Services />
      <br />
        <ImageCarousel slides={slides} />
      </main>
      <Footer />
    </div>
  )
}