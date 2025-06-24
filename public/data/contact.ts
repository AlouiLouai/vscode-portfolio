import { homeData } from "./home"; // Assuming home.ts is in the same directory

export const receiver_email = "kareem.e.a.hamouda@gmail.com"; // Your email for recieving emails using the email service.
// The emails are sent using a personally developed email api: https://github.com/KareemEhab/email-sender
// Feel free to clone the email service as well and deploy your own, you'll find all the steps in the README there.
// Make sure to update /src/utils/sendEmail.ts with your own deployed link.

// Helper function to extract the main part of the link for display, if needed
const formatLinkValue = (link: string) => {
  if (!link) return "";
  return link
    .replace(/^mailto:/, "")
    .replace(/^tel:/, "")
    .replace(/^https?:\/\//, "");
};

const newContactInfo : any[] = [];

// Add contact info (Email, Location, Phone)
if (homeData.contactInfo) {
  homeData.contactInfo.forEach((item) => {
    let label = "";
    let value = item.Link ? formatLinkValue(item.Link) : item.Label; // Default to Label if Link is not there

    if (item.Label.includes("@")) { // Email
      label = "Email";
      value = item.Label; // Use the full email label as value
    } else if (item.Icon.name === "FaLocationDot") { // Location
      label = "Location";
      value = item.Label; // Use the location label as value
    } else if (item.Icon.name === "FaPhoneAlt") { // Phone
      label = "Phone";
      value = item.Label; // Use the phone label (which is the number) as value
    }

    if (label) {
      newContactInfo.push({
        icon: item.Icon,
        label: label,
        value: value,
        link: item.Link, // Keep original link for potential use
      });
    }
  });
}

// Add social media info
if (homeData.social) {
  homeData.social.forEach((item) => {
    // Only add items if they are part of the requested list: GitHub, LinkedIn, Facebook, Instagram
    const socialLabel = item.Label.toLowerCase();
    if (["github", "linkedin", "facebook", "instagram"].includes(socialLabel)) {
      newContactInfo.push({
        icon: item.Icon,
        label: item.Label, // e.g., "Github", "LinkedIn"
        value: item.Link ? formatLinkValue(item.Link) : item.Label,
        link: item.Link, // Keep original link
      });
    }
  });
}

export const contactInfo = newContactInfo;
