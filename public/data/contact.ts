import {
  FaPhoneAlt,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

export const receiver_email = "kareem.e.a.hamouda@gmail.com"; // Your email for recieving emails using the email service.
// The emails are sent using a personally developed email api: https://github.com/KareemEhab/email-sender
// Feel free to clone the email service as well and deploy your own, you'll find all the steps in the README there.
// Make sure to update /src/utils/sendEmail.ts with your own deployed link.

export const contactInfo = [
  {
    icon: FaPhoneAlt,
    label: "Phone",
    value: "+20 115 111 9085",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+20 115 111 9085",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    value: "github.com/KareemEhab",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/kareem-hamouda",
  },
  {
    icon: FaFacebook,
    label: "Facebook",
    value: "facebook.com/kareem.ehab.37",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    value: "instagram.com/kareem.ehabz",
  },
];
