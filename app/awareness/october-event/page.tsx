import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function AwarenessPage() {
  return (
    <div className="min-h-screen bg-pink-50">
      <Header  />
      <main className="container mx-auto mt-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <NewsStory
            image="/image1.jpeg"
            title="5 October 2024"
            content="ओवेरियन कैंसर पेशेंट को कीमो थैरेपी में दी जाने वाली दवाई निःशुल्क दी गई"
          />
          <NewsStory
            image="/image2.jpeg"
            title="18 October 2024"
            content="ओवेरियन कैंसर पेशेंट को कीमो थैरेपी में दी जाने वाली दवाई निःशुल्क दी गई"
          />
          <NewsStory
            image="/image3.jpeg"
            title="19 October 2024"
            content="स्तन कैंसर पेशेंट को कीमो थैरेपी में दी जाने वाली दवाई निःशुल्क दी गई"
          />
           <NewsStory
            image="/image4.jpeg"
            title="25 October 2024"
            content="ओवेरियन कैंसर पेशेंट(attender) को कीमो थैरेपी में दी जाने वाली दवाई निःशुल्क दी गई"
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
      <Image src={image} alt={title} width={400} height={300} className="w-full h-120 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-pink-800">{title}</h2>
        <p className="text-gray-700 text-xl">{content}</p>
      </div>
    </div>
  )
}