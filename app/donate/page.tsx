import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { LanguageSwitch, LanguageToggle } from '@/components/LanguageSwitch'
export default function DonatePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-pink-100 via-purple-300 to-pink-500">
      <Header />
      <main className="container mx-auto mt-2 px-4">
        <h1 className="text-center "><LanguageSwitch
                                          en="Donate to Our Cause:-"
                                          hi="दान करें:-"
                                          tailwindStyles={{
                                            en: "font-mono  text-3xl md:text-5xl font-extrabold  mb-2 p-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-700 to-pink-600",
                                            hi: "font-mono  text-3xl md:text-5xl font-extrabold mb-2 p-2  text-transparent bg-clip-text bg-gradient-to-l from-pink-600 via-purple-700 to-pink-600 "
                                          }}
                                        /></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"> 
                  <Image src="/qr-code.png" alt="Donation QR Code" width={400} height={200} />
            <p className="mt-4 text-center"><LanguageSwitch
                                          en="Scan this QR code with your UPI app to make a donation"
                                          hi="दान देने के लिए अपने UPI ऐप से इस QR कोड को स्कैन करें"
                                          tailwindStyles={{
                                            en: "font-mono text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-l from-pink-600 via-purple-700 to-pink-600",
                                            hi: "font-mono text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-pink-600 via-purple-700 to-pink-600 "
                                          }}
                                        /></p>
          </div>
          <div className="bg-white p-10 md:p-[115px] rounded-lg shadow-md ">
            <div className='m-2 font-mono'>
              <h2 className="text-5xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-l from-pink-600 via-purple-700 to-pink-600">Bank Details</h2>
              <p className="mb-2 text-transparent bg-clip-text bg-gradient-to-l from-pink-600 via-purple-700 to-pink-600 text-base md:text-2xl"><strong>Account Name:</strong> सीताराम सेवा संस्थान</p>
              <p className="mb-2 text-transparent bg-clip-text bg-gradient-to-l from-pink-600 via-purple-700 to-pink-600 text-base md:text-2xl"><strong>Account Number:</strong> 50100749971577</p>
              <p className="mb-2 text-transparent bg-clip-text bg-gradient-to-l from-pink-600 via-purple-700 to-pink-600 text-base md:text-2xl"><strong>IFSC Code:</strong>  HDFC0001240</p>
              <p className="mb-2 text-transparent bg-clip-text bg-gradient-to-l from-pink-600 via-purple-700 to-pink-600 text-base md:text-2xl"><strong>Bank Name:</strong> HDFC Bank</p>
              <p className="mb-2 text-transparent bg-clip-text bg-gradient-to-l from-pink-600 via-purple-700 to-pink-600 text-base md:text-2xl"><strong>Branch:</strong> Janjeerwala Chouraha Branch, Indore</p>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}