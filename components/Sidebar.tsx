'use client'

import Link from 'next/link'
import { X } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-pink-600 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="flex justify-end p-4">
        <button onClick={() => setIsOpen(false)} className="text-white">
          <X size={24} />
        </button>
      </div>
      <nav className="mt-8">
        <ul className="space-y-4">
          <li><Link href="/" className="block px-4 py-2 hover:bg-pink-700" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link href="#services-section" className="block px-4 py-2 hover:bg-pink-700" onClick={() => setIsOpen(false)}>Services</Link></li>
          <li><Link href="#bottom-of-page" className="block px-4 py-2 hover:bg-pink-700" onClick={() => setIsOpen(false)}>Contact</Link></li>
          <li><Link href="/donate" className="block px-4 py-2 hover:bg-pink-700" onClick={() => setIsOpen(false)}>Donate Now</Link></li>
        </ul>
      </nav>
    </div>
  )
}