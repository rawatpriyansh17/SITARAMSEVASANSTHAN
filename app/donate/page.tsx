import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-300 to-pink-100">
      <Header />
      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-4xl font-bold text-pink-800 mb-8 text-center">Donate to Our Cause</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"> 
                  <Image src="/qr-code.png" alt="Donation QR Code" width={400} height={200} />
            <p className="mt-4 text-center text-pink-700 font-mono font-semibold">Scan this QR code with your UPI app to make a donation</p>
          </div>
          <div className="bg-white p-10 md:p-[115px] rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold mb-4 text-pink-900">Bank Details</h2>
            <p className="mb-2 text-pink-800 text-base md:text-2xl"><strong>Account Name:</strong> सीताराम सेवा संस्थान</p>
            <p className="mb-2 text-pink-800 text-base md:text-2xl"><strong>Account Number:</strong> 50100749971577</p>
            <p className="mb-2 text-pink-800 text-base md:text-2xl"><strong>IFSC Code:</strong>  HDFC0001240</p>
            <p className="mb-2 text-pink-800 text-base md:text-2xl"><strong>Bank Name:</strong> HDFC Bank</p>
            <p className="mb-2 text-pink-800 text-base md:text-2xl"><strong>Branch:</strong> Janjeerwala Chouraha Branch, Indore</p>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}