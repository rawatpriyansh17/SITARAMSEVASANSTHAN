'use client'

import Link from 'next/link'
import { X, ChevronRight } from 'lucide-react'
import { useEffect } from 'react'
import { LanguageSwitch } from '@/components/LanguageSwitch'
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {

  return (
    <div className={`fixed inset-y-0 rounded-md right-0 z-50 w-60 bg-gradient-to-b from-pink-600 via-pink-700 to-pink-500 text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>

      <nav className="mt-60 ml-6">
        <ul className="space-y-4">
          <li><Link href="/" className="block px-4 py-4  text-2xl font-bold font-mono" onClick={() => setIsOpen(false)}><div className={`sidebar ${isOpen ? 'motion-preset-rebound-left motion-delay-[200ms]' : ''}`}><LanguageSwitch
                                  en="Home"
                                  hi="होम"
                                /></div></Link></li>
          <li><Link href="/" className="block px-4 py-4  text-2xl font-mono font-bold" onClick={() => setIsOpen(false)}><div className={`sidebar ${isOpen ? 'motion-preset-rebound-left motion-delay-[250ms]' : ''}`}>Services</div></Link></li>
          <li><Link href="/about" className="block px-4 py-4  text-2xl font-mono font-bold" onClick={() => setIsOpen(false)}><div className={`sidebar ${isOpen ? 'motion-preset-rebound-left motion-delay-[300ms]' : ''}`}>About</div></Link></li>
          <li><Link href="#bottom-of-page" className="block px-4 py-4  text-2xl font-mono font-bold" onClick={() => setIsOpen(false)}><div className={`sidebar ${isOpen ? 'motion-preset-rebound-left motion-delay-[350ms]' : ''}`}>Contact</div></Link></li>
          
        </ul>
      </nav>
      <div className="flex justify-start p-4 mr-1">
        <button onClick={() => setIsOpen(false)} className="text-white rounded-full font-bold bg-gradient-to-b from-pink-900 via-pink-600 to-pink-900 fixed bottom-4 right-4 z-50">
          <ChevronRight size={48} />
        </button>
      </div>
    </div>
  )
}