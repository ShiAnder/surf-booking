"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-inter p-12">
      {/* Hero Section */}
      <div className="relative min-h-[85vh] flex items-center justify-center text-center bg-gradient-to-br from-blue-600 via-teal-500 to-cyan-400 overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-[url('/waves-bg.png')] opacity-10 bg-cover"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-tight drop-shadow-lg">
            Catch Your <span className="relative inline-block bg-yellow-400 text-teal-900 px-2 rounded-md shadow-md animate-pulse">Perfect</span> Wave
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-50 max-w-2xl mx-auto">
            Book surf lessons with our expert instructors at prime locations
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/lessons"
              className="relative flex items-center justify-center bg-blue-600 text-white px-20 py-6 rounded-full font-bold text-6xl md:text-4xl tracking-wide btn-animate hover:border-4 hover:bg-blue-400 hover:text-white border-2 border-blue-600 w-[400px] h-[50px] transition-all duration-300 shadow-xl transform hover:scale-100 group-hover:shadow-2xl no-underline"
            >
              <span className="mr-2"> Find Your Lessons </span>
            </Link>
          </div>
        </div>
      </div>
      


      {/* Features Section */}
      <div className="bg-gray-100 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800 tracking-wide drop-shadow-sm">
            Why Surf With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4 py-10 max-w-7xl mx-auto">
            
            {/* Professional Instructors Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl text-center group">
              <div className="absolute top-0 left-0 h-2 w-full bg-blue-500"></div>
              <div className="mb-6 h-12 w-12 mx-auto flex items-center justify-center">
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Professional Instructors</h3>
              <p className="text-gray-600 mb-4">Learn from the best! Our team includes <span className="font-semibold text-blue-600">ISA Level 1 Certified Instructors</span> with years of hands-on coaching experience.</p>
              <p className="text-gray-600">Led by the <span className="font-semibold text-blue-600">Head Judge of the Sri Lanka Surf Federation (SLSF)</span>, our instructors bring expert guidance, deep local knowledge, and a passion for helping surfers of all levels progress confidently and safely.</p>
            </div>

            {/* All Skill Levels Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl text-center group">
              <div className="absolute top-0 left-0 h-2 w-full bg-green-500"></div>
              <div className="mb-6 h-12 w-12 mx-auto flex items-center justify-center">
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">All Skill Levels</h3>
              <p className="text-gray-600 mb-4">Whether you're catching your first wave or refining advanced maneuvers, we've got you covered!</p>
              <p className="text-gray-600">Our programs are tailored to suit <span className="font-semibold text-green-600">beginners, intermediates, and seasoned surfers</span> alike. With a personalized approach and supportive environment, you'll grow your skills at your own pace and ride with confidence.</p>
            </div>

            {/* Top Equipment Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl text-center group">
              <div className="absolute top-0 left-0 h-2 w-full bg-purple-500"></div>
              <div className="mb-6 h-12 w-12 mx-auto flex items-center justify-center">
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Top Equipment</h3>
              <p className="text-gray-600 mb-4">Ride the waves with the best gear! We provide the <span className="font-semibold text-purple-600">perfect board for every surfer</span>, from soft tops for learners to high-performance <span className="font-semibold text-purple-600">hard boards</span> for advanced riders.</p>
              <p className="text-gray-600">All equipment includes a <span className="font-semibold text-purple-600">leash, wax</span>, and everything you need for a safe and smooth session in the water.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-teal-600 via-cyan-500 to-blue-400 py-24 flex items-center justify-center text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-white mb-6 drop-shadow-md">
            Ready to Ride the Waves?
          </h2>
          <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
            Join us for an unforgettable surfing experience at the best spots along the coast.
          </p>
          <Link
            href="/lessons"
            className="inline-block bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 transition duration-300 shadow-lg transform hover:scale-105"
          >
            Book Your Lesson Now
          </Link>
        </div>
      </div>
    </div>
  );
}
