import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import prisma from '../../../../lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  try {
    const body = await req.text();
    const signature = headers().get('stripe-signature');

    // Verify the webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Find the booking using the stripeSessionId
      const booking = await prisma.booking.findFirst({
        where: {
          stripeSessionId: session.id,
        },
        include: {
          user: true,
          lesson: true,
        },
      });

      if (!booking) {
        console.error(`No booking found for Stripe session: ${session.id}`);
        return new NextResponse('Booking not found', { status: 404 });
      }

      // Update booking status to confirmed
      await prisma.booking.update({
        where: {
          id: booking.id,
        },
        data: {
          status: 'confirmed',
          paidAt: new Date(),
        },
      });
      
    }

    return new NextResponse('Webhook received', { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return new NextResponse(`Webhook error: ${error.message}`, { status: 500 });
  }
}

// Configure the route as dynamic to ensure it always gets the latest data
export const dynamic = 'force-dynamic';