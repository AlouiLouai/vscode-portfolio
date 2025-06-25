import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set in environment variables.');
    return res.status(500).json({ error: 'Server configuration error: RESEND_API_KEY is missing.' });
  }

  if (!process.env.TO_EMAIL_ADDRESS) {
    console.error('TO_EMAIL_ADDRESS is not set in environment variables.');
    return res.status(500).json({ error: 'Server configuration error: TO_EMAIL_ADDRESS is missing.' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const data = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>', // User should verify this with Resend
      to: process.env.TO_EMAIL_ADDRESS,
      subject: `New Contact Form: ${subject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email, // Corrected to camelCase
    });

    // According to Resend SDK v2+, a successful call returns { id: string }.
    // Errors are thrown and should be caught by the catch block.
    // The 'data.error' check is less likely needed if errors are always thrown.
    if (data.id) {
      return res.status(200).json({ message: 'Email sent successfully!', id: data.id });
    } else if (data.error) { // This handles cases where Resend might return an error object without throwing
      console.error('Resend API Error Object:', data.error);
      const resendError = data.error as { name?: string; message?: string; statusCode?: number };
      return res.status(resendError.statusCode || 500).json({ error: resendError.message || 'Failed to send email via Resend.'});
    }
     else {
      // Fallback for unexpected response structure if no id and no error, though unlikely.
      console.error('Unexpected Resend response structure:', data);
      return res.status(500).json({ error: 'Failed to send email due to unexpected Resend response.' });
    }

  } catch (error: any) {
    console.error('Error in send-email handler:', error);
    // Try to extract Resend specific error details if available
    const errorMessage = error.message || 'An unknown error occurred while sending the email.';
    const errorName = error.name || 'unknown_error';
    let statusCode = 500;

    if (errorName === 'validation_error') {
        statusCode = 422;
    } else if (errorName === 'authentication_error' || errorName === 'missing_api_key') {
        statusCode = 401;
    } else if (errorName === 'rate_limit_exceeded') {
        statusCode = 429;
    }

    return res.status(statusCode).json({ error: errorMessage, name: errorName });
  }
}
