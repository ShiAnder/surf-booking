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
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        if (data.blobs.length === 0) {
          setError('No videos found.');
        } else {
          setVideos(data.blobs);
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError('Failed to fetch videos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

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
            <h1 className="text-4xl md:text-6xl font-extrabold italic tracking-tight drop-shadow-lg mb-3 md:mb-4">
              🌟 <span className="relative inline-block bg-gradient-to-r bg-clip-text px-2 md:px-3 py-1 rounded-md shadow-md animate-pulse">
                Cinematic
              </span> Journeys
            </h1>
            <p className="text-2xl md:text-3xl font-semibold italic text-gray-100 drop-shadow-lg max-w-3xl mx-auto transition-opacity duration-1000 ease-in-out animate-fade-in">
              Each video unfolds a new adventure—stories of discovery, excitement, and inspiration waiting to be explored.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div 
                key={video.pathname} 
                className="group relative overflow-hidden rounded-xl shadow-lg bg-gray-800"
              >
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <div className="absolute inset-0">
                    <video
                      key={video.url}
                      src={video.url}
                      controls
                      controlsList="nodownload"
                      className="w-full h-full object-cover"
                      preload="metadata"
                      playsInline
                      crossOrigin="anonymous"
                    >
                      <source src={video.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>

                {/* Video caption overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-sm font-medium truncate">
                      {video.pathname.split('/').pop()?.replace(/\.[^/.]+$/, '')}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}