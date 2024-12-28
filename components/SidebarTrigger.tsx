'use client'

import { ChevronLeft } from 'lucide-react'

interface SidebarTriggerProps {
  setIsOpen: (isOpen: boolean) => void;
}

export default function SidebarTrigger({ setIsOpen }: SidebarTriggerProps) {
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="fixed bottom-4 z-40 right-4 bg-gradient-to-b from-pink-900 via-pink-600 to-pink-900  text-white p-2 rounded-full shadow-lg hover:bg-pink-600 transition-colors md:hidden motion-preset-rebound-left motion-delay-[860ms"
      aria-label="Open sidebar"
    >
      <ChevronLeft size={24} />
    </button>
  )
}