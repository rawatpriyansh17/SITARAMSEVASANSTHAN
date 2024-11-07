import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-pink-50">
      <Header setIsSidebarOpen={() => {}} />
      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-4xl font-bold text-pink-800 mb-8 text-center">Donate to Our Cause</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Bank Details</h2>
            <p className="mb-2"><strong>Account Name:</strong> सीताराम सेवा संस्थान</p>
            <p className="mb-2"><strong>Account Number:</strong> 123456789</p>
            <p className="mb-2"><strong>IFSC Code:</strong> ABCD0123456</p>
            <p className="mb-2"><strong>Bank Name:</strong> XYZ Bank</p>
            <p><strong>Branch:</strong> Main Branch, Indore</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">Scan QR Code to Donate</h2>
            <Image src="/qr-code.png" alt="Donation QR Code" width={200} height={200} />
            <p className="mt-4 text-center">Scan this QR code with your UPI app to make a donation</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}