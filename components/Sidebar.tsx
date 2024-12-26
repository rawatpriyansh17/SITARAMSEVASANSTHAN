'use client'

import Link from 'next/link'
import { X, ChevronRight } from 'lucide-react'
import { useEffect } from 'react'

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  
  return (
    <div className={`fixed inset-y-0 rounded-md right-0 z-50 w-64 bg-pink-600 opacity-88 text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
     
      <nav className="mt-56 ml-6">
        <ul className="space-y-4">
          <li><Link href="/" className="block px-4 py-4 hover:bg-pink-700 text-2xl font-bold" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link href="#services-section" className="block px-4 py-4 hover:bg-pink-700 text-2xl font-bold" onClick={() => setIsOpen(false)}>Services</Link></li>
          <li><Link href="#bottom-of-page" className="block px-4 py-4 hover:bg-pink-700 text-2xl font-bold" onClick={() => setIsOpen(false)}>Contact</Link></li>
        </ul>
      </nav>
      <div className="flex justify-start p-4 mr-1">
        <button onClick={() => setIsOpen(false)} className="text-white font-bold fixed bottom-4 right-4 z-50">
          <ChevronRight size={48} />
        </button>
      </div>
    </div>
  )
}