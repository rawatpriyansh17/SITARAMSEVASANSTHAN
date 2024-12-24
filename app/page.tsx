import { Analytics } from "@vercel/analytics/react"
import Header from '@/components/Header'
import ImageCarousel from '@/components/ImageCarousel'
import Services from '@/components/Services'
import Footer from '@/components/Footer'
import Link from 'next/link'
import PulsatingButton from "@/components/PulsatingButton";
export default function HomePage() {


  return (
    <div className=" min-h-screen bg-pink-50">
        <Analytics />
      <Header />
      <main className="container mx-auto mt-8 px-4">
      <Services />
      <br />
      <div className="text-center mt-8 mb-8">
          <Link href="/latest-event" className=" text-xl md:text-2xl font-semibold hover:bg-pink-600 transition-colors inline-block">
          <PulsatingButton>संस्था द्वारा संचालित आगामी कार्यक्रम की जानकारी की लिए यहाँ क्लिक करें......
          </PulsatingButton></Link>;
        </div>
        <ImageCarousel />
      </main>
      <Footer />
    </div>
  )
}