'use client';

import { useState } from 'react';
import { FaCalendarAlt, FaClock, FaDollarSign, FaBookOpen } from 'react-icons/fa';

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

interface BookingListProps {
  bookings: Booking[];
}

const statusColors = {
  pending: 'bg-slate-100 text-slate-700',
  confirmed: 'bg-sky-100 text-sky-800',
  cancelled: 'bg-slate-200 text-slate-500 line-through',
};

const statusLabels = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
};

export default function BookingList({ bookings }: BookingListProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === filter);

  return (
    <div className="space-y-6">
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filter === 'all' 
              ? 'bg-sky-500 text-white' 
              : 'bg-sky-50 text-slate-700 hover:bg-sky-100'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filter === 'pending' 
              ? 'bg-slate-200 text-slate-800' 
              : 'bg-sky-50 text-slate-700 hover:bg-sky-100'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('confirmed')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filter === 'confirmed' 
              ? 'bg-sky-500 text-white' 
              : 'bg-sky-50 text-slate-700 hover:bg-sky-100'
          }`}
        >
          Confirmed
        </button>
        <button
          onClick={() => setFilter('cancelled')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filter === 'cancelled' 
              ? 'bg-slate-500 text-white' 
              : 'bg-sky-50 text-slate-700 hover:bg-sky-100'
          }`}
        >
          Cancelled
        </button>
      </div>

      {/* Bookings list */}
      <div className="grid gap-4">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-sm transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-900">
                  {booking.lesson.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-sky-500" />
                    <span>{new Date(booking.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-sky-500" />
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaDollarSign className="text-sky-500" />
                    <span>${booking.lesson.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBookOpen className="text-sky-500" />
                    <span>{booking.lesson.duration}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[booking.status]}`}>
                  {statusLabels[booking.status]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">
            {filter === 'all' 
              ? 'No bookings found.' 
              : `No ${filter} bookings found.`}
          </p>
        </div>
      )}
    </div>
  );
}