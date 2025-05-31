'use client';

import { useState, useEffect } from 'react';
import { LessonGrid } from '@/components/LessonCard';

interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  duration: string;
  image: string;
}

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [filter, setFilter] = useState<string>('all');

  // Get unique categories from lessons
  const categories = ['all', 'beginner', 'intermediate', 'advanced'];

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch('/api/lessons');
        if (!response.ok) throw new Error('Failed to fetch lessons');
        const data = await response.json();
        setLessons(data);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };

    fetchLessons();
  }, []);

  // Filter lessons based on category
  const filteredLessons = filter === 'all' 
    ? lessons 
    : lessons.filter(lesson => lesson.category.toLowerCase() === filter);

  return (
    <main className="min-h-screen pt-24">
      {/* Hero Banner */}
      <div className="relative w-full h-[40vh] min-h-[400px] bg-gradient-to-r from-blue-600 to-teal-500">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Discover Your Perfect Surf Lesson
            </h1>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              From beginner basics to advanced techniques, we have the perfect lesson for every skill level.
            </p>
            
            {/* Category filter chips */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === category 
                      ? 'bg-yellow-400 text-blue-900 shadow-md' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <LessonGrid lessons={filteredLessons} />
      </div>
    </main>
  );
}