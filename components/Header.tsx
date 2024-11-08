
'use client'

import Image from 'next/legacy/image'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import Sidebar from './Sidebar'
import SidebarTrigger from './SidebarTrigger'

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <header className="bg-pink-600 text-white p-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
            <div className="rounded-full h-[80px] w-[120px] md:h-[120px] md:w-[120px] mr-1 md:mr-5 relative overflow-auto">
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
              <span className="text-4xl md:text-6xl inline">सीताराम सेवा संस्थान</span>
              <span className="text-xl md:text-2xl  ml-2 md:ml-3 italic inline">सेवा से समाधान...</span>
          <div className="text-xl font-bold">Reg.No:03/27/01/2596/24</div>

            </h1>
          </div>  
          <div className="flex items-center space-x-5">
            <nav className="hidden md:flex items-center space-x-5">
              <ul className="flex space-x-5">
                <li><Link href="/" className="hover:underline text-2xl font-semibold">Home</Link></li>
                <li><a href="#services-section" className="hover:underline text-2xl font-semibold">Services</a></li>
                <li><a href="#bottom-of-page" className="hover:underline text-2xl font-semibold">Contact</a></li>
              </ul>
            </nav>
            <Link href="/donate" className="bg-white text-pink-600 px-2 md:px-12 py-4 rounded-full text-2xl md:text-3xl font-semibold hover:bg-pink-100 transition-colors">
              Donate Now
            </Link>

            <button className="md:hidden pl-[125px]" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <SidebarTrigger setIsOpen={setIsSidebarOpen} />
    </>
  )
}