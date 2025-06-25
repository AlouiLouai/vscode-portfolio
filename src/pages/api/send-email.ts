import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
// Adjusted path: from src/pages/api/send-email.ts to public/data/contact.ts
import { receiver_email } from '../../../../public/data/contact';

type Data = {
  message?: string;
  error?: string;
  id?: string; // Resend success response includes an id
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
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
    return res.status(500).json({ error: 'Server configuration error. RESEND_API_KEY is missing.' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const sendResponse = await resend.emails.send({
      // Using a generic 'from' address format, user should verify with their Resend setup
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: [receiver_email], // receiver_email should be an array or string
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email, // Corrected from reply_to
    });

    // Resend SDK v2+ returns { id: string } on success, and { error: ResendError } on failure.
    // The error is also thrown, so the catch block will typically handle API errors.
    // This check is more for direct API response scenarios if not using await/throw pattern.
    if (sendResponse.error) {
        console.error('Error sending email via Resend API:', sendResponse.error);
        // Try to use name and message from ResendError, default to generic messages
        const errorMessage = sendResponse.error.message || 'Failed to send email due to an API error.';
        // ResendError may not have a statusCode directly. Infer or use a default.
        // For example, 'validation_error' might imply 422 or 400.
        let statusCode = 500;
        if (sendResponse.error.name === 'validation_error') {
            statusCode = 422;
        } else if (sendResponse.error.name === 'authentication_error') {
            statusCode = 401;
        }
        return res.status(statusCode).json({ error: errorMessage });
    }

    // If successful, Resend returns an object with an 'id'
    if (sendResponse.id) {
        return res.status(200).json({ message: 'Email sent successfully!', id: sendResponse.id });
    } else {
        // Fallback if id is somehow not present but no error was thrown by resend.emails.send
        // This case should ideally not be reached if using Resend SDK correctly as errors are thrown.
        console.error('Resend response missing id and error object was not thrown.');
        return res.status(500).json({ error: 'Failed to send email due to unexpected Resend response.' });
    }

  } catch (error: any) {
    console.error('Error in /api/send-email handler:', error);
    // Handle errors thrown by the Resend SDK (e.g., network issues, or if Resend throws structured errors)
    const errorMessage = error.message || 'An unknown error occurred while sending the email.';
    // If the error object has a name (like ResendError), it might be more specific
    const errorName = error.name || 'unknown_error';
    let statusCode = 500; // Default to 500

    // You could add more specific status codes based on error.name if needed
    if (errorName === 'validation_error') {
        statusCode = 422; // Unprocessable Entity
    } else if (errorName === 'authentication_error') {
        statusCode = 401; // Unauthorized
    } else if (errorName === 'rate_limit_exceeded') {
        statusCode = 429; // Too Many Requests
    }

    return res.status(statusCode).json({ error: errorMessage, name: errorName });
  }
}
