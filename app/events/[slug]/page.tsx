import { notFound } from 'next/navigation';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { VideoDialog } from "@/app/components/VideoDialog";
import { fetchEventBySlug, type Media } from '@/lib/cms-api';
import { OptimizedImage } from '@/app/components/optimized-image';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getVideoThumbnail(video: Media): string {
  if (video.thumbnailUrl) {
    if (video.thumbnailUrl.startsWith('/interview') || video.thumbnailUrl.startsWith('/distribution')) {
      return video.thumbnailUrl;
    }

    if (video.thumbnailUrl.includes('ik.imagekit.io')) {
      return video.thumbnailUrl;
    }
  }

  return video.videoType === 'interview' ? '/interview.png' : '/distribution.png';
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const eventData = await fetchEventBySlug(slug);

  if (!eventData) {
    notFound();
  }

  const { event, photos, videos } = eventData;

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-pink-100 via-fuchsia-400 to-pink-600">
      <Header />
      <main className="container mx-auto mt-8 px-4">
        {/* Event Heading */}

          {/* <LanguageSwitch
            en={"🌟"+event.heading_en}
            hi={"🌟"+event.heading_hi}
            tailwindStyles={{
              en: "font-mono text-xl md:text-4xl font-extrabold text-pink-800 mb-4 text-center bg-white p-4 rounded-xl shadow-md border-r-8 border-2 border-b-8 border-pink-700 w-fit h-auto ",
              hi: "md:text-4xl text-2xl font-bold text-pink-800 mb-4 text-center bg-white p-4 rounded-xl shadow-md border-r-8 border-2 border-b-8 border-pink-700 w-fit h-auto"
            }}
          /> */}
          <h1 className="font-mono text-xl md:text-4xl font-extrabold text-pink-800 my-4 text-center bg-white p-4 rounded-xl shadow-md border-r-8 border-2 border-b-8 border-pink-700 w-fit h-auto ">🌟{event.heading_en}</h1>
        
<div className="bg-pink-50 p-6 rounded-xl shadow-md my-3 border-r-8 border-2 border-b-8 border-purple-700">
        {/* Event Description 1 */}

                {/* <LanguageSwitch
                  en={"⭐"+event.description1_en}
                  hi={"⭐"+event.description1_hi}
                  tailwindStyles={{
                    en: "font-mono md:text-2xl text-base font-semibold text-purple-700 ",
                    hi: "font-mono md:text-2xl text-base font-semibold text-purple-700 "
                  }}
                /> */}
                <p className="font-mono md:text-2xl text-base font-semibold text-purple-700 ">⭐{event.description1_en}</p>


        {/* Event Description 2 - Fixed TypeScript issues */}
        {event.description2_en && (

                // { <LanguageSwitch
                //   en={"💡"+event.description2_en}
                //   hi={"💡"+event.description2_hi || event.description2_en} // Fallback to English if Hindi not available
                //   tailwindStyles={{
                //     en: "bg-pink-100 rounded-xl font-mono md:text-xl text-xs font-semibold text-pink-700 ",
                //     hi: "bg-pink-100 rounded-xl font-mono md:text-xl text-sm font-semibold text-pink-700 "
                //   }}
                // /> }
                <p className="mt-1 font-mono md:text-xl text-xs font-semibold text-pink-700 ">
                  💡{event.description2_en}
                </p>
        
          
        )}
</div>
        {/* Photo Coverage Section */}
        {photos.length > 0 && (
          <>
            <h2 className="my-4 py-2 flex bg-white w-fit text-nowrap border-r-8 border-2 border-b-8 rounded-xl border-pink-600">
                                       <span className="relative flex h-4 w-4 mx-3 my-2">
                
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-gradient-to-b from-pink-500 to-pink-600"></span>
                </span>
              {/* <LanguageSwitch
                en={event.photoSubheading_en}
                hi={event.photoSubheading_hi}
                tailwindStyles={{
                  en: "font-mono text-2xl md:text-4xl font-bold text-pink-800 ",
                  hi: "font-serif text-2xl pr-2 md:text-4xl font-bold text-pink-800 "
                }}
              /> */}
              <span className="font-mono text-xl md:text-3xl font-bold text-pink-800 ">{event.photoSubheading_en}</span>
            </h2>
            
            <div className="mb-8 columns-1 gap-3 lg:columns-2 xl:columns-3">
              {photos.map((photo) => (
                <div key={photo.id} className="mb-4 inline-block w-full break-inside-avoid rounded-lg border-2 border-r-4 border-b-4 border-pink-800 bg-white p-2 shadow-md">
                  <OptimizedImage
                    src={photo.url}
                    alt={photo.heading_en || 'Event Photo'}
                    width={400}
                    height={300}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="mb-3 h-auto w-full rounded shadow-lg"
                  />
                  {photo.heading_en && (
                    //   {/* <LanguageSwitch
                    //     en={photo.heading_en}
                    //     hi={photo.heading_hi || photo.heading_en}
                    //     tailwindStyles={{
                    //       en: "font-mono text-lg font-bold text-pink-800",
                    //       hi: "font-mono text-lg font-bold text-pink-800"
                    //     }}
                    //   /> */}
            
                    <h3 className="text-lg font-mono font-bold mb-1 text-pink-800">
                      {photo.heading_en}
                    </h3>
                  )}
                  {photo.description_en && (
                    //   {/* <LanguageSwitch
                    //     en={photo.description_en}
                    //     hi={photo.description_hi || photo.description_en}
                    //     tailwindStyles={{
                    //       en: "font-mono font-extrabold text-pink-700 text-sm md:text-base",
                    //       hi: "font-mono font-extrabold text-pink-700 text-sm md:text-base"
                    //     }}
                    //   /> */}
         
                    <p className="font-mono font-extrabold text-pink-700 text-sm md:text-base">{photo.description_en}</p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Video Coverage Section */}
        {(videos.interviews.length > 0 || videos.distributions.length > 0) && (
          <>
            <h2 className="my-4 p-2 flex bg-white w-fit text-nowrap border-r-8 border-2 border-b-8 rounded-xl border-red-600">
              <span className="relative flex h-4 w-4 mx-3 my-2">
                
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-gradient-to-b from-pink-500 to-pink-600"></span>
                </span>
              {/* <LanguageSwitch
                en={event.videoSubheading_en}
                hi={event.videoSubheading_hi}
                tailwindStyles={{
                  en: "font-mono text-2xl md:text-4xl font-bold text-pink-800 ",
                  hi: "font-serif text-3xl md:text-4xl font-bold text-pink-800 "
                }}
              /> */}
              <span className="font-mono text-2xl md:text-4xl font-bold text-pink-800 ">{event.videoSubheading_en}</span>
            </h2>

            {/* Interview Videos */}
            {videos.interviews.length > 0 && (
              <div className="mb-8">
          
                  {/* <LanguageSwitch
                    en="# Interview(s):-"
                    hi="# इंटरव्यू:-"
                    tailwindStyles={{
                      en: "md:text-xl text-base font-bold text-white",
                      hi: "text-xl font-bold text-white"
                    }}
                  /> */}
                  <h3 className="bg-gradient-to-b from-rose-700 via-rose-500 to-rose-700 w-fit px-3 py-2 rounded-xl font-mono mb-4 md:text-xl text-base font-bold text-white"># Interview(s):-</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {videos.interviews.map((video) => (
                    <div key={video.id} className="bg-white p-1 rounded-md shadow-md">
                      <VideoDialog
                        className="w-full"
                        animationStyle="from-center"
                        videoSrc={video.url}
                        thumbnailSrc={getVideoThumbnail(video)}
                        thumbnailAlt={video.heading_en || "Interview Video"}
                      />
                      {video.heading_en && (
                        <div className="p-3">
                            {/* <LanguageSwitch
                              en={video.heading_en}
                              hi={video.heading_hi || video.heading_en}
                              tailwindStyles={{
                                en: "font-semibold text-pink-800",
                                hi: "font-semibold text-pink-800"
                              }}
                            /> */}
                            <h4 className="font-semibold text-pink-800">{video.heading_en}</h4>
                          
                          {video.description_en && (
                            <p className="text-sm text-gray-600 mt-1">
                              {/* <LanguageSwitch
                                en={video.description_en}
                                hi={video.description_hi || video.description_en}
                                tailwindStyles={{
                                  en: "text-sm text-gray-600",
                                  hi: "text-sm text-gray-600"
                                }}
                              /> */}
                              {video.description_en}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Distribution Videos */}
            {videos.distributions.length > 0 && (
              <div className="mb-8">
                <h3 className="bg-gradient-to-b from-purple-700 via-purple-500 to-purple-700 w-fit px-3 py-2 rounded-xl font-mono mb-4 text-xl font-bold text-white">
                  {/* <LanguageSwitch
                    en="# Distribution(s):-"
                    hi="# वितरण:-"
                    tailwindStyles={{
                      en: "text-xl font-bold text-white",
                      hi: "text-xl font-bold text-white"
                    }}
                  /> */}# Distribution(s):-
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {videos.distributions.map((video) => (
                    <div key={video.id} className="bg-white p-1 rounded-md shadow-md">
                      <VideoDialog
                        className="w-full"
                        animationStyle="from-center"
                        videoSrc={video.url}
                        thumbnailSrc={getVideoThumbnail(video)}
                        thumbnailAlt={video.heading_en || "Distribution Video"}
                      />
                      {video.heading_en && (
                        <div className="p-3">
                          <h4 className="font-semibold text-pink-800">
                            {/* <LanguageSwitch
                              en={video.heading_en}
                              hi={video.heading_hi || video.heading_en}
                              tailwindStyles={{
                                en: "font-semibold text-pink-800",
                                hi: "font-semibold text-pink-800"
                              }}
                            /> */}
                            {video.heading_en}
                          </h4>
                          {video.description_en && (
                            <p className="text-sm text-gray-600 mt-1">
                                {/* <LanguageSwitch
                                  en={video.description_en}
                                  hi={video.description_hi || video.description_en}
                                  tailwindStyles={{
                                    en: "text-sm text-gray-600",
                                    hi: "text-sm text-gray-600"
                                  }}
                                /> */}{video.description_en}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
