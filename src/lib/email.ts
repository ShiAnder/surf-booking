// lib/email.ts
import { Resend } from 'resend';

// Initialize the client with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

interface SendMailParams {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export async function sendMail({ 
  to, 
  subject, 
  html, 
  from = 'onboarding@resend.dev' 
}: SendMailParams) {
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