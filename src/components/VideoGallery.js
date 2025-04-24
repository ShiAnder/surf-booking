'use client';

import { useState } from 'react';
import ModalVideo from 'react-modal-video';
import 'react-modal-video/css/modal-video.css';

export default function VideoGallery({ videos }) {
  const [isOpen, setOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [activeVideo, setActiveVideo] = useState(null);

  const openVideoModal = (url) => {
    setVideoUrl(url);
    setActiveVideo(url); // Set the active video URL
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setActiveVideo(null); // Reset the active video when modal is closed
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ModalVideo
        channel="custom"
        isOpen={isOpen}
        url={videoUrl}
        onClose={closeModal}
      />

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.url}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
            onClick={() => openVideoModal(video.url)}
          >
            <div className="aspect-video relative bg-gray-100">
              {/* Directly use the video URL */}
              <video
                className="w-full h-full object-cover"
                controls
                poster="/video-thumbnail-placeholder.jpg" // Optional: You can keep a placeholder for the poster image if needed
                muted={activeVideo !== video.url} // Mute other videos
                autoPlay={activeVideo === video.url} // Only play the active video
              >
                <source src={video.url} type="video/mp4" />
                {/* You can add more formats here if needed */}
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg truncate">{video.pathname.split('/').pop()}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
