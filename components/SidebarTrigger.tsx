'use client'

import { ChevronLeft } from 'lucide-react'

interface SidebarTriggerProps {
  setIsOpen: (isOpen: boolean) => void;
}

export default function SidebarTrigger({ setIsOpen }: SidebarTriggerProps) {
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="fixed bottom-4 right-4 bg-pink-500 text-white p-2 rounded-full shadow-lg hover:bg-pink-600 transition-colors"
      aria-label="Open sidebar"
    >
      <ChevronLeft size={24} />
    </button>
  )
}