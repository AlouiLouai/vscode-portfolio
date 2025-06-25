import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { receiver_email } from '../../../public/data/contact'; // Adjusted path

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
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const data = await resend.emails.send({
      from: 'Your Name Here <onboarding@resend.dev>', // IMPORTANT: Replace with your verified sender or desired 'onboarding@resend.dev' format
      to: [receiver_email],
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      reply_to: email,
    });

    if (data.error) {
        console.error('Error sending email via Resend API:', data.error);
        return res.status(data.error.statusCode || 500).json({ error: data.error.message });
    }

    // Make sure to use data.id from the response for Resend
    if (data.id) {
        return res.status(200).json({ message: 'Email sent successfully!', id: data.id });
    } else {
        // Fallback if id is somehow not present but no error was thrown by resend.emails.send
        console.error('Resend response missing id and error object.');
        return res.status(500).json({ error: 'Failed to send email due to unexpected Resend response.' });
    }

  } catch (error: any) {
    console.error('Error in /api/send-email handler:', error);
    // Check if error is a Resend specific error structure or a generic Error
    const errorMessage = error.message || 'An unknown error occurred while sending the email.';
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ error: errorMessage });
  }
}
