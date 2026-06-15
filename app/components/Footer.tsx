import Link from 'next/link'
import * as motion from 'motion/react-client'
import { MapPin, Phone, Mail } from 'lucide-react'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { delayed, reboundUp } from '@/app/components/motion-presets'

export default function Footer() {
  return (
    <motion.footer
      id="bottom-of-page"
      className="mt-auto border-t border-pink-300/70 bg-gradient-to-b from-pink-800 via-pink-900 to-pink-950 py-8 text-white md:py-10"
      variants={reboundUp}
      {...delayed(1)}
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.6fr)] md:items-start">
          <div>
            <h3 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Contact Us:-</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 size-5 flex-shrink-0" />
                
                  <p className="font-mono text-sm font-semibold leading-relaxed md:text-base">110, Shreyansnath Apartment 3/2 Near Shalby Hospital, Dr R.S.Bhandari Marg, Indore, Madhya Pradesh, India</p>
          
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-5 flex-shrink-0" />
                <p className="text-lg font-semibold">+91 9111311301</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-5 flex-shrink-0" />
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=sansthansitaramseva@gmail.com" target="_blank" rel="noopener noreferrer" className="break-all text-sm font-semibold hover:underline md:text-base">
                  sansthansitaramseva@gmail.com
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <h3 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Follow us here!</h3>
            <div className="flex gap-6">
              <Link href="https://www.facebook.com/profile.php?id=61565118059016&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="rounded-full p-2 transition-colors hover:bg-white/10" aria-label="Facebook">
                <FaFacebook size={36} />
              </Link>
              <Link href="https://www.instagram.com/sitaramsevasansthan?igsh=dDhpdXFuMXJwYzB6" target="_blank" rel="noopener noreferrer" className="rounded-full p-2 transition-colors hover:bg-white/10" aria-label="Instagram">
                <FaInstagram size={36} />
              </Link>
              <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="rounded-full p-2 transition-colors hover:bg-white/10" aria-label="LinkedIn">
                <FaLinkedin size={36} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
