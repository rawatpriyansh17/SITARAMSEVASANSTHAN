
'use client'

import Image from 'next/legacy/image'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import Sidebar from './Sidebar'
import SidebarTrigger from './SidebarTrigger'
import { LanguageSwitch, LanguageToggle } from '@/components/LanguageSwitch'
import React from "react";

import { cn } from "@/lib/utils";

interface PulsatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string;
  duration?: string;
}

export function PulsatingButton({
  className,
  children,
  pulseColor = "#ffffff",
  duration = "1.5s",
  ...props
}: PulsatingButtonProps) {
  return (
    <button
      className={cn(
        "relative text-center cursor-pointer flex justify-center items-center rounded-full",
        className,
      )}
      style={
        {
          "--pulse-color": pulseColor,
          "--duration": duration,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="relative z-10">{children}</div>
      <div className="absolute top-1/2 left-1/2 size-full rounded-full bg-inherit animate-pulse -translate-x-1/2 -translate-y-1/2" />
    </button>
  );
}


export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <header className="motion-preset-rebound-down motion-delay-[400ms] bg-gradient-to-b from-pink-700 to-pink-500 text-white p-3">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
            <div className="rounded-full h-[80px] w-[120px] md:h-[120px] md:w-[120px] mr-1 md:mr-5 relative overflow-auto motion-preset-rebound-right motion-delay-[200ms]">
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
                  en: "font-serif font-extrabold text-[26px] md:text-5xl mt-4 inline motion-preset-rebound-down motion-delay-[800ms]",
                  hi: "text-4xl md:text-6xl text-nowrap font-bold"
                }}
              /></span>
              <span className="text-xl md:text-2xl  ml-2 md:ml-3 italic inline"><LanguageSwitch
                en="Seva se Samadhan..."
                hi="सेवा से समाधान..."
                tailwindStyles={{
                  en: "font-serif text-lg md:text-xl font-medium ml-0 md:ml-0 italic motion-preset-rebound-right motion-delay-[850ms]",
                  hi: "text- md:text-2xl font-medium ml-0 italic inline"
                }}
              /></span>
              <div className=" text-sm md:text-xl font-bold motion-preset-rebound-down motion-delay-[850ms]">Reg.No:03/27/01/2596/24</div>

            </h1>
          </div>
          <div className="flex items-center space-x-5">
            <nav className="hidden md:flex items-center space-x-3">
              <ul className="flex space-x-6 font-mono ">
                <li><Link href="/" ><LanguageSwitch
                  en="Home"
                  hi="होम"
                  tailwindStyles={{
                    en: "text-white text-2xl font-bold hover:underline motion-preset-rebound-down motion-delay-[900ms]",
                    hi: "text-white text-3xl space-x-8 font-semibold hover:underline"
                  }}
                /></Link></li>
                <li><a href="#services-section" ><LanguageSwitch
                  en="Services"
                  hi="सेवाएं"
                  tailwindStyles={{
                    en: "text-white text-2xl font-bold hover:underline motion-preset-rebound-down motion-delay-[950ms]",
                    hi: "text-white text-3xl space-x-8 font-semibold hover:underline"
                  }}
                /></a></li>
                <li><a href="#bottom-of-page" ><LanguageSwitch
                  en="Contact"
                  hi="संपर्क"
                  tailwindStyles={{
                    en: "text-white text-2xl font-bold hover:underline motion-preset-rebound-down motion-delay-[1000ms]",
                    hi: "text-white text-3xl space-x-8 font-semibold hover:underline"
                  }}
                /></a></li>
              </ul>
            </nav>
 <PulsatingButton > 
            <Link href="/donate" className="bg-white text-pink-600 text-center px-6 md:px-9 py-3 rounded-full text-2xl md:text-3xl text-nowrap font-serif font-semibold  transition-colors ">
             <LanguageSwitch
                en="Donate Now!"
                hi="अभी दान करें!"
                tailwindStyles={{
                  en: "motion-translate-y-loop-25/mirror",
                  hi: "motion-translate-y-loop-25/mirror"
                }}
              />
            </Link></PulsatingButton>
          <LanguageToggle />

          <button className="md:hidden pr-[7px]" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header >
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <SidebarTrigger setIsOpen={setIsSidebarOpen} />
    </>
  )
}