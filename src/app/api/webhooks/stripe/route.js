// src/app/api/webhooks/stripe/route.js
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import stripe from '../../../../lib/stripe';
import prisma from '../../../../lib/db';

export async function POST(req) {
  const body = await req.text();
  const signature = headers().get('stripe-signature');
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
  
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    try {
      // Find the booking using the session ID from Stripe
      const updatedBooking = await prisma.booking.update({
        where: { stripeSessionId: session.id },
        data: {
          stripeCustomerId: session.customer, // Update with the Stripe customer ID
          status: 'confirmed', // Update the status to 'confirmed' when the checkout is complete
        },
      });
      
      if (!updatedBooking) {
        console.error('Booking not found for session:', session.id);
        return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
      }

      console.log('Booking updated with stripeCustomerId:', updatedBooking);
      
      return NextResponse.json({ received: true });
    } catch (error) {
      console.error('Error processing webhook:', error);
      return NextResponse.json(
        { error: 'Error processing webhook' },
        { status: 500 }
      );
    }
  }
  
  return NextResponse.json({ received: true });
}
