import { notFound } from 'next/navigation';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { LanguageSwitch } from "@/app/components/LanguageSwitch";
import { VideoDialog } from "@/app/components/VideoDialog";
import { fetchEventBySlug } from '@/lib/cms-api';
import { OptimizedImage } from '@/app/components/optimized-image';

interface PageProps {
  params: Promise<{ slug: string }>; // Changed to Promise
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params; // Added await
  const eventData = await fetchEventBySlug(slug);

  if (!eventData) {
    notFound();
  }

  const { event, photos, videos } = eventData;

  // Helper function to get correct thumbnail
  const getVideoThumbnail = (video: any) => {
    if (video.thumbnailUrl) {
      // If it's a CMS thumbnail path, use NGOCODE equivalent
      if (video.thumbnailUrl.startsWith('/interview') || video.thumbnailUrl.startsWith('/distribution')) {
        return video.thumbnailUrl;
      }
      // If it's ImageKit URL, use it
      if (video.thumbnailUrl.includes('ik.imagekit.io')) {
        return video.thumbnailUrl;
      }
    }
    // Default based on video type
    return video.videoType === 'interview' ? '/interview.png' : '/distribution.png';
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-pink-100 via-purple-300 to-pink-500">
      <Header />
      <main className="container mx-auto mt-8 px-4">
        {/* Event Heading */}
        <h1>
          <LanguageSwitch
            en={event.heading_en}
            hi={event.heading_hi}
            tailwindStyles={{
              en: "font-mono text-xl md:text-4xl font-extrabold text-pink-800 mb-8 text-center",
              hi: "md:text-4xl text-2xl font-bold text-pink-800 mb-8 text-center"
            }}
          />
        </h1>

        {/* Event Description 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <p>
            <LanguageSwitch
              en={event.description1_en}
              hi={event.description1_hi}
              tailwindStyles={{
                en: "font-serif md:text-xl text-sm font-semibold text-purple-700 mb-2",
                hi: "font-serif md:text-xl text-base font-semibold text-purple-700 mb-2"
              }}
            />
          </p>
        </div>

        {/* Event Description 2 */}
        {event.description2_en && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <p>
              <LanguageSwitch
                en={event.description2_en}
                hi={event.description2_hi}
                tailwindStyles={{
                  en: "font-serif md:text-xl text-sm font-semibold text-purple-700 mb-2",
                  hi: "font-serif md:text-xl text-base font-semibold text-purple-700 mb-2"
                }}
              />
            </p>
          </div>
        )}

        {/* Photo Coverage Section */}
        {photos.length > 0 && (
          <>
            <h2 className="ml-2">
              <LanguageSwitch
                en={event.photoSubheading_en}
                hi={event.photoSubheading_hi}
                tailwindStyles={{
                  en: "font-mono text-2xl md:text-4xl font-bold text-pink-800 mb-6",
                  hi: "font-serif text-3xl md:text-4xl font-bold text-pink-800 mb-6"
                }}
              />
            </h2>
            
            <div className={`grid gap-4 sm:gap-8 mb-8 ${
              photos.length === 1 ? 'grid-cols-1' :
              photos.length === 2 ? 'grid-cols-1 sm:grid-cols-2' :
              photos.length === 3 ? 'grid-cols-1 sm:grid-cols-3' :
              'grid-cols-1 sm:grid-cols-2 md:grid-cols-4'
            }`}>
              {photos.map((photo) => (
                <div key={photo.id} className="bg-white p-4 rounded-lg shadow-md">
                  <OptimizedImage
                    src={photo.url}
                    alt={photo.heading_en || 'Event Photo'}
                    width={400}
                    height={300}
                    className="w-full h-auto mb-4 rounded"
                    transformation={[
                      { width: 400, height: 300, crop: 'maintain_ratio' },
                      { quality: 85 },
                      { format: 'webp' }
                    ]}
                  />
                  {photo.heading_en && (
                    <h3 className="text-lg font-semibold mb-2 text-pink-800">
                      <LanguageSwitch
                        en={photo.heading_en}
                        hi={photo.heading_hi || photo.heading_en}
                        tailwindStyles={{
                          en: "text-lg font-semibold text-pink-800",
                          hi: "text-lg font-semibold text-pink-800"
                        }}
                      />
                    </h3>
                  )}
                  {photo.description_en && (
                    <p className="text-gray-700">
                      <LanguageSwitch
                        en={photo.description_en}
                        hi={photo.description_hi || photo.description_en}
                        tailwindStyles={{
                          en: "text-gray-700 text-sm",
                          hi: "text-gray-700 text-sm"
                        }}
                      />
                    </p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Video Coverage Section */}
        {(videos.interviews.length > 0 || videos.distributions.length > 0) && (
          <>
            <h2 className="ml-2">
              <LanguageSwitch
                en={event.videoSubheading_en}
                hi={event.videoSubheading_hi}
                tailwindStyles={{
                  en: "font-mono text-2xl md:text-4xl font-bold text-pink-800 mb-6",
                  hi: "font-serif text-3xl md:text-4xl font-bold text-pink-800 mb-6"
                }}
              />
            </h2>

            {/* Interview Videos */}
            {videos.interviews.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-pink-700 mb-4">
                  <LanguageSwitch
                    en="Interviews:-"
                    hi="इंटरव्यू:-"
                    tailwindStyles={{
                      en: "text-xl font-bold text-pink-700",
                      hi: "text-xl font-bold text-pink-700"
                    }}
                  />
                </h3>
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
                          <h4 className="font-semibold text-pink-800">
                            <LanguageSwitch
                              en={video.heading_en}
                              hi={video.heading_hi || video.heading_en}
                              tailwindStyles={{
                                en: "font-semibold text-pink-800",
                                hi: "font-semibold text-pink-800"
                              }}
                            />
                          </h4>
                          {video.description_en && (
                            <p className="text-sm text-gray-600 mt-1">
                              <LanguageSwitch
                                en={video.description_en}
                                hi={video.description_hi || video.description_en}
                                tailwindStyles={{
                                  en: "text-sm text-gray-600",
                                  hi: "text-sm text-gray-600"
                                }}
                              />
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
                <h3 className="text-xl font-bold text-pink-700 mb-4">
                  <LanguageSwitch
                    en="Distribution Coverage:-"
                    hi="वितरण कवरेज:-"
                    tailwindStyles={{
                      en: "text-xl font-bold text-pink-700",
                      hi: "text-xl font-bold text-pink-700"
                    }}
                  />
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
                            <LanguageSwitch
                              en={video.heading_en}
                              hi={video.heading_hi || video.heading_en}
                              tailwindStyles={{
                                en: "font-semibold text-pink-800",
                                hi: "font-semibold text-pink-800"
                              }}
                            />
                          </h4>
                          {video.description_en && (
                            <p className="text-sm text-gray-600 mt-1">
                              <LanguageSwitch
                                en={video.description_en}
                                hi={video.description_hi || video.description_en}
                                tailwindStyles={{
                                  en: "text-sm text-gray-600",
                                  hi: "text-sm text-gray-600"
                                }}
                              />
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