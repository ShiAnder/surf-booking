'use client';

import { useState } from 'react';
import { formatFileSize } from '../lib/blobUtils';

export default function VideoGallery({ videos }) {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openModal = (video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  if (!videos || videos.length === 0) {
    return <div className="text-center py-10">No videos found</div>;
  }

  const renderVideoCard = (video) => (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
      onClick={() => openModal(video)}
    >
      <div className="aspect-video relative bg-gray-100">
        <video 
          className="w-full h-full object-cover"
          poster="/video-thumbnail-placeholder.jpg"
        >
          <source src={video.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg truncate">{video.pathname.split('/').pop()}</h3>
        <p className="text-sm text-gray-500">{formatFileSize(video.size)}</p>
        {video.uploadedAt && (
          <p className="text-sm text-gray-500 mt-1">
            {new Date(video.uploadedAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );

  const renderVideoModal = () => {
    if (!selectedVideo) return null;
    
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4" onClick={closeModal}>
        <div className="max-w-4xl w-full max-h-full relative" onClick={(e) => e.stopPropagation()}>
          <button 
            className="absolute -top-10 right-0 z-10 text-white text-xl"
            onClick={closeModal}
          >
            Close
          </button>
          <div className="bg-black">
            <video 
              controls 
              autoPlay 
              className="w-full max-h-[80vh]"
            >
              <source src={selectedVideo.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="bg-black text-white p-4">
              <h3 className="text-lg font-medium">{selectedVideo.pathname.split('/').pop()}</h3>
              <p className="text-sm">
                {formatFileSize(selectedVideo.size)}
                {selectedVideo.uploadedAt && ` • ${new Date(selectedVideo.uploadedAt).toLocaleString()}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {videos.length === 1 ? (
        // Single video layout
        <div className="max-w-2xl mx-auto">
          {renderVideoCard(videos[0])}
        </div>
      ) : (
        // Multiple videos grid layout
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.url}>
              {renderVideoCard(video)}
            </div>
          ))}
        </div>
      )}
      
      {renderVideoModal()}
    </div>
  );
}