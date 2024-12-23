
'use client'

import Image from 'next/legacy/image'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import Sidebar from './Sidebar'
import SidebarTrigger from './SidebarTrigger'
import { LanguageSwitch, LanguageToggle } from '@/components/LanguageSwitch'

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <header className="bg-pink-600 text-white p-2">
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
            <h1 >
              <span><LanguageSwitch
                  en="Sitaram Seva Sansthan"
                  hi="सीताराम सेवा संस्थान"
                  tailwindStyles={{
                    en: "font-serif font-extrabold text-2xl md:text-5xl mt-4 inline",
                    hi: "text-4xl md:text-6xl font-bold"
                  }}
                /></span>
              <span className="text-xl md:text-2xl  ml-2 md:ml-3 italic inline"><LanguageSwitch
                  en="Seva se Samadhan..."
                  hi="सेवा से समाधान..."
                  tailwindStyles={{
                    en: "font-serif text-lg md:text-xl font-medium ml-0 md:ml-0 italic ",
                    hi: "text- md:text-2xl font-medium ml-0 italic inline"
                  }}
                /></span>
              <div className=" text-sm md:text-xl font-bold">Reg.No:03/27/01/2596/24</div>

            </h1>
          </div>
          <div className="flex items-center space-x-5">
            <nav className="hidden md:flex items-center space-x-3">
              <ul className="flex space-x-6 font-mono ">
                <li><Link href="/" ><LanguageSwitch
                  en="Home"
                  hi="होम"
                  tailwindStyles={{
                    en: "text-white text-2xl font-bold hover:underline",
                    hi: "text-white text-3xl space-x-8 font-semibold hover:underline"
                  }}
                /></Link></li>
                <li><a href="#services-section" ><LanguageSwitch
                  en="Services"
                  hi="सेवाएं"
                  tailwindStyles={{
                    en: "text-white text-2xl font-bold hover:underline",
                    hi: "text-white text-3xl space-x-8 font-semibold hover:underline"
                  }}
                /></a></li>
                <li><a href="#bottom-of-page" ><LanguageSwitch
                  en="Contact"
                  hi="संपर्क"
                  tailwindStyles={{
                    en: "text-white text-2xl font-bold hover:underline",
                    hi: "text-white text-3xl space-x-8 font-semibold hover:underline"
                  }}
                /></a></li>
              </ul>
            </nav>
            <Link href="/donate" className="bg-white text-pink-600 text-center px-6 md:px-9 py-2 rounded-full text-2xl md:text-3xl text-nowrap font-serif font-semibold hover:bg-pink-100 transition-colors">
          <LanguageSwitch
                  en="Donate Now!"
                  hi="अभी दान करें!"
                />
            </Link>
            <LanguageToggle />
            <button className="md:hidden pl-[10px]" onClick={() => setIsSidebarOpen(true)}>
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