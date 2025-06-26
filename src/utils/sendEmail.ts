// No longer imports Resend or receiver_email directly here
// as that logic is now in the API route.

interface SendEmailValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface SendEmailResponse {
  status: number;
  message?: string;
  error?: string;
  id?: string;
}

export const sendEmail = async (values: SendEmailValues): Promise<SendEmailResponse> => {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const responseData = await response.json();

    if (!response.ok) {
      // If response is not OK, use error message from API response body if available
      console.error("Error sending email:", responseData.error || response.statusText);
      return {
        status: response.status,
        error: responseData.error || `Request failed with status ${response.status}`
      };
    }

    // Successfully sent, responseData might contain { message, id }
    return {
      status: response.status, // Should be 200
      message: responseData.message,
      id: responseData.id
    };

  } catch (error: any) {
    console.error("Network or other error sending email:", error);
    return {
      status: 500, // Generic server/network error status
      error: error.message || "An unexpected error occurred."
    };
  }
};
