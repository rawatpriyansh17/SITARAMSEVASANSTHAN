'use client'

import Image from 'next/image'
import { CalendarDays, Home, Info, Mail } from 'lucide-react'
import { domAnimation, LazyMotion, m } from 'motion/react'
import { ProgressBarLink } from '@/app/components/progress-bar'
import {
  delayed,
  gentleLoop,
  reboundDown,
  reboundRight,
} from '@/app/components/motion-presets'
import CardNav, { type CardNavItem } from '@/app/components/CardNav'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/latest-event', label: 'Upcoming-Events' },
  { href: '/about', label: 'About' },
  { href: '#bottom-of-page', label: 'Contact' },
]

const mobileNavItems: CardNavItem[] = [
  {
    label: 'Navigate',
    bgColor: '#be185d',
    textColor: '#ffffff',
    links: [
      { href: '/', label: 'Home', ariaLabel: 'Go to home page', icon: Home },
      { href: '/about', label: 'About', ariaLabel: 'Learn about Sitaram Seva Sansthan', icon: Info },
    ],
  },
  {
    label: 'Programs',
    bgColor: '#db2777',
    textColor: '#ffffff',
    links: [
      { href: '/latest-event', label: 'Upcoming-Events', ariaLabel: 'View upcoming events', icon: CalendarDays },
    ],
  },
  {
    label: 'Connect',
    bgColor: '#9d174d',
    textColor: '#ffffff',
    links: [
      { href: '#bottom-of-page', label: 'Contact', ariaLabel: 'Scroll to contact details', icon: Mail },
    ],
  },
]

function DonateLink({ className = '' }: { className?: string }) {
  return (
    <m.div
      className="relative inline-flex rounded-full bg-white text-pink-600"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
    >
      <ProgressBarLink
        href="/donate"
        className={`relative z-10 text-center px-6 md:px-9 py-3 rounded-full text-xl md:text-3xl text-nowrap font-serif font-semibold transition-colors ${className}`}
      >
        <m.span animate={gentleLoop}>Donate Now!</m.span>
      </ProgressBarLink>
      <span className="absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-inherit animate-pulse" />
    </m.div>
  )
}

export default function Header() {
  return (
    <LazyMotion features={domAnimation}>
      <m.header
        className="w-full bg-gradient-to-b from-pink-700 to-pink-500 text-white p-3 rounded-bl-3xl rounded-br-3xl"
        variants={reboundDown}
        {...delayed(0.4)}
      >
        <div className="mx-auto flex w-full flex-wrap items-center justify-between gap-y-3">
        <div className="flex w-full items-center md:w-auto md:mb-0">
          <m.div
            className="relative mr-2 grid size-20 shrink-0 place-items-center overflow-hidden rounded-full bg-white p-3 shadow-xl md:mr-5 md:size-32 md:p-5"
            variants={reboundRight}
            {...delayed(0.2)}
          >
            <ProgressBarLink href="/" className="relative block size-full overflow-hidden rounded-full">
              <Image
                src="/logo.png"
                alt="Sitaram Seva Sansthan Logo"
                priority
                fill
                sizes="(max-width: 768px) 5rem, 8rem"
                className="scale-[1.18] object-cover"
              />
            </ProgressBarLink>
          </m.div>
          <h1>
            <div className="flex gap-2">
              <m.span
                className="font-serif font-extrabold text-nowrap text-[23px] md:text-5xl mt-1 md:mt-0 inline"
                variants={reboundDown}
                {...delayed(0.8)}
              >
                Sitaram Seva Sansthan
              </m.span>
              <m.span
                className="hidden md:block font-serif text-md md:text-xl font-medium mt-4 italic"
                variants={reboundRight}
                {...delayed(0.85)}
              >
                Seva se Samadhan...
              </m.span>
            </div>
            <m.div
              className="text-xs md:text-xl font-bold"
              variants={reboundDown}
              {...delayed(0.85)}
            >
              Reg.No:03/27/01/2596/24
            </m.div>
          </h1>
        </div>

        <div className="flex items-center">
          <div className="hidden md:flex items-center space-x-3">
            <ul className="flex space-x-5 font-mono">
              {navItems.map((item, index) => (
                <li key={item.href}>
                  <ProgressBarLink href={item.href}>
                    <m.span
                      className="text-white text-base font-serif font-extrabold hover:underline"
                      variants={reboundDown}
                      {...delayed(0.9 + index * 0.05)}
                    >
                          {item.label}
                      
                    </m.span>
                  </ProgressBarLink>
                </li>
              ))}
            </ul>
            <DonateLink />
          </div>
        </div>

        <div className="flex w-full flex-wrap items-center justify-between  md:hidden">
          <DonateLink className="text-2xl md:text-3xl" />
          <CardNav
            items={mobileNavItems}
            baseColor="#ffffff"
            menuColor="#ffffff"
          />
        </div>
        </div>
      </m.header>
    </LazyMotion>
  )
}
