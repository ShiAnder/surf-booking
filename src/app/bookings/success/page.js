'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, Loader2, XCircle } from 'lucide-react';

export default function BookingSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
  const [processingMessage, setProcessingMessage] = useState(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      setError('Invalid booking session');
      setLoading(false);
      return;
    }

    async function fetchBookingDetails() {
      try {
        const response = await fetch(`/api/bookings/details?session_id=${sessionId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch booking details');
        }

        const data = await response.json();

        if (data.booking) {
          setBooking(data.booking);
        } else if (data.status === 'processing' && data.message) {
          setProcessingMessage(data.message);
        } else {
          throw new Error('Could not retrieve booking information');
        }
      } catch (err) {
        console.error('Error loading booking details:', err);
        setError(err.message || 'Failed to load booking details');
      } finally {
        setLoading(false);
      }
    }

    fetchBookingDetails();
  }, [searchParams]);

  const ButtonLink = ({ href, children, variant = 'primary' }) => {
    const base =
      'px-6 py-2 rounded text-center transition font-medium';
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'border border-blue-500 text-blue-500 hover:bg-blue-50',
    };
    return (
      <Link href={href} className={`${base} ${variants[variant]}`}>
        {children}
      </Link>
    );
  };

  const Wrapper = ({ icon, color, title, children }) => (
    <div className={`container mx-auto px-4 py-10 text-center`}>
      <div className={`bg-${color}-50 border border-${color}-200 rounded-2xl p-8 max-w-xl mx-auto shadow-md`}>
        <div className={`flex justify-center mb-4`}>
          {icon}
        </div>
        <h1 className={`text-2xl font-bold text-${color}-800 mb-4`}>{title}</h1>
        {children}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <ButtonLink href="/bookings">View All Bookings</ButtonLink>
          <ButtonLink href="/lessons" variant="secondary">Browse Lessons</ButtonLink>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <Wrapper
        icon={<Loader2 className="h-12 w-12 text-blue-500 animate-spin" />}
        color="blue"
        title="Processing Your Booking"
      >
        <p className="text-gray-700">Loading booking details...</p>
      </Wrapper>
    );
  }

  if (processingMessage) {
    return (
      <Wrapper
        icon={<AlertTriangle className="h-12 w-12 text-yellow-500" />}
        color="yellow"
        title="Payment Successful"
      >
        <p className="text-yellow-700">{processingMessage}</p>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper
        icon={<XCircle className="h-12 w-12 text-red-500" />}
        color="red"
        title="Something Went Wrong"
      >
        <p className="text-red-600">{error}</p>
      </Wrapper>
    );
  }

  if (!booking) {
    return (
      <Wrapper
        icon={<XCircle className="h-12 w-12 text-red-500" />}
        color="red"
        title="No Booking Found"
      >
        <p className="text-red-600">There was an issue retrieving your booking details.</p>
      </Wrapper>
    );
  }

  return (
    <div className="flex items-center justify-center bg-white px-4">
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 w-full max-w-xl text-center shadow-md">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-green-800 mb-4">Booking Confirmed!</h1>
  
        <div className="text-center text-gray-700 mb-6 space-y-2">
          {booking.lesson && (
            <>
              <p><span className="font-semibold">Lesson:</span> {booking.lesson.title}</p>
              <p><span className="font-semibold">Description:</span> {booking.lesson.description}</p>
            </>
          )}
          <p><span className="font-semibold">Date:</span> {new Date(booking.date).toLocaleDateString()}</p>
          <p><span className="font-semibold">Time:</span> {booking.time}</p>
          <p><span className="font-semibold">Amount paid:</span> ${booking.price.toFixed(2)}</p>
        </div>
  
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ButtonLink href="/bookings">View All Bookings</ButtonLink>
          <ButtonLink href="/lessons" variant="secondary">Book Another Lesson</ButtonLink>
        </div>
      </div>
    </div>
  );
  
}
