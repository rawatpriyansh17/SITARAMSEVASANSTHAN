'use client'

import Image from 'next/image'
import { ArrowUpRight, CalendarDays, Home, Info, Mail } from 'lucide-react'
import { domAnimation, LazyMotion, m } from 'motion/react'
import { T, Var } from 'gt-next/client'
import { ProgressBarLink } from '@/app/components/progress-bar'
import {
  delayed,
  gentleLoop,
  reboundDown,
  reboundRight,
} from '@/app/components/motion-presets'
import CardNav, { type CardNavItem } from '@/app/components/CardNav'
import LanguageSwitcher from '@/app/components/language-switcher'

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

function DonateLink({
  className = '',
  wrapperClassName = '',
  mobileLabel = false,
}: {
  className?: string
  wrapperClassName?: string
  mobileLabel?: boolean
}) {
  return (
    <m.div
      className={`relative inline-flex min-w-0 rounded-full bg-white text-pink-600 ${wrapperClassName}`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
    >
      <ProgressBarLink
        href="/donate"
        className={`relative z-10 block min-w-0 overflow-hidden text-ellipsis text-wrap text-center px-2 md:px-6 py-2 rounded-full text-xl md:text-3xl font-serif font-semibold transition-colors ${className}`}
      >
        <m.span animate={gentleLoop}>
          {mobileLabel ? <T>Donate to Our Cause </T> : <T>Donate Now </T>}
          <ArrowUpRight className="size-8 inline-block" aria-hidden="true" />
        </m.span>
      </ProgressBarLink>
      <span className="absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-inherit animate-pulse" />
    </m.div>
  )
}

function NavLabel({ label }: { label: string }) {
  switch (label) {
    case 'Home':
      return <T>Home</T>
    case 'Upcoming-Events':
      return <T>Upcoming-Events</T>
    case 'About':
      return <T>About</T>
    case 'Contact':
      return <T>Contact</T>
    default:
      return label
  }
}

export default function Header() {
  return (
    <LazyMotion features={domAnimation}>
      <m.header
        className="relative w-full rounded-bl-3xl rounded-br-3xl bg-gradient-to-b from-pink-700 to-pink-500 p-3 pb-2 text-white md:rounded-br-none md:p-3"
        variants={reboundDown}
        {...delayed(0.4)}
      >
        <div className="mx-auto grid w-full grid-cols-1 items-center gap-y-2 md:flex md:flex-wrap md:justify-between md:gap-y-3">
        <div className="grid w-full grid-cols-[auto_minmax(0,1fr)] items-center md:flex md:w-auto md:mb-0">
          <m.div
            className="relative mr-3 grid size-16 shrink-0 place-items-center overflow-hidden rounded-full bg-white p-2 shadow-xl min-[430px]:size-20 min-[430px]:p-3 sm:size-24 md:mr-5 md:size-32 md:p-5"
            variants={reboundRight}
            {...delayed(0.2)}
          >
            <ProgressBarLink href="/" className="relative block size-full overflow-hidden rounded-full">
              <Image
                src="/logo.png"
                alt="Sitaram Seva Sansthan Logo"
                priority
                fill
                sizes="(max-width: 429px) 4rem, (max-width: 768px) 5rem, 8rem"
                className="scale-[1.18] object-cover"
              />
            </ProgressBarLink>
          </m.div>
          <h1 className="min-w-0 overflow-visible">
            <div className="flex min-w-0 items-baseline gap-2">
              <m.span
                className="min-w-0 whitespace-nowrap font-serif text-[clamp(1.15rem,4.85vw,3rem)] font-extrabold leading-tight md:mt-0 md:text-4xl lg:text-5xl"
                variants={reboundDown}
                {...delayed(0.8)}
              >
                <Var>Sitaram Seva Sansthan</Var>
              </m.span>
              <m.span
                className="hidden md:block font-serif text-md md:text-xl font-medium mt-4 italic"
                variants={reboundRight}
                {...delayed(0.85)}
              >
                <T>Seva se Samadhan...</T>
              </m.span>
            </div>
            <m.div
              className="truncate text-base font-bold leading-tight md:text-xl"
              variants={reboundDown}
              {...delayed(0.85)}
            >
              <T>Reg.No:03/27/01/2596/24</T>
            </m.div>
          </h1>
        </div>

        <div className="hidden items-center md:flex">
          <div className="flex items-center space-x-3">
            <ul className="flex space-x-5 font-mono font-bold">
              {navItems.map((item, index) => (
                <li key={item.href}>
                  <ProgressBarLink href={item.href}>
                    <m.span
                      className="text-white text-base font-serif font-extrabold hover:underline"
                      variants={reboundDown}
                      {...delayed(0.9 + index * 0.05)}
                    >
                          <NavLabel label={item.label} />
                      
                    </m.span>
                  </ProgressBarLink>
                </li>
              ))}
            </ul>
            <DonateLink />
          </div>
        </div>

        <div className="grid w-full grid-cols-[minmax(0,13.5rem)_auto] items-center justify-between gap-y-2 md:hidden">
          <DonateLink
            wrapperClassName="col-span-full w-full"
            className="w-full whitespace-nowrap px-4 py-2 text-2xl sm:px-5"
            mobileLabel
          />
          <LanguageSwitcher compact className="w-full min-w-0" />
          
          <CardNav
            items={mobileNavItems}
            baseColor="#ffffff"
            menuColor="#ffffff"
            className="-mr-1 size-8 shrink-0 justify-self-end sm:-mr-0.5 sm:size-10"
          />
        </div>
        </div>
        <LanguageSwitcher className="absolute right-0 top-full hidden md:block" />
      </m.header>
    </LazyMotion>
  )
}
