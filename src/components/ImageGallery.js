'use client';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useState } from 'react';
import Image from 'next/image';

export default function ImageGallery({ images }) {
  const [index, setIndex] = useState(-1);

  if (!images || images.length === 0) {
    return <div className="text-center py-10 text-gray-400">No images found</div>;
  }

  const slides = images.map((img) => ({
    src: img.url,
    alt: img.pathname?.split('/').pop() || 'Image',
  }));

  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4">
      {/* Changed from flex to grid to create proper rows and columns */}
      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {images.map((image, i) => (
          <div
            key={image.url}
            className="cursor-pointer group overflow-hidden rounded-xl relative"
            onClick={() => setIndex(i)}
          >
            <div className="relative aspect-[3/2] w-full">
              <Image
                src={image.url}
                alt={image.pathname?.split('/').pop() || 'Image'}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 rounded-xl"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center p-2">
              <h3 className="text-sm font-semibold truncate">
                {image.pathname?.split('/').pop() || 'Image'}
              </h3>
              <p className="text-xs text-gray-300">{image.photoCount || '0'} Photos</p>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        index={index}
        on={{ view: ({ index }) => setIndex(index) }}
        styles={{ container: { backgroundColor: 'rgba(0, 0, 0, 0.9)' } }}
      />
    </div>
  );
}