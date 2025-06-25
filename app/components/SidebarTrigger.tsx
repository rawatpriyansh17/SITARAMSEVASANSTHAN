'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SidebarTriggerProps {
  setIsOpen: (isOpen: boolean) => void;
}

export default function SidebarTrigger({ setIsOpen }: SidebarTriggerProps) {
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="fixed bottom-5 z-40 left-4 bg-gradient-to-b from-pink-900 via-pink-600 to-pink-900  text-white p-2 rounded-full shadow-lg hover:bg-pink-600 transition-colors md:hidden motion-preset-rebound-left motion-delay-[860ms"
      aria-label="Open sidebar"
    >
      <ChevronRight size={24} />
    </button>
  )
}