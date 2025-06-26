import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); // or use 'http://localhost:5173' for stricter dev setup
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    // Explicitly send a response for OPTIONS.
    // Vercel might require .send() or .end() to properly terminate the response.
    return res.status(204).send(''); // 204 No Content is often preferred for OPTIONS
  }

  if (req.method !== 'POST') {
    // Ensure Allow header is set before sending the response body for 405.
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  // Ensure body is parsed, Vercel might handle this automatically,
  // but let's be defensive. req.body should be populated by Vercel's body parser.
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!process.env.RESEND_API_KEY || !process.env.TO_EMAIL_ADDRESS) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const data = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
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
      replyTo: email,
    });

    if (data.data?.id) {
      return res.status(200).json({ message: 'Email sent successfully!', id: data.data.id });
    } else {
      console.error('Unexpected Resend response:', data);
      return res.status(500).json({ error: 'Unexpected response from email service' });
    }
  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
