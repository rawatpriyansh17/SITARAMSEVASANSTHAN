import Image from 'next/legacy/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-pink-600 text-white p-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="rounded-full w-40 h-40 mr-6 relative overflow-hidden">
            <Image
              src="/logo.png"
              alt="सीताराम सेवा संस्थान Logo"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h1 className="text-6xl font-bold">    
            <span className="text-6xl">सीताराम सेवा संस्थान</span>
            <span className="text-4xl ml-4 italic">सेवा से समाधान...</span>
          </h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="/about" className="hover:underline text-2xl font-semibold">About</a></li>
            <li><a href="/home" className="hover:underline text-2xl font-semibold">Home</a></li>
            <li><a href="/services" className="hover:underline text-2xl font-semibold">Services</a></li>
            <li><a href="#bottom-of-page" className="hover:underline text-2xl font-semibold">Contact</a></li>
          </ul>
        </nav>
        <Link href="/donate" className="bg-white text-pink-600 px-6 py-2 rounded-full text-xl font-semibold hover:bg-pink-100 transition-colors">
          Donate Now
        </Link>
      </div>
    </header>
  )
}