export const aboutMe = {
  description: [
    "A Full Stack Developer (MERN) with a degree in Computer Science (Information Systems) from Ain Shams University and 9 months of professional training at Information Technology Institute (ITI) in Web & UI Development.",
    "Experienced in leadership, teaching, and mentoring, having served as a military reserve officer with a background in web development. Skilled in front-end and back-end development, as well as UI/UX design, and can deliver results under pressure. Passionate about building scalable web applications and contributing to innovative projects.",
  ],
  cvPath: "/assets/CV.pdf", // Upload your own CV in /public/assets as CV.pdf
  cvFileNameAfterDownload: "Kareem Hamouda CV.pdf", // This is what the name of the file is going to be when downloaded
};

export const technicalSkills: Record<string, string[]> = {
  // You can rename the type of skills, it's dynamically rendered. eg: You can change "Programming Languages" -> to just "Languages"
  "Programming Languages": ["JavaScript", "TypeScript", "C#", "C++"],
  "Frontend Development": [
    "React",
    "Next.js",
    "Angular",
    "HTML5",
    "CSS3",
    "Bootstrap",
    "Tailwind",
    "Chakra UI",
    "Redux Toolkit",
  ],
  "Backend Development": [
    "Node.js",
    "Express.js",
    ".NET",
    "MongoDB",
    "Mongoose",
    "SQL",
    "MySQL",
  ],
  "UI/UX Design": [
    "Figma",
    "Adobe Illustrator",
    "Adobe Photoshop",
    "Miro",
    "MockFlow",
  ],
  "Tools & Technologies": [
    "Git",
    "GitHub",
    "Agile (Scrum, Jira, Kanban)",
    "Trello",
  ],
  "Soft Skills": [
    "Presentation",
    "Communication",
    "Professional Demeanor",
    "Leadership",
    "Mentorship",
  ],
};
