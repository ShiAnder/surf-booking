'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2, Calendar, Clock, DollarSign, Tag, AlertCircle } from 'lucide-react';

export default function BookingsPage() {
  const { data: session, status } = useSession();
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

  // Status badge styles
  const statusStyles = {
    pending: {
      bg: 'bg-amber-100',
      text: 'text-amber-800',
      border: 'border-amber-200',
      icon: <AlertCircle size={16} className="mr-2 text-amber-500" />
    },
    confirmed: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-800',
      border: 'border-emerald-200',
      icon: <Calendar size={16} className="mr-2 text-emerald-500" />
    },
    cancelled: {
      bg: 'bg-rose-100',
      text: 'text-rose-800',
      border: 'border-rose-200',
      icon: <AlertCircle size={16} className="mr-2 text-rose-500" />
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
        <p className="text-lg text-gray-600">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2 relative inline-block">
          My Bookings
          <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 rounded-full transform translate-y-1"></span>
        </h1>
        <p className="text-gray-600 mt-4">View and manage your upcoming surf lessons</p>
      </div>
      
      {error && (
        <div className="bg-rose-50 border-l-4 border-rose-500 text-rose-700 p-4 mb-8 rounded-md shadow-sm">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p>{error}</p>
          </div>
        </div>
      )}
      
      {!error && bookings.length === 0 ? (
        <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-12 text-center shadow-lg border border-blue-100">
          <img 
            src="/api/placeholder/100/100" 
            alt="No bookings" 
            className="w-24 h-24 mx-auto mb-6 opacity-60"
          />
          <h3 className="text-2xl font-bold text-blue-700 mb-4">No bookings yet</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            You haven't booked any surf lessons yet. Browse our available lessons and catch your first wave!
          </p>
          <button
            onClick={() => router.push('/lessons')}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Browse Lessons
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {bookings.map((booking) => (
  <div 
    key={booking.id} 
    className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 p-6 flex flex-col justify-between"
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{booking.lesson.title}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{booking.lesson.description}</p>
      </div>
      <span className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusStyles[booking.status]?.bg} ${statusStyles[booking.status]?.text} ${statusStyles[booking.status]?.border} border whitespace-nowrap`}>
        {statusStyles[booking.status]?.icon}
        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
      </span>
    </div>

    <div className="mt-4 space-y-3 text-sm text-gray-700">
      <div className="flex items-center">
        <Calendar size={18} className="mr-2 text-blue-500" />
        <span>{new Date(booking.date).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center">
        <Clock size={18} className="mr-2 text-blue-500" />
        <span>{booking.time}</span>
      </div>
      <div className="flex items-center">
        <DollarSign size={18} className="mr-2 text-blue-500" />
        <span>${booking.price.toFixed(2)}</span>
      </div>
    </div>

    <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
      <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
        <Tag size={16} className="mr-1" />
        View Details
      </button>
      {booking.status === 'pending' && (
        <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
          Cancel Booking
        </button>
      )}
    </div>
  </div>
))}
        </div>
      )}
    </div>
  );
}