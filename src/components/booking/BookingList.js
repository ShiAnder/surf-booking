'use client';

import { useRouter } from 'next/navigation';

export default function BookingList({ bookings }) {
  const router = useRouter();

  // Status badge colors
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="mb-4 text-lg text-gray-600">You haven&apos;t booked any surf lessons yet.</p>
        <button
          onClick={() => router.push('/lessons')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 ease-in-out shadow-md hover:scale-105"
        >
          Browse Lessons
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-gray-50 p-6 rounded-lg shadow-lg">
      <table className="min-w-full bg-white border rounded-lg overflow-hidden table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Lesson</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Date</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Time</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Price</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-100 transition duration-300 ease-in-out">
              <td className="py-3 px-4">{booking.lesson.title}</td>
              <td className="py-3 px-4">
                {new Date(booking.date).toLocaleDateString()}
              </td>
              <td className="py-3 px-4">{booking.time}</td>
              <td className="py-3 px-4">${booking.price.toFixed(2)}</td>
              <td className="py-3 px-4">
                <span className={`px-3 py-1 rounded-full text-sm ${statusColors[booking.status]}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}