// src/app/videos/page.js
import { getBlobs } from '../../lib/blobUtils';
import VideoGallery from '../../components/VideoGallery';

export const revalidate = 3600; // Revalidate the data at most every hour

export default async function VideosPage() {
  const videos = await getBlobs('videos/');

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Video Gallery</h1>
        <VideoGallery videos={videos} />
      </div>
    </div>
  );
}