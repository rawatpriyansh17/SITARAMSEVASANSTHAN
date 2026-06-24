import Image from 'next/image'
import Link from 'next/link'
import * as motion from 'motion/react-client'
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

import { delayed, reboundUp } from '@/app/components/motion-presets'
import { ProgressBarLink } from '@/app/components/progress-bar'
import { Separator } from '@/app/components/ui/separator'
import { T, Var } from 'gt-next'

const siteLinks = [
  { href: '/', label: <T>Home</T> },
  { href: '/about', label: <T>About Us</T> },
    { href: '/#posts-section-title', label: <T>Latest Programs</T> },
  { href: '/latest-event', label: <T>Upcoming Programs</T> },
] as const

const supportLinks = [
  { href: '/donate/#donate-checkout', label: <T>Donate Online</T> },
  { href: '/donate/#qr-code', label: <T>Scan QR to Donate</T> },
  { href: '/donate/#bank-details', label: <T>Bank Details</T> },
] as const

const breastCancerLinks = [
  {
    href: 'https://www.nationalbreastcancer.org/what-is-breast-cancer/',
    label: <T>What Is Breast Cancer?</T>,
  },
  {
    href: 'https://www.nationalbreastcancer.org/early-detection-of-breast-cancer/',
    label: <T>Early Detection</T>,
  },
  {
    href: 'https://www.nationalbreastcancer.org/breast-cancer-diagnosis/',
    label: <T>Diagnosis</T>,
  },
  {
    href: 'https://www.nationalbreastcancer.org/breast-cancer-staging/',
    label: <T>Stages</T>,
  },
  {
    href: 'https://www.nationalbreastcancer.org/types-of-breast-cancer/',
    label: <T>Types of Breast Cancer</T>,
  },
  {
    href: 'https://www.nationalbreastcancer.org/breast-cancer-treatment/',
    label: <T>Treatment</T>,
  },
  {
    href: 'https://www.nationalbreastcancer.org/breast-cancer-myths/',
    label: <T>Breast Cancer Myths</T>,
  },
  {
    href: 'https://www.nationalbreastcancer.org/breast-cancer-faqs/',
    label: <T>Breast Cancer FAQs</T>,
  },
  {
    href: 'https://www.nationalbreastcancer.org/educational-guides/',
    label: <T>Free Educational Guides</T>,
  },
  {
    href: 'https://www.nationalbreastcancer.org/breast-cancer-resources/',
    label: <T>Breast Cancer Resources</T>,
  },
] as const

