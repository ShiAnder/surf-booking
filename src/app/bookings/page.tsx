'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Loader2} from 'lucide-react';

interface Booking {
  id: string;
  lessonId: string;
  userId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  lesson: {
    title: string;
    price: number;
    duration: string;
  };
}

const statusColors = {
  pending: 'bg-slate-100 text-slate-700',
  confirmed: 'bg-sky-100 text-sky-800',
  cancelled: 'bg-slate-200 text-slate-500 line-through',
} as const;

const statusLabels = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
} as const;

export default function BookingsPage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [session]);

  async function fetchBookings() {
    try {
      const response = await fetch('/api/bookings');
      if (!response.ok) throw new Error('Failed to fetch bookings');
      
      const data = await response.json();
      
      // Ensure data is an array before setting bookings
      if (Array.isArray(data)) {
        setBookings(data);
      } else if (data && Array.isArray(data.bookings)) {
        // In case the API returns { bookings: [...] }
        setBookings(data.bookings);
      } else {
        console.warn('API returned unexpected data format:', data);
        setBookings([]);
      }
    } catch (err) {
      console.error('Error loading bookings:', err);
      setError('Failed to load your bookings. Please try again later.');
      setBookings([]); // Ensure bookings is always an array
    } finally {
      setLoading(false);
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen pt-0">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-slate-900 mb-4">Please Sign In</h1>
            <p className="text-slate-500">
              You need to be signed in to view your bookings.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-0">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 text-sky-500 animate-spin mb-4" />
            <p className="text-lg text-slate-500">Loading your bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-0">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-slate-50 border-l-4 border-slate-400 text-slate-700 p-4 rounded-md shadow-sm">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-0">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold text-slate-900 mb-8">My Bookings</h1>
        
        {bookings.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-slate-700 mb-2">No Bookings Found</h2>
            <p className="text-slate-500">
              You haven&apos;t made any bookings yet. Start your surfing journey today!
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-sm transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-slate-900">
                      {booking.lesson.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                      <p>Time: {booking.time}</p>
                      <p>Duration: {booking.lesson.duration}</p>
                      <p>Price: ${booking.lesson.price}</p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        statusColors[booking.status]
                      }`}
                    >
                      {statusLabels[booking.status]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}