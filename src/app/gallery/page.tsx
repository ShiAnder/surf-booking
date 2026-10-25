// src/app/gallery/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface BlobFile {
  url: string;
  pathname: string;
}

const IMAGES_PER_PAGE = 12;

export default function GalleryPage() {
  const [images, setImages] = useState<BlobFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(images.length / IMAGES_PER_PAGE));
  const paginatedImages = images.slice(
    (currentPage - 1) * IMAGES_PER_PAGE,
    currentPage * IMAGES_PER_PAGE
  );

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/blob?prefix=gallery/');
        if (!response.ok) throw new Error('Failed to fetch images');
        const data = await response.json();
        if (data.blobs.length === 0) {
          setError('No images found in the gallery.');
        } else {
          setImages(data.blobs as BlobFile[]);
        }
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Failed to load images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleImageLoad = (pathname: string) => {
    setLoadedImages((prev) => new Set(prev).add(pathname));
  };

  return (
    <div>
      <section className="border-b border-sky-100 bg-sky-50/60">
        <div className="container-custom py-12 text-center md:py-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-sky-600">Gallery</p>
          <h1 className="mx-auto mb-3 max-w-2xl text-3xl font-semibold text-slate-900 md:text-4xl">
            Saltwater stories
          </h1>
          <p className="mx-auto max-w-xl text-slate-500">
            Sun-kissed boards, crashing waves, and the spirit of the surf.
          </p>
        </div>
      </section>

      <div className="container-custom py-12">
        {loading && <p className="py-20 text-center text-sm text-slate-500">Loading gallery...</p>}

        {!loading && error && <p className="py-20 text-center text-sm text-slate-500">{error}</p>}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {paginatedImages.map((image) => (
                <div key={image.pathname} className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-sky-50">
                  <Image
                    src={image.url}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                      loadedImages.has(image.pathname) ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(image.pathname)}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-4 text-sm">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="btn-secondary !px-4 !py-2"
                >
                  Previous
                </button>
                <span className="text-slate-500">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="btn-secondary !px-4 !py-2"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
