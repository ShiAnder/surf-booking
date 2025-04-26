'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react';

// Mobile & tablet version
const MobileVideoGallery = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const videoRef = useRef(null);

  const openVideo = (index) => {
    setCurrentIndex(index);
    document.documentElement.style.overflow = 'hidden'; // Disable scrolling
  };

  const closeVideo = () => {
    setCurrentIndex(null);
    document.documentElement.style.overflow = 'auto'; // Re-enable scrolling
  };

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {videos.map((video, index) => (
          <motion.div
            key={video.url}
            className="cursor-pointer group relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -2 }}
            onClick={() => openVideo(index)}
          >
            <div className="aspect-video bg-gray-300 rounded-lg overflow-hidden relative">
              <video
                className="w-[500px] h-[500px] object-cover"
                src={video.url}
                poster={video.thumbnail || undefined}
                autoPlay
                muted
                loop
                preload="metadata"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200">
                <div className="bg-black bg-opacity-60 rounded-full p-3 scale-0 group-hover:scale-100 transition-all duration-200">
                  <Play size={20} className="text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal Player for Mobile */}
      <AnimatePresence>
        {currentIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full backdrop-blur-md"
              onClick={closeVideo}
              whileHover={{ scale: 1.1 }}
            >
              <X size={20} />
            </motion.button>

            {/* Previous Button */}
            <motion.button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full backdrop-blur-md"
              onClick={(e) => {
                e.stopPropagation();
                prevVideo();
              }}
              whileHover={{ scale: 1.1 }}
            >
              <ChevronLeft size={20} />
            </motion.button>

            {/* Next Button */}
            <motion.button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full backdrop-blur-md"
              onClick={(e) => {
                e.stopPropagation();
                nextVideo();
              }}
              whileHover={{ scale: 1.1 }}
            >
              <ChevronRight size={20} />
            </motion.button>

            {/* Video */}
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              src={videos[currentIndex].url}
              autoPlay
              loop
              controls
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Desktop version
const DesktopVideoGallery = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const videoRef = useRef(null);

  const openVideo = async (index) => {
    setCurrentIndex(index);
    document.documentElement.style.overflow = 'hidden'; // Disable scrolling

    // Delay to allow video to mount before fullscreen
    setTimeout(() => {
      if (videoRef.current?.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }, 200);
  };

  const closeVideo = () => {
    setCurrentIndex(null);
    document.documentElement.style.overflow = 'auto'; // Re-enable scrolling
  };

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  // Handle fullscreen exit to close the video
  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        closeVideo();
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="grid grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {videos.map((video, index) => (
          <motion.div
            key={video.url}
            className="cursor-pointer group relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => openVideo(index)}
          >
            <div className="aspect-video bg-gray-300 rounded-lg overflow-hidden relative shadow-lg">
              <video
                className="w-[500px] h-[500px] object-cover"
                src={video.url}
                poster={video.thumbnail || undefined}
                autoPlay
                muted
                loop
                preload="metadata"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200">
                <div className="bg-black bg-opacity-60 rounded-full p-4 scale-0 group-hover:scale-100 transition-all duration-200">
                  <Play size={24} className="text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Fullscreen Modal Player */}
      <AnimatePresence>
        {currentIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-5 right-5 z-10 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full backdrop-blur-md"
              onClick={closeVideo}
              whileHover={{ scale: 1.1 }}
            >
              <X size={24} />
            </motion.button>

            {/* Previous Button */}
            <motion.button
              className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full backdrop-blur-md"
              onClick={(e) => {
                e.stopPropagation();
                prevVideo();
              }}
              whileHover={{ scale: 1.1 }}
            >
              <ChevronLeft size={24} />
            </motion.button>

            {/* Next Button */}
            <motion.button
              className="absolute right-5 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full backdrop-blur-md"
              onClick={(e) => {
                e.stopPropagation();
                nextVideo();
              }}
              whileHover={{ scale: 1.1 }}
            >
              <ChevronRight size={24} />
            </motion.button>

            {/* Fullscreen Video */}
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              src={videos[currentIndex].url}
              autoPlay
              loop
              controls
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main responsive component that chooses the appropriate version
export default function VideoGallery({ videos }) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check screen width on mount and when window resizes
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px is typical lg breakpoint
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      {isMobile ? (
        <MobileVideoGallery videos={videos} />
      ) : (
        <DesktopVideoGallery videos={videos} />
      )}
    </>
  );
}