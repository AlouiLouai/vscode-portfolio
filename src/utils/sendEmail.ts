import { Resend } from 'resend';
import { receiver_email } from "../../public/data/contact";

// It's good practice to ensure the API key is available,
// though Resend client itself might throw an error if it's missing.
if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set in environment variables.');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (values: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const { name, email, subject, message } = values;

  try {
    const data = await resend.emails.send({
      from: 'Your Name Here <onboarding@resend.dev>', // IMPORTANT: Replace with your verified sender or desired 'onboarding@resend.dev' format
      to: [receiver_email], // The email address you want to receive the contact form submissions
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      reply_to: email, // Set the sender's email as the reply-to address
    });

    console.log('Email sent successfully:', data);
    // Resend's API returns a response that includes an `id` on success.
    // We can consider it successful if there's no error and data is returned.
    // The original code checked for `status === 200`. Resend's `send` method
    // will throw an error for non-successful responses, or return data with an id.
    // If an error object is returned by Resend (e.g. data.error), we should handle it.
    if (data.error) {
      console.error('Error sending email via Resend:', data.error);
      // Mimic the structure of the old response for the calling code if needed,
      // or adjust the calling code to handle Resend's specific error structure.
      return { status: data.error.statusCode || 500, error: data.error.message };
    }
    return { status: 200, data }; // Indicate success

  } catch (error) {
    console.error('Error sending email:', error);
    // Mimic the structure of the old response
    let statusCode = 500;
    let errorMessage = 'An unknown error occurred.';

    if (error && typeof error === 'object' && 'statusCode' in error && 'message' in error) {
        statusCode = error.statusCode as number;
        errorMessage = error.message as string;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }

    return { status: statusCode, error: errorMessage };
  }
};
