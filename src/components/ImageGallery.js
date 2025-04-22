'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export default function ImageGallery({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  const openModal = (index) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const goToNextImage = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  }, [selectedIndex, images.length]);

  const goToPrevImage = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  }, [selectedIndex, images.length]);

  const handleKeyDown = useCallback(
    (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') goToNextImage();
      if (e.key === 'ArrowLeft') goToPrevImage();
      if (e.key === 'Escape') closeModal();
    },
    [selectedIndex, goToNextImage, goToPrevImage]
  );

  useEffect(() => {
    if (selectedIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, handleKeyDown]);

  if (!images || images.length === 0) {
    return <div className="text-center py-10 text-gray-400">No images found</div>;
  }

  return (
    <div className="bg-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={image.url}
              className="cursor-pointer relative overflow-hidden rounded-2xl"
              onClick={() => openModal(index)}
            >
              <div className="aspect-square relative">
                <Image
                  src={image.url}
                  alt={image.pathname?.split('/').pop() || 'Image'}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/40 text-white">
                <h3 className="font-medium text-center">
                  {image.pathname?.split('/').pop() || 'Image'}
                </h3>
                <p className="text-xs text-center text-gray-300">
                  {image.photoCount || '0'} Photos
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-6xl w-full rounded-lg overflow-hidden bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-600 transition"
              aria-label="Close"
            >
              ×
            </button>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevImage();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-600 transition"
              aria-label="Previous"
            >
              ‹
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNextImage();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-600 transition"
              aria-label="Next"
            >
              ›
            </button>

            {/* Image Content */}
            <div className="p-4 max-h-[85vh] flex justify-center items-center">
              <Image
                src={selectedImage.url}
                alt={selectedImage.pathname?.split('/').pop() || 'Image'}
                width={1600}
                height={900}
                className="max-h-[75vh] object-contain mx-auto"
                quality={100}
                priority
              />
            </div>

            <div className="pt-2 pb-4 text-center text-white">
              <p className="text-lg font-medium">
                {selectedImage.pathname?.split('/').pop() || 'Image'}
              </p>
              {selectedImage.uploadedAt && (
                <p className="text-sm text-gray-400 mt-1">
                  Uploaded: {new Date(selectedImage.uploadedAt).toLocaleString()}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                Image {selectedIndex + 1} of {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}