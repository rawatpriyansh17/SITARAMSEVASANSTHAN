import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import { LanguageSwitch } from "@/app/components/LanguageSwitch";

export default function AwarenessPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-pink-100  via-purple-300 to-pink-500">
      <Header />
      <main className="container mx-auto mt-8 px-4">
        <h1>
          <LanguageSwitch
            en="Programs conducted by the organization in October 2024 :-"
            hi="अक्टूबर 2024 में संस्था द्वारा संचालित कार्यक्रम :-"
            tailwindStyles={{
              en: "font-mono text-xl md:text-4xl font-extrabold text-pink-800 mb-8 text-center ",
              hi: "md:text-4xl text-2xl font-bold text-pink-800 mb-8 text-center",
            }}
          />
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <p>
            <LanguageSwitch
              en="On 5,18,19,25 October 2024, again under the program run by the organization, chemotherapy medicine were distributed free of cost to breast cancer patients."
              hi="अक्टूबर 2024 में पुनः संस्था द्वारा संचालित कार्यक्रम के अंतर्गत ब्रेस्ट कैंसर पेशेंट महिलाओं को कीमोथेरेपी की दवाइयाँ निःशुल्क वितरित की गईं।"
              tailwindStyles={{
                en: "font-serif text-base md:text-2xl font-extrabold text-pink-800 mb-3 ",
                hi: "font-serif text-base md:text-2xl font-extrabold text-pink-800 mb-3",
              }}
            />
          </p>
          <p>
            <LanguageSwitch
              en="This initiative aims to improve the confidence and quality of life of women affected by breast cancer. We are grateful for the support of our community members and donors who made this program possible."
              hi="   इस पहल का उद्देश्य ब्रेस्ट कैंसर से पीड़ित महिलाओं के आत्मविश्वास और जीवन की गुणवत्ता में सुधार लाना है। हम अपने समुदाय के सदस्यों और दानदाताओं के समर्थन के लिए आभारी हैं, जिन्होंने इस कार्यक्रम को संभव बनाया।"
              tailwindStyles={{
                en: "font-serif md:text-xl text-sm font-semibold text-purple-700 mb-2 ",
                hi: "font-serif md:text-xl text-base font-semibold text-purple-700 mb-2",
              }}
            />
          </p>
        </div>
        <h2 className="ml-2">
          <LanguageSwitch
            en="Photo/News Coverage:-"
            hi=" फोटो/समाचार कवरेज:-"
            tailwindStyles={{
              en: "font-mono text-2xl  md:text-4xl font-bold text-pink-800 mb-6",
              hi: "font-serif text-3xl md:text-4xl font-bold text-pink-800 mb-6",
            }}
          />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src="/image1.jpeg"
              alt="5 October 2024"
              width={400}
              height={300}
              className="w-full h-120 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-pink-800">
                5 October 2024
              </h2>
              <p className="text-gray-700 text-xl">
                ओवेरियन कैंसर पेशेंट को कीमो थैरेपी में दी जाने वाली दवाई
                निःशुल्क दी गई
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src="/image2.jpeg"
              alt="18 October 2024"
              width={400}
              height={300}
              className="w-full h-120 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-pink-800">
                18 October 2024
              </h2>
              <p className="text-gray-700 text-xl">
                ओवेरियन कैंसर पेशेंट को कीमो थैरेपी में दी जाने वाली दवाई
                निःशुल्क दी गई
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src="/image3.jpeg"
              alt="19 October 2024"
              width={400}
              height={300}
              className="w-full h-120 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-pink-800">
                19 October 2024
              </h2>
              <p className="text-gray-700 text-xl">
                स्तन कैंसर पेशेंट को कीमो थैरेपी में दी जाने वाली दवाई निःशुल्क
                दी गई
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src="/image4.jpeg"
              alt="25 October 2024"
              width={400}
              height={300}
              className="w-full h-120 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-pink-800">
                25 October 2024
              </h2>
              <p className="text-gray-700 text-xl">
                ओवेरियन कैंसर पेशेंट(attender) को कीमो थैरेपी में दी जाने वाली
                दवाई निःशुल्क दी गई
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
