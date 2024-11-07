
export default function Services() {
  return (
    <section id="services-section" className="mt-16 scroll-mt-24">
      <h2 className="text-6xl font-bold text-pink-800 mb-8 text-center">हमारी सेवाएँ</h2>
      <p className="text-2xl text-gray-700 mb-8 text-center px-4 font-bold">
        सीताराम सेवा संस्थान "सेवा से समाधान" की विचार धारा का अनुसरण करते हुए कैंसर पीड़ित महिलाओं के लिए समर्पित है, हमारे NGO द्वारा संचालित प्रोग्राम:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-4 font-semibold">
        <ServiceCard>
          ब्रेस्ट कैंसर पेशेंट महिलाओं को आर्टिफिशियल ओरिजिनल सिलिकॉन ब्रेस्ट निःशुल्क वितरण।
        </ServiceCard>
        <ServiceCard>
          ब्रेस्ट कैंसर पेशेंट महिलाओं को कीमो थैरेपी में दी जाने वाली दवाई का निःशुल्क वितरण।
        </ServiceCard>
        <ServiceCard>
          ओवेरियन कैंसर पेशेंट महिलाओं को कीमो थैरेपी में दी जाने वाली दवाई का निःशुल्क वितरण।
        </ServiceCard>
        <ServiceCard>
          रक्तदान शिवर का आयोजन करना।
        </ServiceCard>
        <ServiceCard>
          शासकीय विद्यालय में पढ़ने वाले जरूरतमंद छात्रों को स्कूल की फीस देना।
        </ServiceCard>
        <ServiceCard>
          पर्यावरण में हमारे सभी कार्यक्रम में आए सभी लोगों को पौधा वितरित करना।
        </ServiceCard>
      </div>
    </section>
  )
}

function ServiceCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-2 border-pink-300 hover:border-pink-500 transition-colors">
      <p className="text-lg text-gray-800">{children}</p>
    </div>
  )
}