const socialLinks = [
  {
    href: 'https://www.facebook.com/profile.php?id=61565118059016&mibextid=ZbWKwL',
    label: 'Facebook',
    icon: FaFacebook,
  },
  {
    href: 'https://www.instagram.com/sitaramsevasansthan?igsh=dDhpdXFuMXJwYzB6',
    label: 'Instagram',
    icon: FaInstagram,
  },
  {
    href: 'https://www.linkedin.com',
    label: 'LinkedIn',
    icon: FaLinkedin,
  },
] as const

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <motion.footer
      id="bottom-of-page"
      className="mt-auto border-t border-pink-300/70 bg-gradient-to-b from-pink-800 via-pink-900 to-pink-950 py-8 text-white md:py-10"
      variants={reboundUp}
      {...delayed(1)}
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-start">
          <div className="flex items-center gap-4 md:min-w-[22rem]">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-full border-2 border-white/20 bg-white ">
              <Image
                src="/logo.png"
                alt="Sitaram Seva Sansthan logo"
                fill
                sizes="56px"
                className="scale-[0.9] object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="italic font-serif text-2xl font-extrabold leading-none text-white">
                <T>Seva se Samadhan</T>
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-5 bg-white/20 md:my-6" />

        <div className="grid gap-6 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.95fr)_minmax(0,1fr)] md:gap-8">
            <section className="space-y-4">
              <div>
                <h4 className="font-mono text-xs font-extrabold uppercase tracking-[0.24em] text-pink-200">
                  <T>About Breast Cancer</T>
                </h4>
                <p className="mt-2 max-w-md font-mono text-sm font-semibold leading-relaxed text-pink-50/90">
                  <T>
                    Trusted educational reading for understanding symptoms, screening,
                    diagnosis, treatment, myths, and support resources.
                  </T>
                </p>
              </div>
              <div className="grid gap-3">
                {breastCancerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 font-mono text-sm font-bold text-pink-50 transition hover:text-pink-200 hover:underline"
                  >
                    <span className="pt-0.5 text-pink-300">
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </section>

            <Separator className="bg-white/20 md:hidden" />

            <section className="space-y-4">
              <div>
                <h4 className="font-mono text-xs font-extrabold uppercase tracking-[0.24em] text-pink-200">
                  <T>Explore Our Website</T>
                </h4>
                <p className="mt-2 font-mono text-sm font-semibold leading-relaxed text-pink-50/90">
                  <T>
                    Quick access to our story, active programs, donation page, and contact section.
                  </T>
                </p>
              </div>
              <div className="grid gap-3">
                {siteLinks.map((link) => (
                  <ProgressBarLink
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center gap-2 font-mono text-sm font-bold text-pink-50 transition hover:text-pink-200"
                  >
                    <ArrowUpRight className="size-4 text-pink-300" aria-hidden="true" />
                    {link.label}
                  </ProgressBarLink>
                ))}
              </div>

              <Separator className="bg-white/20" />

              <div>
                <h4 className="font-mono text-xs font-extrabold uppercase tracking-[0.24em] text-pink-200">
                  <T>Support Our Work</T>
                </h4>
                <div className="mt-3 grid gap-3">
                  {supportLinks.map((link) => (
                    <ProgressBarLink
                      key={`${link.href}-${String(link.label)}`}
                      href={link.href}
                      className="inline-flex items-center gap-2 font-mono text-sm font-bold text-pink-50 transition hover:text-pink-200"
                    >
                      <ArrowUpRight className="size-4 text-pink-300" aria-hidden="true" />
                      {link.label}
                    </ProgressBarLink>
                  ))}
                </div>
              </div>
            </section>

            <Separator className="bg-white/20 md:hidden" />

            <section className="space-y-4">
              <div>
                <h4 className="font-mono text-xs font-extrabold uppercase tracking-[0.24em] text-pink-200">
                  <T>Contact & Social</T>
                </h4>
                <p className="mt-2 font-mono text-sm font-semibold leading-relaxed text-pink-50/90">
                  <T>Reach us directly for donations, volunteering, and program-related queries.</T>
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 size-5 shrink-0 text-pink-200" />
                  <p className="font-mono text-sm font-semibold leading-relaxed text-pink-50 md:text-base">
                    <T><Var>110, Shreyansnath Apartment 3/2</Var> Near Shalby Hospital, Dr R.S.Bhandari Marg, Indore, Madhya Pradesh, India</T>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="size-5 shrink-0 text-pink-200" />
                  <a href="tel:+919111311301" className="font-mono text-sm font-bold text-pink-50 hover:text-pink-200 md:text-base">
                    <Var>+91 9111311301</Var>
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="size-5 shrink-0 text-pink-200" />
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=sansthansitaramseva@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all font-mono text-sm font-bold text-pink-50 hover:text-pink-200 md:text-base"
                  >
                    sansthansitaramseva@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                {socialLinks.map((link) => {
                  const Icon = link.icon

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 font-mono text-sm font-bold text-pink-50 transition hover:bg-white/10 hover:text-pink-100"
                      aria-label={link.label}
                    >
                      <Icon size={16} />
                      <span>{link.label}</span>
                    </Link>
                  )
                })}
              </div>
            </section>
        </div>

        <Separator className="my-5 bg-white/20 md:my-6" />

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs font-semibold leading-relaxed text-pink-100/85">
            <T>©</T> <Var>{year}</Var> <T>Sitaram Seva Sansthan.</T> <T>Reg.No:</T> <Var>03/27/01/2596/24</Var>
          </p>
          <p className="font-mono text-xs font-semibold leading-relaxed text-pink-100/85">
            <T>Built for awareness, education, and timely support.</T>
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
