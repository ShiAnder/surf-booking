// src/app/videos/page.tsx
'use client';

import { useEffect, useState } from 'react';

interface BlobFile {
  url: string;
  pathname: string;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<BlobFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/blob?prefix=videos/');
        if (!response.ok) throw new Error('Failed to fetch videos');
        const data = await response.json();
        if (data.blobs.length === 0) {
          setError('No videos found.');
        } else {
          setVideos(data.blobs);
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError('Failed to load videos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <section className="border-b border-sky-100 bg-sky-50/60">
        <div className="container-custom py-12 text-center md:py-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-sky-600">Videos</p>
          <h1 className="mx-auto mb-3 max-w-2xl text-3xl font-semibold text-slate-900 md:text-4xl">
            Cinematic journeys
          </h1>
          <p className="mx-auto max-w-xl text-slate-500">
            Stories of discovery, excitement, and inspiration from the water.
          </p>
        </div>
      </section>

      <div className="container-custom py-12">
        {loading && <p className="py-20 text-center text-sm text-slate-500">Loading videos...</p>}

        {!loading && error && <p className="py-20 text-center text-sm text-slate-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <div key={video.pathname} className="overflow-hidden rounded-xl border border-sky-100 bg-white shadow-sm">
                <video
                  src={video.url}
                  controls
                  controlsList="nodownload"
                  className="aspect-video w-full bg-slate-900 object-cover"
                  preload="metadata"
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
                <div className="px-4 py-3">
                  <h3 className="truncate text-sm font-medium text-slate-800">
                    {video.pathname.split('/').pop()?.replace(/\.[^/.]+$/, '')}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
