'use client';

import React, { useEffect, useState, Suspense, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, Loader2, XCircle } from 'lucide-react';

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

// ButtonLink component
const ButtonLink = ({ href, children, variant = 'primary' }: ButtonLinkProps) => {
  const baseClasses = 'px-6 py-2 rounded text-center transition font-medium';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'border border-blue-500 text-blue-500 hover:bg-blue-50',
  } as const;

  return (
    <Link href={href} className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </Link>
  );
};

interface StatusWrapperProps {
  children: ReactNode;
  icon: React.ReactElement<{ className?: string }>;
  title: string;
  statusType: 'loading' | 'processing' | 'error' | 'success';
}

// StatusWrapper component
const StatusWrapper = ({ children, icon, title, statusType }: StatusWrapperProps) => {
  const statusStyles = {
    loading: {
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-500',
    },
    processing: {
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
      iconColor: 'text-yellow-500',
    },
    error: {
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-600',
      iconColor: 'text-red-500',
    },
    success: {
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      iconColor: 'text-green-600',
    },
  } as const;

  const style = statusStyles[statusType];

  return (
    <div className="container mx-auto px-4 py-10 text-center">
      <div className={`${style.bgColor} border ${style.borderColor} rounded-2xl p-8 max-w-xl mx-auto shadow-md`}>
        <div className="flex justify-center mb-4">
          {React.cloneElement(icon, { className: `w-12 h-12 ${style.iconColor}` })}
        </div>
        <h1 className={`text-2xl font-bold ${style.textColor} mb-4`}>{title}</h1>
        {children}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <ButtonLink href="/bookings">View All Bookings</ButtonLink>
          <ButtonLink href="/lessons" variant="secondary">Browse Lessons</ButtonLink>
        </div>
      </div>
    </div>
  );
};

interface Lesson {
  id: string;
  title: string;
  description: string;
  price: number;
}

interface Booking {
  id: string;
  lesson: Lesson;
  date: string;
  time: string;
  price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

// Main logic wrapped in separate component
function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processingMessage, setProcessingMessage] = useState<string | null>(null);

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
        setError(err instanceof Error ? err.message : 'Failed to load booking details');
      } finally {
        setLoading(false);
      }
    }

    fetchBookingDetails();
  }, [searchParams]);

  if (loading) {
    return (
      <StatusWrapper
        icon={<Loader2 className="animate-spin" />}
        title="Processing Your Booking"
        statusType="loading"
      >
        <p className="text-gray-700">Loading booking details...</p>
      </StatusWrapper>
    );
  }

  if (processingMessage) {
    return (
      <StatusWrapper
        icon={<AlertTriangle />}
        title="Payment Successful"
        statusType="processing"
      >
        <p className="text-yellow-700">{processingMessage}</p>
      </StatusWrapper>
    );
  }

  if (error) {
    return (
      <StatusWrapper
        icon={<XCircle />}
        title="Something Went Wrong"
        statusType="error"
      >
        <p className="text-red-600">{error}</p>
      </StatusWrapper>
    );
  }

  if (!booking) {
    return (
      <StatusWrapper
        icon={<XCircle />}
        title="No Booking Found"
        statusType="error"
      >
        <p className="text-red-600">There was an issue retrieving your booking details.</p>
      </StatusWrapper>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col items-center justify-center bg-white w-full max-w-[900px] h-auto md:h-[600px] p-4 shadow-lg rounded-xl">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 w-full max-w-xl text-center shadow-md">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-inner">
            <h2 className="text-blue-800 font-semibold mb-2">Need Directions?</h2>
            <p className="text-sm text-blue-700">
              Get directions to the lesson location:&nbsp;
              <a
                href="https://www.google.com/maps/dir//420%2F5+Matara+Rd,+Galle+80000/@6.0334405,80.1545353,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3ae17305763efe21:0xfa58be40ead61503!2m2!1d80.2369372!2d6.0334467?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 font-medium"
              >
                420/5 Matara Rd, Galle 80000
              </a>
            </p>
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

          <div className="flex sm:flex-row flex-col gap-4 justify-center items-center">
            <ButtonLink href="/bookings" variant="primary">
              View All Bookings
            </ButtonLink>
            <ButtonLink href="/lessons" variant="secondary">
              Book Another Lesson
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}

// Exported page with Suspense
export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-10 text-gray-500">Loading booking page...</div>}>
      <BookingSuccessContent />
    </Suspense>
  );
}
