// lib/email.js
import { Resend } from 'resend';

// Initialize the client with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMail({ to, subject, html, from = 'onboarding@resend.dev' }) {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });
    
    if (error) {
      throw new Error(`Resend API error: ${error.message}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error sending email with Resend:', error);
    throw error;
  }
}