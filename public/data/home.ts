import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export const homeData = {
  // To use your own photo, just place it in /public/assets and write the link as I did: eg: /assets/my_image.jpg
  // Of course it's best to convert your image file type to webp for better performance on the web!
  // The links are optional
  myImage: "/assets/my_image.webp", // You might want to update this image path
  contactInfo: [
    {
      Icon: IoMdMail,
      Label: "louaialoui1993@gmail.com",
      Link: "mailto:louaialoui1993@gmail.com",
    },
    {
      Icon: FaLocationDot,
      Label: "Tunis, Tunisia",
      // You can add a Google Maps link if you want
      // Link: "https://www.google.com/maps/place/Tunis",
    },
    {
      Icon: FaPhoneAlt,
      Label: "+216 53 317 696",
      Link: "tel:+21653317696",
    },
  ],
  education: [
    {
      Icon: FaUniversity,
      Label: "Honoris United Universities (ESPRIT)",
      // Add a link to the university if available
      Link: "https://www.esprit.tn/",
    },
    {
      Icon: FaGraduationCap,
      Label: "Software engineering Degree",
      // Add a link if available
      Link: "https://www.esprit.tn/", // Assuming this is also the correct link for the degree
    },
  ],
  social: [
    {
      Icon: FaGithub,
      Label: "Github",
      Link: "https://github.com/alouilouai",
    },
    {
      Icon: FaLinkedin,
      Label: "Linkedin",
      Link: "https://www.linkedin.com/in/louai-aloui-521094111/",
    },
    {
      Icon: FaFacebook,
      Label: "Facebook",
      Link: "https://www.facebook.com/louai.aloui.2025/",
    },
    {
      Icon: FaInstagram,
      Label: "Instagram",
      Link: "https://www.instagram.com/louaialoui1993/",
    },
    {
      Icon: FaYoutube,
      Label: "Youtube",
      Link: "https://www.youtube.com/@louaialoui-3",
    },
  ],
};
