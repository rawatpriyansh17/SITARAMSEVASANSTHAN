

export default function Services() {
  return (
    <section id="services-section" className="mt-10 scroll-mt-24 ">
      <h2 className=" text-4xl md:text-6xl font-bold text-pink-800 mb-2 md-mb-8 text-center">हमारी सेवाएँ</h2>
      <p className=" text-base md:text-2xl text-gray-700 mb-8 text-center px-4 font-bold">
        सीताराम सेवा संस्थान "सेवा से समाधान" की विचार धारा का अनुसरण करते हुए कैंसर पीड़ित महिलाओं के लिए समर्पित है, हमारे NGO द्वारा संचालित प्रोग्राम:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-4 font-semibold text-2xl">
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
    <div className=" font-semibold text-wrap md:text-2xl group relative inline-flex h-auto p-2 items-center justify-center overflow-hidden rounded-md  bg-gradient-to-r dark:from-[#070e41] dark:to-[#263381] from-[#f6f7ff] to-[#f5f6ff] dark:border-[rgb(206_67_117)] border-2 border-[#a31b93]  bg-transparent px-6  dark:text-white text-black transition-all duration-100 [box-shadow:5px_5px_rgb(206_67_125)] dark:[box-shadow:5px_5px_rgb(76_100_255)] hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_rgb(38_51_129)] dark:hover:[box-shadow:0px_0px_rgb(76_100_255)]">
      <p className="text-lg text-gray-800">{children}</p>
    </div>
  )
}