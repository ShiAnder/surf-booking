// src/app/api/bookings/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all bookings for the authenticated user
    const bookings = await prisma.booking.findMany({
      where: { userId: session.user.id },
      include: {
        lesson: true, // Include lesson details in the response
      },
    });

    if (bookings.length === 0) {
      return NextResponse.json({ error: 'No bookings found' }, { status: 404 });
    }

    // Return all bookings for the user
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
