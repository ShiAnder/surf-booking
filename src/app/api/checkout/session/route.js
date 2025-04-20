// src/app/api/checkout/session/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import stripe from '../../../../lib/stripe';
import prisma from '../../../../lib/db';
import { authOptions } from '../../../../lib/auth';
import { sendMail } from '../../../../lib/email';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { lessonId, date, time } = body;

    if (!lessonId || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get the lesson details
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    // Create a pending booking first
    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        lessonId: lessonId,
        date: new Date(date),
        time: time,
        price: lesson.price,
        status: 'pending', // Set status as pending initially
        stripeSessionId: '', // Will be updated after creating Stripe session
      },
    });

    // Create Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: lesson.title,
              description: `Surf lesson on ${new Date(date).toLocaleDateString()} at ${time}`,
            },
            unit_amount: Math.round(lesson.price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/bookings/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/lessons`,
      customer_email: session.user.email,
      metadata: {
        userId: session.user.id,
        lessonId: lessonId,
        date: date,
        time: time,
        bookingId: booking.id, // Include the booking ID in metadata
      },
    });

    // Update the booking with the Stripe session ID
    await prisma.booking.update({
      where: { id: booking.id },
      data: { stripeSessionId: stripeSession.id },
    });

    // Format email content
    const bookingDate = new Date(date).toLocaleDateString();
    const userEmail = session.user.email;
    const userName = session.user.name || session.user.email;

    const userEmailHtml = `
      <h2>Surf Booking Confirmation</h2>
      <p>Hi ${userName},</p>
      <p>Your booking has been received for the lesson:</p>
      <ul>
        <li><strong>Lesson:</strong> ${lesson.title}</li>
        <li><strong>Date:</strong> ${bookingDate}</li>
        <li><strong>Time:</strong> ${time}</li>
        <li><strong>Price:</strong> $${lesson.price}</li>
      </ul>
      <p>You can complete your payment <a href="${stripeSession.url}">here</a>.</p>
    `;

    const adminEmailHtml = `
      <h2>New Surf Lesson Booking</h2>
      <p>A new booking has been made by ${userName}:</p>
      <ul>
        <li><strong>Email:</strong> ${userEmail}</li>
        <li><strong>Lesson:</strong> ${lesson.title}</li>
        <li><strong>Date:</strong> ${bookingDate}</li>
        <li><strong>Time:</strong> ${time}</li>
        <li><strong>Price:</strong> $${lesson.price}</li>
      </ul>
    `;

    // Try to send emails but continue even if they fail
    try {
      // Send email to user
      await sendMail({
        to: userEmail,
        subject: 'Your Surf Lesson Booking Received - Payment Pending',
        html: userEmailHtml,
      });

      // Send email to admin
      await sendMail({
        to: process.env.ADMIN_EMAIL,
        subject: 'New Surf Booking Notification',
        html: adminEmailHtml,
      });
    } catch (emailError) {
      // Log the error but don't stop the checkout process
      console.error('Email sending failed:', emailError);
    }

    return NextResponse.json({ sessionUrl: stripeSession.url, sessionId: stripeSession.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}