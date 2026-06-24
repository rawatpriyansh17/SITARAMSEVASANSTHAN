import { notFound } from 'next/navigation';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { VideoDialog } from "@/app/components/VideoDialog";
import { fetchEventBySlug, type Media } from '@/lib/cms-api';
import { OptimizedImage } from '@/app/components/optimized-image';
import { T } from 'gt-next';
import { tx } from 'gt-next/server';

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

async function translateText(value: string | undefined, context: string) {
  if (!value?.trim()) return value;
  return tx(value, { $context: context });
}

async function translateMedia(media: Media[], context: string) {
  return Promise.all(
    media.map(async (item) => ({
      ...item,
      heading_en: await translateText(item.heading_en, `${context} heading`),
      description_en: await translateText(item.description_en, `${context} description`),
    }))
  );
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const eventData = await fetchEventBySlug(slug);

  if (!eventData) {
    notFound();
  }

  const { event, photos, videos } = eventData;
  const [
    eventHeading,
    description1,
    description2,
    photoSubheading,
    videoSubheading,
    translatedPhotos,
    translatedInterviews,
    translatedDistributions,
  ] = await Promise.all([
    translateText(event.heading_en, 'Event page heading'),
    translateText(event.description1_en, 'Event page primary description'),
    translateText(event.description2_en, 'Event page secondary description'),
    translateText(event.photoSubheading_en, 'Event photo coverage subheading'),
    translateText(event.videoSubheading_en, 'Event video coverage subheading'),
    translateMedia(photos, 'Event photo'),
    translateMedia(videos.interviews, 'Interview video'),
    translateMedia(videos.distributions, 'Distribution video'),
  ]);

  return (
    <div className="min-h-screen overflow-hidden bg-linear-to-b from-pink-50 via-pink-600 to-pink-700">
      <Header />
      <main className="container mx-auto mt-8 px-4">
        {/* Event Heading */}

         
          <h1 className="font-mono text-xl md:text-4xl font-extrabold text-pink-800 my-4 text-center bg-white p-4 rounded-xl shadow-md border-r-8 border-2 border-b-8 border-pink-700 w-fit h-auto ">🌟{eventHeading}</h1>
        
<div className="bg-pink-50 p-6 rounded-xl shadow-md my-3 border-r-8 border-2 border-b-8 border-purple-700">
        {/* Event Description 1 */}

               
                <p className="font-mono md:text-2xl text-base font-semibold text-purple-700 ">⭐{description1}</p>


        {/* Event Description 2 - Fixed TypeScript issues */}
        {description2 && (

               
                <p className="mt-1 font-mono md:text-xl text-xs font-semibold text-pink-700 ">
                  💡{description2}
                </p>
        
          
        )}
</div>
        {/* Photo Coverage Section */}
        {translatedPhotos.length > 0 && (
          <>
            <h2 className="my-4 py-2 flex bg-white w-fit text-nowrap border-r-8 border-2 border-b-8 rounded-xl border-pink-600">
                                       <span className="relative flex h-4 w-4 mx-3 my-2">
                
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-gradient-to-b from-pink-500 to-pink-600"></span>
                </span>
            
              <span className="font-mono text-xl md:text-3xl font-bold text-pink-800 text-shadow-lg ">{photoSubheading}</span>
            </h2>
            
            <div className="mb-8 columns-1 gap-3 lg:columns-3">
              {translatedPhotos.map((photo) => (
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
                  
                    <h3 className="text-lg font-mono font-bold mb-1 text-pink-800 text-shadow-lg">
                      {photo.heading_en}
                    </h3>
                  )}
                  {photo.description_en && (
                    
         
                    <p className="font-mono font-extrabold text-pink-700 text-sm md:text-base text-shadow-lg">{photo.description_en}</p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Video Coverage Section */}
        {(translatedInterviews.length > 0 || translatedDistributions.length > 0) && (
          <>
            <h2 className="my-4 p-2 flex bg-white w-fit text-nowrap border-r-8 border-2 border-b-8 rounded-xl border-red-600">
              <span className="relative flex h-4 w-4 mx-3 my-2">
                
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-gradient-to-b from-pink-500 to-pink-600"></span>
                </span>
            
              <span className="font-mono text-2xl md:text-4xl font-bold text-pink-800 text-shadow-lg ">{videoSubheading}</span>
            </h2>

            {/* Interview Videos */}
            {translatedInterviews.length > 0 && (
              <div className="mb-8">
          
                 
                  <h3 className="bg-gradient-to-b from-rose-700 via-rose-500 to-rose-700 w-fit px-3 py-2 rounded-xl font-mono mb-4 md:text-xl text-base font-bold text-white"><T># Interview(s):-</T></h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {translatedInterviews.map((video) => (
                    <div key={video.id} className="bg-white p-1 rounded-md shadow-md">
                      <VideoDialog
                        className="w-full"
                        animationStyle="from-center"
                        videoSrc={video.url}
                        thumbnailSrc={getVideoThumbnail(video)}
                        thumbnailAlt={video.heading_en || "Interview Video"}
                      />
                      {video.heading_en && (
                        <div className="p-2">
                           
                            <h4 className="font-bold font-mono text-pink-800 text-shadow-lg">🌟 {video.heading_en}</h4>
                          
                          {video.description_en && (
                            <p className="text-sm text-gray-600 mt-1 font-mono font-semibold">
                             
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
            {translatedDistributions.length > 0 && (
              <div className="mb-8">
                <h3 className="bg-gradient-to-b from-purple-700 via-purple-500 to-purple-700 w-fit px-3 py-2 rounded-xl font-mono mb-4 text-xl font-bold text-white">
                <T># Distribution(s):-</T>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {translatedDistributions.map((video) => (
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
                          
                            {video.heading_en}
                          </h4>
                          {video.description_en && (
                            <p className="text-sm text-gray-600 mt-1">
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
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
