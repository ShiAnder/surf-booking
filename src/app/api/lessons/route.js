import { NextResponse } from 'next/server';
import prisma from '../../../lib/db';

export async function GET() {
  try {
    const lessons = await prisma.lesson.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json(lessons);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lessons' },
      { status: 500 }
    );
  }
}