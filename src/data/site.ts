export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  summary: string;
};

export type EducationItem = {
  school: string;
  degree: string;
  field: string;
  period: string;
};

export const site = {
  name: "Mithil A. More",
  firstName: "Mithil",
  title: "Interior Designer",
  location: "Vadodara, India",
  locationShort: "Vadodara · IN",
  coordinates: "N 22.31° — E 73.19°",
  email: "mithilmore97@gmail.com",
  phoneDisplay: "+91 87338 30350",
  phoneRaw: "+918733830350",
  whatsapp: "https://wa.me/918733830350",
  instagram: "", // set to full profile URL to show the link in the footer
  profile:
    "I design innovative, functional spaces — from the first space plan to the final day on site. My practice sits where drawing meets building: space planning, design development and project coordination, carried through with observation, creativity and care.",
  availability: "Available for residential & commercial projects",
  languages: ["Marathi", "Gujarati", "Hindi", "English"],
  tools: [
    "AutoCAD",
    "SketchUp",
    "V-Ray",
    "Lumion",
    "Enscape",
    "Adobe Illustrator",
    "CorelDRAW",
  ],
  experience: [
    {
      company: "WE2 Interior Design Studio",
      role: "Interior Designer",
      period: "Jan 2026 — Present",
      summary:
        "Managing site execution, project coordination and design implementation.",
    },
    {
      company: "APM Studio",
      role: "Interior Designer",
      period: "Jul 2025 — Dec 2025",
      summary:
        "Space planning, design development and site coordination for residential & commercial projects.",
    },
    {
      company: "APM Studio",
      role: "Design Intern",
      period: "Feb 2025 — Apr 2025",
      summary:
        "Assisted the design team with working drawings, space planning and documentation.",
    },
  ] satisfies ExperienceItem[],
  education: [
    {
      school: "The Maharaja Sayajirao University of Baroda",
      degree: "Bachelor of Science (FCSC)",
      field: "Interior Design",
      period: "2022 — 2025",
    },
    {
      school: "The Maharaja Sayajirao University of Baroda",
      degree: "Bachelor of Commerce",
      field: "Accounting & Financial Management",
      period: "2015 — 2018",
    },
  ] satisfies EducationItem[],
};
