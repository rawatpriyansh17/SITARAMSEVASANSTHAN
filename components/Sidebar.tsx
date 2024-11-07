'use client'

import Link from 'next/link'
import { X, ChevronLeft } from 'lucide-react'
import { useEffect } from 'react'

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  useEffect(() => {
    let touchStartX: number;
    let touchEndX: number;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      if (touchStartX - touchEndX > 75) {
        setIsOpen(false);
      } else if (touchEndX - touchStartX > 75) {
        setIsOpen(true);
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [setIsOpen]);

  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-pink-600 opacity-88 text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="flex justify-start p-4 mr-1">
        <button onClick={() => setIsOpen(false)} className="text-white">
          <X size={24} />
        </button>
      </div>
      <nav className="mt-8">
        <ul className="space-y-4">
          <li><Link href="/" className="block px-4 py-2 hover:bg-pink-700 text-xl" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link href="#services-section" className="block px-4 py-2 hover:bg-pink-700 text-xl" onClick={() => setIsOpen(false)}>Services</Link></li>
          <li><Link href="#bottom-of-page" className="block px-4 py-2 hover:bg-pink-700 text-xl" onClick={() => setIsOpen(false)}>Contact</Link></li>
        </ul>
      </nav>
    </div>
  )
}