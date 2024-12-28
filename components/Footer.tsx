import Link from 'next/link'
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react'
import { LanguageSwitch, LanguageToggle } from '@/components/LanguageSwitch'
export default function Footer() {
  return (
    <footer id="bottom-of-page" className="motion-preset-rebound-up motion-delay-[1000ms] bg-gradient-to-b from-pink-600 to-pink-900 text-white mt-10 py-4 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-3 md:mb-0 w-full md:w-1/2">
            <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4">Contact Us:-</h3>
            <div className="flex items-start mb-2">
              <MapPin className="mr-2 mt-1 flex-shrink-0 font-semibold " size={18} />
              <p className="text-xl"><LanguageSwitch
                                                        en="110, Shreyansnath Apartment 3/2 Near Shalby Hospital, Dr R.S.Bhandari Marg,Indore,Madhya Pradesh,India"
                                                        hi="110, श्रेयांसनाथ अपार्टमेंट 3/2  शेल्बी हॉस्पिटल के पास, डॉ आर एस भंडारी मार्ग, इंदौर एमपी "
                                                        tailwindStyles={{
                                                          en: "font-mono font-bold  text-sm md:text-xl",
                                                          hi: "font-mono  text-xl "
                                                        }}
                                                      /></p>
            </div>
            <div className="flex items-center mb-2">
              <Phone className="mr-2 flex-shrink-0 font-semibold" size={18} />
              <p className="text-xl">+91 9111311301</p>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 flex-shrink-0" size={18} />
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=sansthansitaramseva@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold text-xl">
                sansthansitaramseva@gmail.com
              </a>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end mb-1 w-full md:w-1/2 mt-6 md:mt-3">
            <h3 className="text-2xl md:text-4xl font-bold mb-4 font-serif">Follow us here!</h3>
            <div className="flex space-x-11 motion-preset-pulse">
              <Link href="https://www.facebook.com/profile.php?id=61565118059016&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" >
                <Facebook size={36} />
              </Link>
              <Link href="https://www.instagram.com/sitaramsevasansthan?igsh=dDhpdXFuMXJwYzB6" target="_blank" rel="noopener noreferrer" >
                <Instagram size={36} />
              </Link>
              <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" >
                <Linkedin size={36} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}