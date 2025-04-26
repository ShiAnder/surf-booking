// src/app/videos/page.js
import { getBlobs } from '../../lib/blobUtils';
import VideoGallery from '../../components/VideoGallery';

export const revalidate = 3600; // Revalidate the data at most every hour

export default async function VideosPage() {
  const videos = await getBlobs('videos/');

  return (
    <div className="min-h-screen bg-gray-100 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold italic tracking-tight drop-shadow-lg mb-3 md:mb-4">
            🌟 <span className="relative inline-block bg-gradient-to-r bg-clip-text px-2 md:px-3 py-1 rounded-md shadow-md animate-pulse">
              Cinematic
            </span> Journeys
          </h1>
          <p className="text-2xl md:text-3xl font-semibold italic text-gray-100 drop-shadow-lg max-w-3xl mx-auto transition-opacity duration-1000 ease-in-out animate-fade-in">
            Each video unfolds a new adventure—stories of discovery, excitement, and inspiration waiting to be explored.
          </p>
        </div>
        
        <VideoGallery videos={videos} />
      </div>
    </div>
  );
}