import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function LatestEventPage() {
  return (
    <div className="min-h-screen bg-pink-50">
      <Header />
      <h1 className="text-5xl font-bold underline text-pink-800 mt-3 text-center">आगामी कार्यक्रम:</h1>
      <div className="flex items-center justify-center p-1">
        <div className="bg-white rounded-lg shadow-md p-2 w-full sm:w-auto mt-4 sm:mt-8"> {/* Adjusted margin */}
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <Image
              src="/flyer.jpeg"
              alt="आगामी कार्यक्रम का फ्लायर"
              width={600}
              height={800}
              layout="responsive"
              className="rounded"
              sizes="(max-width: 640px) 100vw, 600px"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
