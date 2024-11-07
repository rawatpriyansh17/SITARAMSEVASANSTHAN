'use client'

import Image from 'next/legacy/image'
import Link from 'next/link'
import { Menu } from 'lucide-react'

interface HeaderProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export default function Header({ setIsSidebarOpen }: HeaderProps) {
  return (
    <header className="bg-pink-600 text-white p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
          <div className="rounded-full h-[60px] w-[60px] md:h-[100px] md:w-[100px] mr-3 md:mr-5 relative overflow-auto">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="सीताराम सेवा संस्थान Logo"
                layout="fill"
                objectFit="cover"
              />
            </Link>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold">
            <span className="text-3xl md:text-6xl block md:inline">सीताराम सेवा संस्थान</span>
            <span className="text-xl md:text-2xl md:ml-2 italic block md:inline">सेवा से समाधान...</span>
          </h1>
        </div>
        <button className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
          <Menu size={24} />
        </button>
        <nav className="hidden md:flex items-center space-x-5">
          <ul className="flex space-x-5">
            <li><Link href="/" className="hover:underline text-2xl font-semibold">Home</Link></li>
            <li><a href="#services-section" className="hover:underline text-2xl font-semibold">Services</a></li>
            <li><a href="#bottom-of-page" className="hover:underline text-2xl font-semibold">Contact</a></li>
          </ul>
          <Link href="/donate" className="bg-white text-pink-600 px-6 py-2 rounded-full text-xl font-semibold hover:bg-pink-100 transition-colors">
            Donate Now
          </Link>
        </nav>
      </div>
    </header>
  )
}