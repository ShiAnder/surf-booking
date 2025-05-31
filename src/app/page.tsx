"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useAOS } from '../hooks/useAOS';

export default function Home() {
  useAOS(); // Initialize AOS

  useEffect(() => {
    const handleScroll = () => {
      // Scroll handling logic can be added here
    };
    window.addEventListener('scroll', handleScroll);

    // Inject Elfsight script dynamically
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Clean up script if needed
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const surfLessons = [
    {
      title: "Beginner Surf Lesson",
      description: "Perfect for first-time surfers. Learn the basics of surfing, ocean safety, and proper technique in a safe, controlled environment.",
      time: "2 Hours",
      price: "From LKR 15,000 / $45 USD",
      isPopular: true,
      includes: ["Professional Instructor", "Surfboard", "Rash Guard", "Basic Theory"]
    },
    {
      title: "Intermediate Surf Coaching",
      description: "Take your surfing to the next level with personalized coaching on wave selection, technique refinement, and advanced maneuvers.",
      time: "3 Hours",
      price: "From LKR 25,000 / $75 USD",
      isPopular: false,
      includes: ["Advanced Coaching", "Video Analysis", "Equipment Included"]
    },
    {
      title: "Private Surf Lesson",
      description: "One-on-one instruction tailored to your skill level and goals. Perfect for focused learning and rapid improvement.",
      time: "2 Hours",
      price: "From LKR 30,000 / $90 USD",
      isPopular: false,
      includes: ["Private Instructor", "Customized Program", "All Equipment"]
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-surf.jpg"
            alt="Surfing waves"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto" data-aos="fade-up">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Experience the Perfect Wave
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Professional surf lessons and unforgettable adventures
            </p>
            <Link
              href="/lessons"
              className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Book Your Lesson
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-aos="fade-up">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature cards */}
            <div className="p-6 rounded-lg bg-gray-50" data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-xl font-semibold mb-4">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from certified professionals with years of experience
              </p>
            </div>
            <div className="p-6 rounded-lg bg-gray-50" data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-xl font-semibold mb-4">Perfect Location</h3>
              <p className="text-gray-600">
                Beautiful beaches with ideal conditions for all skill levels
              </p>
            </div>
            <div className="p-6 rounded-lg bg-gray-50" data-aos="fade-up" data-aos-delay="300">
              <h3 className="text-xl font-semibold mb-4">Quality Equipment</h3>
              <p className="text-gray-600">
                Top-notch surfboards and gear provided for all lessons
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lessons Section */}
      <section id="lessons" className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2
            className="section-title text-center mb-12"
            data-aos="fade-up"
          >
            Our Surf Lessons
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {surfLessons.map((lesson, index) => (
              <div
                key={index}
                className="card p-6"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="space-y-4">
                  {lesson.isPopular && (
                    <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full inline-block">
                      ⭐ Most Popular
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900">{lesson.title}</h3>
                  <p className="text-gray-600">{lesson.description}</p>
                  <div className="border-t pt-4 space-y-3">
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">🕒 Duration:</span>
                      <span>{lesson.time}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">💰 Price:</span>
                      <span>{lesson.price}</span>
                    </p>
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Includes:</h4>
                      <ul className="space-y-1">
                        {lesson.includes.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="text-green-500">✓</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Link
                      href={`/bookings?lesson=${encodeURIComponent(lesson.title)}`}
                      className="w-full inline-flex justify-center items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
                    >
                      Book This Lesson
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 