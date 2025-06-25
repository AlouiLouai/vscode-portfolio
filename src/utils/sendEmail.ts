import { Resend } from 'resend';
import { receiver_email } from "../../public/data/contact";

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
      from: 'louaialoui1993@gmail.com',
      to: receiver_email,
      subject: subject,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (data.error) {
      console.error("Error sending email:", data.error);
      return { status: 500, error: data.error.message };
    }

    return { status: 200 };
  } catch (error) {
    console.error("Error sending email:", error);
    // Ensure a compatible error response if needed by the calling component
    return { status: 500, error: error instanceof Error ? error.message : "Unknown error" };
  }
};
