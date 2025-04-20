'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Loader2, Calendar, Clock, DollarSign, AlertCircle } from 'lucide-react';

export default function BookingsPage() {
  const { data: status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    }

    if (status === 'authenticated') {
      fetchBookings();
    }
  }, [status, router]);

  async function fetchBookings() {
    try {
      const response = await fetch('/api/bookings');
      if (!response.ok) {
        throw new Error('Failed to fetch your bookings');
      }
      const data = await response.json();
      setBookings(data.bookings);
    } catch (err) {
      console.error('Error loading bookings:', err);
      setError('Failed to load your bookings. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  const statusStyles = {
    pending: {
      bg: 'bg-amber-100',
      text: 'text-amber-800',
      border: 'border-amber-200',
      icon: <AlertCircle size={16} className="mr-1.5 text-amber-500" />
    },
    confirmed: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-800',
      border: 'border-emerald-200',
      icon: <Calendar size={16} className="mr-1.5 text-emerald-500" />
    },
    cancelled: {
      bg: 'bg-rose-100',
      text: 'text-rose-800',
      border: 'border-rose-200',
      icon: <AlertCircle size={16} className="mr-1.5 text-rose-500" />
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-4" />
        <p className="text-base md:text-lg text-gray-600">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-2 relative inline-block">
          My Bookings
          <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 rounded-full transform translate-y-1"></span>
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-3 md:mt-4">View and manage your upcoming surf lessons</p>
      </div>
      
      {error && (
        <div className="bg-rose-50 border-l-4 border-rose-500 text-rose-700 p-3 sm:p-4 mb-6 sm:mb-8 rounded-md shadow-sm">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
            <p className="text-sm sm:text-base">{error}</p>
          </div>
        </div>
      )}
      
      {!error && bookings.length === 0 ? (
        <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl sm:rounded-2xl p-6 sm:p-10 text-center shadow-lg border border-blue-100 mx-auto max-w-lg">
          <Image 
            src="/api/placeholder/80/80" 
            alt="No bookings" 
            width={80} 
            height={80} 
            className="mx-auto mb-4 sm:mb-6 opacity-60"
          />
          <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-3 sm:mb-4">No bookings yet</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto">
            You haven&apos;t booked any surf lessons yet. Browse our available lessons and catch your first wave!
          </p>
          <button
            onClick={() => router.push('/lessons')}
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            Browse Lessons
          </button>
        </div>
      ) : (
        <div className="w-[700px] max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {bookings.map((booking) => (
              <div 
                key={booking.id} 
                className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-gray-100 relative overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] text-center group w-full"
              >
                <div className="absolute top-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-br from-blue-500 to-blue-400 opacity-10 rounded-t-2xl"></div>

                <div className="mb-4 sm:mb-5 h-12 w-12 sm:h-16 sm:w-16 mx-auto flex items-center justify-center bg-blue-500 rounded-xl shadow-md text-white transform -rotate-3 group-hover:rotate-0 transition-all duration-300">
                  <Calendar size={24} className="sm:hidden" />
                  <Calendar size={32} className="hidden sm:block" />
                </div>

                <div className="bg-blue-50 mx-auto w-3/4 h-0.5 sm:h-1 mb-3 sm:mb-4 rounded-full"></div>

                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-gray-900 font-sans">
                  {booking.lesson.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">
                  {booking.lesson.description}
                </p>

                <div className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  <div className="flex items-center justify-center mb-1">
                    <Calendar size={14} className="mr-1.5 text-blue-500 flex-shrink-0" />
                    <span>{new Date(booking.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-center mb-1">
                    <Clock size={14} className="mr-1.5 text-blue-500 flex-shrink-0" />
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex items-center justify-center mb-1">
                    <DollarSign size={14} className="mr-1.5 text-blue-500 flex-shrink-0" />
                    <span>${booking.price.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-center mt-1 sm:mt-2">
                  <span className={`flex items-center px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium ${statusStyles[booking.status]?.bg} ${statusStyles[booking.status]?.text} ${statusStyles[booking.status]?.border} border whitespace-nowrap`}>
                    {statusStyles[booking.status]?.icon}
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>

                <div className="absolute -bottom-2 -right-2 w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-full opacity-20 group-hover:scale-150 transition-all duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
