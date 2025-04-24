// src/app/gallery/page.js
import { getBlobs } from '../../lib/blobUtils';
import ImageGallery from '../../components/ImageGallery';

export const revalidate = 3600; // Revalidate the data at most every hour

export default async function GalleryPage() {
  const images = await getBlobs('gallery/');

  return ( 
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 mt-[50px]">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold italic tracking-tight text-white drop-shadow-lg mb-4">
            🌴 <span className="relative inline-block bg-yellow-400 text-teal-900 px-3 py-1 rounded-md shadow-md animate-pulse">Saltwater</span> Stories
          </h1>
          <p className="text-4xl md:text-3xl font-semibold italic text-gray-100 drop-shadow-lg max-w-3xl mx-auto transition-opacity duration-1000 ease-in-out animate-fade-in">
            Every image tells a tale—of sun-kissed boards, crashing waves, and the spirit of the surf.
          </p>

        </div>

        <ImageGallery images={images} />
      </div>
    </div>
  );
}