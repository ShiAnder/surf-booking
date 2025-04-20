// File: /app/api/bookings/booked-slots/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // Adjust based on your database setup

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const lessonId = searchParams.get('lessonId');
    
    if (!lessonId) {
      return NextResponse.json({ error: 'Lesson ID is required' }, { status: 400 });
    }

    // Get current date at start of day to ensure we compare properly
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Query your database for bookings
    const bookings = await prisma.booking.findMany({
      where: {
        lessonId: lessonId, // Use the lessonId as a string directly, no parseInt
        // Only fetch current or future bookings
        date: {
          gte: today // Use the Date object directly
        }
      },
      select: {
        date: true,
        time: true
      }
    });

    // Transform bookings into a lookup object format for more efficient client-side processing
    // Format: { "2025-04-20": ["09:00 AM", "11:00 AM"], "2025-04-21": ["02:00 PM"] }
    const bookedSlots = {};
    
    bookings.forEach(booking => {
      const dateString = new Date(booking.date).toISOString().split('T')[0];
      
      if (!bookedSlots[dateString]) {
        bookedSlots[dateString] = [];
      }
      
      bookedSlots[dateString].push(booking.time);
    });

    console.log('Booked slots:', bookedSlots);

    return NextResponse.json({ bookedSlots });
  } catch (error) {
    console.error('Error fetching booked slots:', error);
    return NextResponse.json(
      { error: 'Failed to fetch booked slots' },
      { status: 500 }
    );
  }
}