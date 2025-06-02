// src/app/gallery/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface BlobFile {
  url: string;
  pathname: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<BlobFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 10;
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const paginatedImages = images.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/blob?prefix=gallery/');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        if (data.blobs.length === 0) {
          setError('No images found in the gallery.');
        } else {
          setImages(data.blobs as BlobFile[]);
        }
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Failed to fetch images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleImageLoad = (pathname: string) => {
    setLoadedImages(prev => new Set([...Array.from(prev), pathname]));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-center px-4">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="pt-48 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-extrabold italic tracking-tight text-gray-700 drop-shadow-lg mb-4">
              🌴 <span className="relative inline-block bg-yellow-400 text-teal-900 px-3 py-1 rounded-md shadow-md animate-pulse">Saltwater</span> Stories
            </h1>
            <p className="text-4xl md:text-3xl font-semibold italic text-gray-500 drop-shadow-lg max-w-3xl mx-auto transition-opacity duration-1000 ease-in-out animate-fade-in">
              Every image tells a tale—of sun-kissed boards, crashing waves, and the spirit of the surf.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedImages.map((image) => (
              <div 
                key={image.pathname} 
                className="group relative overflow-hidden rounded-xl shadow-lg bg-gray-800"
              >
                {/* Loading placeholder */}
                {!loadedImages.has(image.pathname) && (
                  <div className="absolute inset-0 bg-gray-700 animate-pulse" />
                )}
                
                {/* Image container with explicit height */}
                <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                  <div className="absolute inset-0">
                    <Image
                      src={image.url}
                      alt=''
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className={`object-cover transition-all duration-500 group-hover:scale-110 ${
                        loadedImages.has(image.pathname) ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => handleImageLoad(image.pathname)}
                      priority={false}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow transition-opacity duration-200 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
              >
                Previous
              </button>
              <span className="text-white font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow transition-opacity duration-200 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}