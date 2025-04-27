"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    const handleScroll = () => {
    };
    window.addEventListener('scroll', handleScroll);

     // Inject Elfsight script dynamically
     const script = document.createElement('script');
     script.src = 'https://static.elfsight.com/platform/platform.js';
     script.async = true;
     document.body.appendChild(script);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-inter p-12">
      {/* Hero Section */}
      <div className="relative min-h-[98vh] flex items-center justify-center text-center bg-gradient-to-br from-blue-600 via-teal-500 to-cyan-400 overflow-hidden shadow-lg">
        <div className="absolute inset-0 opacity-10 bg-cover"></div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Logo Image placed above the headline */}
            <div className="mb-6 flex justify-center">
              <Image
                src="/images/logo.jpg"
                alt="Logo"
                width={200}
                height={200}
                className="rounded-full"
                priority
              />
            </div>
          
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
      <div className="bg-gradient-to-b from-white to-blue-50 py-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-blue-400"></div>
          <div className="absolute top-20 -right-16 w-80 h-80 rounded-full bg-teal-300"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-extrabold text-gray-800 tracking-wide drop-shadow-sm relative inline-block">
              <span className="relative z-10">Why Surf With Us</span>
              <span className="absolute -bottom-3 left-0 right-0 h-3 bg-yellow-200 opacity-50 -rotate-1 z-0"></span>
            </h2>
            <p className="mt-6 text-blue-700 italic font-light max-w-lg mx-auto ">Experience the thrill of surfing with our world-class team and premium equipment</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-10 max-w-5xl mx-auto">
            
          {/* Card Wrapper */}
          <div className="w-[1200px] max-w-[95%] sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 space-y-10">

            {/* Professional Instructors Title */}
            <h2 className="text-4xl font-bold font-serif text-center text-blue-600 mb-6">
              Professional Instructors
            </h2>

            {/* Professional Instructors Card */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl text-center group">
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-blue-500 to-blue-400 opacity-10 rounded-t-3xl"></div>
              <div className="mb-6 h-20 w-20 mx-auto flex items-center justify-center bg-blue-500 rounded-2xl shadow-md text-white transform -rotate-3 group-hover:rotate-0 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-[50px] w-[50px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="bg-blue-50 mx-auto w-3/4 h-1 mb-4 rounded-full"></div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 font-sans">
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Professional Instructors</span>
              </h3>
              <p className="text-gray-600 mb-4 font-light">
                Learn from the best! Our team includes <span className="text-blue-600">ISA Level 1 Certified Instructors</span> with years of hands-on coaching experience.
              </p>
              <p className="text-gray-600 font-light">
                Led by the <span className="font-semibold text-blue-600">Head Judge of the Sri Lanka Surf Federation (SLSF)</span>, our instructors bring expert guidance, deep local knowledge, and a passion for helping surfers of all levels progress confidently and safely.
              </p>
              <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-blue-50 rounded-full opacity-20 group-hover:scale-150 transition-all duration-700"></div>
            </div>

            {/* All Skill Levels Title */}
            <h2 className="text-4xl font-bold font-serif text-center text-green-600 mt-16 mb-6">
              All Skill Levels
            </h2>

            {/* All Skill Levels Card */}
            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-200 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl text-center group">
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-green-500 to-teal-400 opacity-10 rounded-t-3xl"></div>
              <div className="mb-6 h-20 w-20 mx-auto flex items-center justify-center bg-green-500 rounded-2xl shadow-md text-white transform rotate-3 group-hover:rotate-0 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-[50px] w-[50px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="bg-green-50 mx-auto w-3/4 h-1 mb-4 rounded-full"></div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 font-sans">
                <span className="bg-gradient-to-r from-green-600 to-teal-400 bg-clip-text text-transparent">All Skill Levels</span>
              </h3>
              <p className="text-gray-600 mb-4 font-light">
                Whether you&rsquo;re catching your first wave or refining advanced maneuvers, we&rsquo;ve got you covered!
              </p>
              <p className="text-gray-600 font-light">
                Our programs are tailored to suit <span className="font-semibold text-green-600">beginners, intermediates, and seasoned surfers</span> alike. With a personalized approach and supportive environment, you&apos;ll grow your skills at your own pace and ride with confidence.
              </p>
              <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-green-50 rounded-full opacity-20 group-hover:scale-150 transition-all duration-700"></div>
            </div>

            {/* Top Equipment Title */}
            <h2 className="text-4xl font-bold font-serif text-center text-purple-600 mt-16 mb-6">
              Top Equipment
            </h2>

            {/* Top Equipment Card */}
            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-200 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl text-center group">
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-purple-500 to-indigo-400 opacity-10 rounded-t-3xl"></div>
              <div className="mb-6 h-20 w-20 mx-auto flex items-center justify-center bg-purple-500 rounded-2xl shadow-md text-white transform -rotate-3 group-hover:rotate-0 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-[50px] w-[50px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div className="bg-purple-50 mx-auto w-3/4 h-1 mb-4 rounded-full"></div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 font-sans">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-400 bg-clip-text text-transparent">Top Equipment</span>
              </h3>
              <p className="text-gray-600 mb-4 font-light">
                Ride the waves with the best gear! We provide the <span className="font-semibold text-purple-600">perfect board for every surfer</span>, from soft tops for learners to high-performance <span className="font-semibold text-purple-600">hard boards</span> for advanced riders.
              </p>
              <p className="text-gray-600 font-light">
                All equipment includes a <span className="font-semibold text-purple-600">leash, wax</span>, and everything you need for a safe and smooth session in the water.
              </p>
              <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-purple-50 rounded-full opacity-20 group-hover:scale-150 transition-all duration-700"></div>
            </div>

             {/* Elfsight Google Reviews Embed */}
            <div className="mt-20">
              <div className="elfsight-app-818c7483-3944-4ce6-8f5e-40ab4b65d5f2" data-elfsight-app-lazy></div>
            </div>


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
          <div className="flex justify-center space-x-4">
            <Link
              href="/lessons"
              className="relative flex items-center justify-center bg-blue-600 text-black px-20 py-6 rounded-full text-6xl md:text-4xl tracking-wide btn-animate hover:border-4 hover:bg-blue-400 hover:text-white border-2 border-blue-600 w-[300px] h-[30px] transition-all duration-300 shadow-xl transform hover:scale-100 group-hover:shadow-2xl no-underline"
            >
              <span className="mr-2"> Book Your Lesson Now </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}