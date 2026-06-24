"use client";

import { type LucideIcon, ArrowUpRight } from 'lucide-react'
import { type KeyboardEvent, useState } from 'react'
import { T, useGT } from 'gt-next/client'

type CardNavLink = {
  label: string
  href: string
  ariaLabel: string
  icon?: LucideIcon
}

export type CardNavItem = {
  label: string
  bgColor: string
  textColor: string
  links: CardNavLink[]
}

export interface CardNavProps {
  items: CardNavItem[]
  className?: string
  baseColor?: string
  menuColor?: string
}

export default function CardNav({
  items,
  className = '',
  baseColor = '#ffffff',
  menuColor = '#ffffff',
}: CardNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const gt = useGT()

  function toggleMenu() {
    setIsOpen((open) => !open)
  }

  function closeMenu() {
    setIsOpen(false)
  }

  function handleMenuKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== 'Enter' && event.key !== ' ') return

    event.preventDefault()
    toggleMenu()
  }

  return (
    <>
      <button
        type="button"
        aria-label={isOpen ? gt('Close menu') : gt('Open menu')}
        aria-expanded={isOpen}
        onClick={toggleMenu}
        onKeyDown={handleMenuKeyDown}
        className={`flex size-10 flex-none flex-col items-center justify-center gap-[6px] rounded-full bg-pink-600 ring-2 ring-white/40 text-white shadow-lg shadow-pink-950/20 transition-colors hover:bg-pink-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${className}`}
        style={{ color: menuColor }}
      >
        <span
          className={`h-[2px] w-7 rounded-full bg-current transition-transform duration-300 ${
            isOpen ? 'translate-y-1 rotate-45' : ''
          }`}
        />
        <span
          className={`h-[2px] w-7 rounded-full bg-current transition-transform duration-300 ${
            isOpen ? '-translate-y-1 -rotate-45' : ''
          }`}
        />
      </button>

      <div
        className={`col-span-full grid w-full basis-full overflow-hidden transition-[grid-template-rows,opacity,padding-top] duration-200 ${
          isOpen
            ? 'grid-rows-[1fr] pt-3 opacity-100'
            : 'pointer-events-none grid-rows-[0fr] pt-0 opacity-0'
        }`}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div
          className="min-h-0 rounded-3xl p-2 shadow-lg shadow-pink-950/15"
          style={{ backgroundColor: baseColor }}
        >
          <div className="grid gap-2">
            {items.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl p-3 font-mono"
                style={{ backgroundColor: item.bgColor, color: item.textColor }}
              >
                <div className="mb-1 text-xs font-semibold uppercase tracking-wide opacity-80">
                  <CardNavLabel label={item.label} />
                </div>
                <div className="grid gap-1">
                  {item.links.map((link) => {
                    const Icon = link.icon ?? ArrowUpRight

                    return (
                      <a
                        key={`${link.href}-${link.label}`}
                        href={link.href}
                        aria-label={getCardNavAriaLabel(link.ariaLabel, gt)}
                        onClick={closeMenu}
                        className="inline-flex items-center gap-2 rounded-lg py-1 text-base font-bold transition-opacity hover:opacity-80"
                      >
                        <Icon className="size-4 shrink-0" aria-hidden="true" />
                        <span className="min-w-0 flex-1">
                          <CardNavLabel label={link.label} />
                        </span>
                        <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                      </a>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function CardNavLabel({ label }: { label: string }) {
  switch (label) {
    case 'Navigate':
      return <T>Navigate</T>
    case 'Programs':
      return <T>Programs</T>
    case 'Connect':
      return <T>Connect</T>
    case 'Home':
      return <T>Home</T>
    case 'About':
      return <T>About</T>
    case 'Upcoming-Events':
      return <T>Upcoming-Events</T>
    case 'Contact':
      return <T>Contact</T>
    default:
      return label
  }
}

function getCardNavAriaLabel(label: string, gt: ReturnType<typeof useGT>) {
  switch (label) {
    case 'Go to home page':
      return gt('Go to home page')
    case 'Learn about Sitaram Seva Sansthan':
      return gt('Learn about Sitaram Seva Sansthan')
    case 'View upcoming events':
      return gt('View upcoming events')
    case 'Scroll to contact details':
      return gt('Scroll to contact details')
    default:
      return label
  }
}
