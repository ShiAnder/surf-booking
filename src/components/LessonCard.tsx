'use client';

import { useSession, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { FaClock, FaWhatsapp, FaArrowRight, FaImage } from 'react-icons/fa';
import Image from 'next/image';

interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  duration: string;
  imageUrl: string;
}

interface BookedSlots {
  [date: string]: string[];
}

export function LessonGrid({ lessons }: { lessons: Lesson[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {lessons.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
}

function LessonCard({ lesson }: { lesson: Lesson }) {
  const { data: session } = useSession();
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<BookedSlots>({});
  const [imageError, setImageError] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Default image if none provided
  const defaultImage = '/lesson/lesson1.jpg';

  // Fetch already booked slots
  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const response = await fetch(`/api/bookings/booked-slots?lessonId=${lesson.id}`);
        if (!response.ok) throw new Error('Failed to fetch booked slots');
        const data = await response.json();
        setBookedSlots(data.bookedSlots || {});
      } catch (error) {
        console.error('Error fetching booked slots:', error);
      }
    };

    fetchBookedSlots();
  }, [lesson.id]);

  const handleBookNow = async () => {
    if (!session) {
      // Trigger Google sign-in instead of redirecting to sign-in page
      signIn('google');
      return;
    }

    setShowBookingModal(true);
  };

  const handleConfirmBooking = async () => {
    if (!bookingDate || !bookingTime) {
      alert('Please select both date and time for your lesson');
      return;
    }
    if (isSlotBooked(bookingDate, bookingTime)) {
      alert('This slot has just been booked. Please select another time.');
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
          price: lesson.price
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'Failed to create checkout session');
      window.location.href = data.sessionUrl;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const isSlotBooked = (date: string, time: string): boolean => {
    return bookedSlots[date]?.includes(time) || false;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingDate(e.target.value);
    setBookingTime('');
  };

  // Available time slots
  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const getAvailableTimesForDate = (date: string) => {
    const bookedTimesForDate = bookedSlots[date] || [];
    return availableTimes.filter(time => !bookedTimesForDate.includes(time));
  };

  const today = new Date().toISOString().split('T')[0];
  const availableTimesForSelectedDate = bookingDate ? getAvailableTimesForDate(bookingDate) : [];

  // WhatsApp Contact Number
  const whatsappNumber = "+94766690504";
  const whatsappMessage = encodeURIComponent(`Hello, I have a question about the "${lesson.title}" lesson.`);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      <div className="group relative bg-white rounded-xl border border-sky-100 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-sm">
        {/* Image Container */}
        <div className="relative h-64 w-full overflow-hidden bg-sky-50">
          {!imageError && (lesson.imageUrl || defaultImage) ? (
            <Image
              src={lesson.imageUrl || defaultImage}
              alt={lesson.title}
              fill
              className="object-cover transform transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-sky-50">
              <div className="text-center">
                <FaImage className="w-12 h-12 text-sky-300 mx-auto mb-2" />
                <p className="text-slate-500 text-sm">No image available</p>
              </div>
            </div>
          )}
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 text-sky-700 text-xs font-medium rounded-full shadow-sm">
              {lesson.category}
            </span>
          </div>
          {/* Price Badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-sky-500 text-white text-xs font-medium rounded-full shadow-sm">
              ${lesson.price}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative z-10">
          <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-1">
            {lesson.title}
          </h3>
          <p className="text-slate-500 text-sm mb-4 line-clamp-2">
            {lesson.description}
          </p>

          {/* Duration */}
          <div className="flex items-center text-slate-500 mb-4">
            <FaClock className="mr-2" />
            <span className="text-sm">{lesson.duration}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleBookNow}
              className="inline-flex items-center justify-center w-full px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-sky-600 relative z-20"
            >
              <span className="mr-2">{session ? 'Book Now' : 'Sign In to Book'}</span>
              {session && <FaArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1" />}
            </button>
            
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-4 py-2 bg-white text-sky-700 border border-sky-200 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-sky-50 relative z-20"
            >
              <FaWhatsapp className="mr-2" />
              <span>Contact on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 hidden" />
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Book {lesson.title}</h3>
            
            {/* Date Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select Date
              </label>
              <input
                type="date"
                min={today}
                value={bookingDate}
                onChange={handleDateChange}
                className="w-full px-3 py-2 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
              />
            </div>

            {/* Time Selection */}
            {bookingDate && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Time
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableTimesForSelectedDate.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => {
                        console.log('Time selected:', time);
                        setBookingTime(time);
                      }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        bookingTime === time
                          ? 'bg-sky-500 text-white'
                          : 'bg-sky-50 text-slate-700 hover:bg-sky-100'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                {availableTimesForSelectedDate.length === 0 && (
                  <p className="text-sm text-slate-600 mt-2">
                    No available time slots for this date. Please select another date.
                  </p>
                )}
              </div>
            )}

            {/* Price Summary */}
            <div className="border-t border-sky-100 pt-4 mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-500">Price:</span>
                <span className="font-semibold">${lesson.price}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 px-4 py-2 border border-sky-200 rounded-lg text-slate-700 hover:bg-sky-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                disabled={isLoading || !bookingDate || !bookingTime}
                className="flex-1 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}