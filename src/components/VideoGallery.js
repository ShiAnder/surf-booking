'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react';

// Mobile & tablet version
const MobileVideoGallery = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const videoRef = useRef(null);
  const thumbVideoRefs = useRef([]);

  // Enhanced open video function specifically for mobile
  const openVideo = (index) => {
    setCurrentIndex(index);
    
    // Force body to be fixed position with current scroll position
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    
    // Pause all thumbnail videos
    thumbVideoRefs.current.forEach(video => {
      if (video) video.pause();
    });

    // Let the component render first with the new state
    setTimeout(() => {
      if (videoRef.current) {
        // Try to enter fullscreen mode specifically for mobile
        if (videoRef.current.webkitEnterFullscreen) {
          // iOS Safari
          videoRef.current.webkitEnterFullscreen();
        } else if (videoRef.current.requestFullscreen) {
          // Standard method
          videoRef.current.requestFullscreen().catch(err => {
            console.error("Error attempting to enable fullscreen:", err);
            // If standard fullscreen fails, we still have our custom fullscreen UI
          });
        }
      }
    }, 100);
  };

  const closeVideo = () => {
    // Handle exiting fullscreen if we're in it
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => {
        console.error("Error exiting fullscreen:", err);
      });
    }
    
    // Stop video playback
    if (videoRef.current) {
      videoRef.current.pause();
    }
    
    // Restore scroll position
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    
    setCurrentIndex(null);
    
    // Resume all thumbnail videos
    thumbVideoRefs.current.forEach(video => {
      if (video) video.play();
    });
  };

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  // Set up the refs array when videos change
  useEffect(() => {
    thumbVideoRefs.current = thumbVideoRefs.current.slice(0, videos.length);
  }, [videos]);

  // Clean up any scroll locks if component unmounts with modal open
  useEffect(() => {
    return () => {
      if (currentIndex !== null) {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
      }
    };
  }, [currentIndex]);
  
  // Handle fullscreen changes (user may exit fullscreen via device controls)
  useEffect(() => {
    const handleFullScreenChange = () => {
      // Only handle fullscreen exit when we have a video open
      if (!document.fullscreenElement && currentIndex !== null) {
        // When user exits fullscreen using device controls, close our modal
        closeVideo();
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
    };
  }, [currentIndex]);

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
                ref={el => thumbVideoRefs.current[index] = el}
                className="w-[350px] h-[300px] object-cover"
                src={video.url}
                poster={video.thumbnail || undefined}
                autoPlay
                muted
                loop
                playsInline
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
      {currentIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black flex items-center justify-center touch-none"
          onClick={closeVideo}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full"
            onClick={e => {
              e.stopPropagation();
              closeVideo();
            }}
          >
            <X size={20} />
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              prevVideo();
            }}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Next Button */}
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              nextVideo();
            }}
          >
            <ChevronRight size={20} />
          </button>

          {/* Video - with improved mobile fullscreen support */}
          <div 
            onClick={e => e.stopPropagation()} 
            className="w-full h-full flex items-center justify-center px-4"
          >
            <video
              ref={videoRef}
              className="max-w-full max-h-full object-contain"
              src={videos[currentIndex].url}
              autoPlay
              controls
              playsInline
              controlsList="nodownload"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Desktop version
const DesktopVideoGallery = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const videoRef = useRef(null);
  const thumbVideoRefs = useRef([]);

  // Desktop-specific open video function with proper fullscreen handling
  const openVideo = async (index) => {
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden'; // Disable scrolling on body

    // Pause all thumbnail videos
    thumbVideoRefs.current.forEach(video => {
      if (video) video.pause();
    });

    // Desktop uses a different approach to fullscreen
    setTimeout(() => {
      if (videoRef.current?.requestFullscreen) {
        videoRef.current.requestFullscreen().catch(err => {
          console.error("Error attempting to enable fullscreen:", err);
        });
      } else if (videoRef.current?.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current?.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current?.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }, 200);
  };

  const closeVideo = () => {
    // Explicitly exit fullscreen if we're in it
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else if (document.webkitFullscreenElement) {
      document.webkitExitFullscreen();
    } else if (document.mozFullScreenElement) {
      document.mozCancelFullScreen();
    } else if (document.msFullscreenElement) {
      document.msExitFullscreen();
    }
    
    // Stop video playback
    if (videoRef.current) {
      videoRef.current.pause();
    }
    
    setCurrentIndex(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling

    // Resume all thumbnail videos
    thumbVideoRefs.current.forEach(video => {
      if (video) video.play();
    });
  };

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  // Set up the refs array when videos change
  useEffect(() => {
    thumbVideoRefs.current = thumbVideoRefs.current.slice(0, videos.length);
  }, [videos]);

  // Handle fullscreen exit to close the video
  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement && 
          !document.webkitFullscreenElement && 
          !document.mozFullScreenElement &&
          !document.msFullscreenElement &&
          currentIndex !== null) {
        closeVideo();
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
    document.addEventListener('MSFullscreenChange', handleFullScreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullScreenChange);
    };
  }, [currentIndex]);

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
                ref={el => thumbVideoRefs.current[index] = el}
                className="w-[500px] h-[500px] object-cover"
                src={video.url}
                poster={video.thumbnail || undefined}
                autoPlay
                muted
                loop
                playsInline
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
      {currentIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={closeVideo}
        >
          {/* Close Button */}
          <button
            className="absolute top-5 right-5 z-10 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full"
            onClick={e => {
              e.stopPropagation();
              closeVideo();
            }}
          >
            <X size={24} />
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              prevVideo();
            }}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next Button */}
          <button
            className="absolute right-5 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              nextVideo();
            }}
          >
            <ChevronRight size={24} />
          </button>

          {/* Fullscreen Video */}
          <div onClick={e => e.stopPropagation()} className="w-full max-w-4xl max-h-full px-4">
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              src={videos[currentIndex].url}
              autoPlay
              controls
              playsInline
              controlsList="nodownload"
            />
          </div>
        </div>
      )}
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