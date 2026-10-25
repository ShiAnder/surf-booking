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
  imageUrl: string;
}

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch('/api/lessons');
        if (!response.ok) throw new Error('Failed to fetch lessons');
        const data = await response.json();
        setLessons(data);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  return (
    <div>
      {/* Page header */}
      <section className="border-b border-sky-100 bg-sky-50/60">
        <div className="container-custom py-12 text-center md:py-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-sky-600">Lessons</p>
          <h1 className="mx-auto mb-3 max-w-2xl text-3xl font-semibold text-slate-900 md:text-4xl">
            Find your perfect surf lesson
          </h1>
          <p className="mx-auto max-w-xl text-slate-500">
            From beginner basics to advanced technique, there is a lesson for every skill level.
          </p>
        </div>
      </section>

      <div className="container-custom py-12">
        {loading ? (
          <p className="py-20 text-center text-sm text-slate-500">Loading lessons...</p>
        ) : lessons.length === 0 ? (
          <p className="py-20 text-center text-sm text-slate-500">No lessons are available right now.</p>
        ) : (
          <LessonGrid lessons={lessons} />
        )}
      </div>
    </div>
  );
}
