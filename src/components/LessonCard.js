'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCalendarAlt, FaClock, FaDollarSign, FaBookOpen } from 'react-icons/fa';

export default function LessonCard({ lesson }) {
  const { data: session } = useSession();
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleBookNow = async () => {
    if (!session) {
      router.push('/api/auth/signin');
      return;
    }

    if (!bookingDate || !bookingTime) {
      alert('Please select both date and time for your lesson');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: lesson.id,
          date: bookingDate,
          time: bookingTime,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.error || 'Failed to create checkout session');

      window.location.href = data.sessionUrl;
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 w-400 max-w-sm h-300 flex flex-col justify-between text-center">
      <div>
        <h3 className="w-200 text-2xl font-semibold text-blue-700 flex items-center gap-2 mb-2 justify-center">
          <FaBookOpen className="text-blue-500" />
          {lesson.title}
        </h3>
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 w-400 max-w-sm h-300 flex flex-col justify-between text-center">

        <p className="w-200 text-gray-600 mb-3">{lesson.description}</p>
        </div>

        <div className="flex items-center justify-center gap-2 text-green-600 text-lg font-bold mb-4">
          <FaDollarSign />
          {lesson.price}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2 justify-center">
              <FaCalendarAlt />
              Select Date
            </label>
            <input
              type="date"
              min={today}
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="w-200 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2 justify-center">
              <FaClock />
              Select Time
            </label>
            <select
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
              className="w-00 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select time</option>
              {['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'].map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={handleBookNow}
        disabled={isLoading}
        className="w-200 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 transition ease-in-out duration-200"
      >
        {isLoading ? 'Booking...' : 'Book Now'}
      </button>
    </div>
  );
}

export function LessonGrid({ lessons }) {
  const groupedLessons = lessons.reduce((acc, lesson) => {
    const category = lesson.category || 'Others';
    if (!acc[category]) acc[category] = [];
    acc[category].push(lesson);
    return acc;
  }, {});

  return (
    <div className="space-y-12 px-4">
      {Object.keys(groupedLessons).map((category) => (
        <div key={category}>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch justify-items-center">
            {groupedLessons[category].map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
