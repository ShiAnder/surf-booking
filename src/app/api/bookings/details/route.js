// src/app/api/bookings/details/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../lib/auth';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    // Find the booking with the given session ID
    const booking = await prisma.booking.findUnique({
      where: { stripeSessionId: sessionId },
      include: {
        lesson: true, // Ensure lesson details are included
      },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Check if the booking belongs to the authenticated user
    if (booking.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // If booking is still pending, inform the client
    // if (booking.status === 'pending') {
    //   return NextResponse.json({
    //     message: 'Payment successful! Your booking is being processed. Please check your bookings page in a few moments.',
    //     status: 'processing',
    //   });
    // }

    // Return the booking data
    return NextResponse.json({ booking });
  } catch (error) {
    console.error('Error fetching booking details:', error);
    return NextResponse.json({ error: 'Failed to fetch booking details' }, { status: 500 });
  }
}
