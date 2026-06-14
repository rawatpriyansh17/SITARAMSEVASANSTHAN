import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import Image from 'next/image'
export default function DonatePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-pink-100 via-purple-300 to-pink-500">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-8 md:py-10">
        <h1 className="text-center">
            {/* <LanguageSwitch
                                            en="Donate to Our Cause:-"
                                            hi="दान करें:-"
                                            tailwindStyles={{
                                              en: "font-mono  text-3xl md:text-5xl font-extrabold  mb-2 p-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-700 to-pink-600",
                                              hi: "font-mono  text-3xl md:text-5xl font-extrabold mb-2 p-2  text-transparent bg-clip-text bg-gradient-to-l from-pink-600 via-purple-700 to-pink-600 "
                                            }}
                                          /> */}
                                          <span className="bg-gradient-to-r from-pink-600 via-purple-700 to-pink-600 bg-clip-text p-2 font-mono text-3xl font-extrabold text-transparent md:text-5xl">Donate to Our Cause:-</span>
                                        </h1>
        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-stretch">
          <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-md"> 
                  <Image src="/qr-code.png" alt="Donation QR Code" width={400} height={200} className="h-auto w-full max-w-md object-contain" />
            <p className="mt-4 text-center">
              {/* <LanguageSwitch
                                          en="Scan this QR code with your UPI app to make a donation"
                                          hi="दान देने के लिए अपने UPI ऐप से इस QR कोड को स्कैन करें"
                                          tailwindStyles={{
                                            en: "font-mono text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-l from-pink-600 via-purple-700 to-pink-600",
                                            hi: "font-mono text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-pink-600 via-purple-700 to-pink-600 "
                                          }}
                                        /> */}
                                        <span className="bg-gradient-to-l from-pink-600 via-purple-700 to-pink-600 bg-clip-text font-mono text-lg font-semibold text-transparent">Scan this QR code with your UPI app to make a donation</span>
                                        </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md md:p-10">
            <div className="flex h-full flex-col justify-center font-mono">
              <h2 className="mb-5 bg-gradient-to-l from-pink-600 via-purple-700 to-pink-600 bg-clip-text text-4xl font-semibold text-transparent md:text-5xl">Bank Details</h2>
              <div className="space-y-3">
                <p className="bg-gradient-to-l from-pink-600 via-purple-700 to-pink-600 bg-clip-text text-base text-transparent md:text-2xl"><strong>Account Name:</strong> सीताराम सेवा संस्थान</p>
                <p className="bg-gradient-to-l from-pink-600 via-purple-700 to-pink-600 bg-clip-text text-base text-transparent md:text-2xl"><strong>Account Number:</strong> 50100749971577</p>
                <p className="bg-gradient-to-l from-pink-600 via-purple-700 to-pink-600 bg-clip-text text-base text-transparent md:text-2xl"><strong>IFSC Code:</strong> HDFC0001240</p>
                <p className="bg-gradient-to-l from-pink-600 via-purple-700 to-pink-600 bg-clip-text text-base text-transparent md:text-2xl"><strong>Bank Name:</strong> HDFC Bank</p>
                <p className="bg-gradient-to-l from-pink-600 via-purple-700 to-pink-600 bg-clip-text text-base text-transparent md:text-2xl"><strong>Branch:</strong> Janjeerwala Chouraha Branch, Indore</p>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
