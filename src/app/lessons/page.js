'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { LessonGrid } from '../../components/LessonCard';

export default function LessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    async function fetchLessons() {
      try {
        const response = await fetch('/api/lessons');
        if (!response.ok) throw new Error('Failed to fetch lessons');
        const data = await response.json();
        setLessons(data);
      } catch {
        setError('Failed to load lessons. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchLessons();
  }, []);

  // Get unique categories for filters
  const categories = ['all', ...new Set(lessons.map(lesson => lesson.category || 'Others'))];

  // Filter lessons based on selected category
  const filteredLessons = filter === 'all' 
    ? lessons 
    : lessons.filter(lesson => lesson.category === filter);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-16 px-4 rounded-3xl shadow-lg mb-12">
        <div className="max-w-4xl mx-auto text-center mt-[50px]">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
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
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
            <p className="text-lg text-gray-600">Loading lessons...</p>
          </div>
        ) : error ? (
          <div className="bg-rose-50 border-l-4 border-rose-500 text-rose-700 p-4 rounded-md shadow-sm">
            <p>{error}</p>
          </div>
        ) : filteredLessons.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No lessons found</h3>
            <p className="text-gray-500">
              {filter !== 'all' 
                ? `No lessons available in the "${filter}" category.` 
                : 'No lessons available at the moment.'}
            </p>
          </div>
        ) : (
          <LessonGrid lessons={filteredLessons} />
        )}
      </div>
    </div>
  );
}