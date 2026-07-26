import project1 from "../assets/project-1.jpg";
import project2 from "../assets/project-2.jpg";
import project3 from "../assets/project-3.jpg";
import project4 from "../assets/project-4.jpg";
import hero from "../assets/hero.jpg";

export type ProjectPhoto = {
  src: string;
  alt: string;
  /** full = full-bleed single, half = 2-up pair slot, detail = smaller offset crop */
  layout: "full" | "half" | "detail";
};

export type Project = {
  slug: string;
  title: string;
  typology: string;
  location: string;
  year: string;
  role: string;
  tools: string[];
  /** 2–4 sentence intro shown under the detail-page title */
  intro: string;
  /** optional further paragraphs */
  story: string[];
  cover: string;
  coverAlt: string;
  photos: ProjectPhoto[];
};

// ─────────────────────────────────────────────────────────────
// SAMPLE PROJECTS — the structure is final, the content is
// placeholder. Replace titles, locations, text and photos with
// real work before publishing. See CONTENT.md for exactly how.
// ─────────────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    slug: "residence-01",
    title: "Residence 01",
    typology: "Private Residence",
    location: "Vadodara, IN",
    year: "2025",
    role: "Space planning · Design development · Site coordination",
    tools: ["AutoCAD", "SketchUp", "V-Ray"],
    intro:
      "Sample copy — replace with two to four sentences on the brief, the constraint that shaped the plan, and what the finished space feels like.",
    story: [],
    cover: hero,
    coverAlt: "Sample interior — replace with project photography",
    photos: [
      { src: hero, alt: "Sample photo — replace", layout: "full" },
      { src: project2, alt: "Sample photo — replace", layout: "half" },
      { src: project3, alt: "Sample photo — replace", layout: "half" },
      { src: project1, alt: "Sample photo — replace", layout: "full" },
      { src: project4, alt: "Sample photo — replace", layout: "detail" },
    ],
  },
  {
    slug: "commercial-01",
    title: "Commercial 01",
    typology: "Commercial / Workspace",
    location: "Vadodara, IN",
    year: "2025",
    role: "Design development · Working drawings",
    tools: ["AutoCAD", "SketchUp", "Lumion"],
    intro:
      "Sample copy — replace with two to four sentences about this project.",
    story: [],
    cover: project1,
    coverAlt: "Sample interior — replace with project photography",
    photos: [
      { src: project1, alt: "Sample photo — replace", layout: "full" },
      { src: project4, alt: "Sample photo — replace", layout: "half" },
      { src: project2, alt: "Sample photo — replace", layout: "half" },
    ],
  },
  {
    slug: "residence-02",
    title: "Residence 02",
    typology: "Apartment",
    location: "Vadodara, IN",
    year: "2024",
    role: "Space planning · 3D visualisation",
    tools: ["SketchUp", "Enscape", "Photoshop"],
    intro: "Sample copy — replace with two to four sentences about this project.",
    story: [],
    cover: project2,
    coverAlt: "Sample interior — replace with project photography",
    photos: [
      { src: project2, alt: "Sample photo — replace", layout: "full" },
      { src: project3, alt: "Sample photo — replace", layout: "half" },
      { src: hero, alt: "Sample photo — replace", layout: "half" },
    ],
  },
  {
    slug: "academic-01",
    title: "Academic Project",
    typology: "Academic / Concept",
    location: "MSU Baroda",
    year: "2024",
    role: "Concept · Drawings · Visualisation",
    tools: ["AutoCAD", "V-Ray", "Illustrator"],
    intro: "Sample copy — replace with two to four sentences about this project.",
    story: [],
    cover: project3,
    coverAlt: "Sample interior — replace with project photography",
    photos: [
      { src: project3, alt: "Sample photo — replace", layout: "full" },
      { src: project4, alt: "Sample photo — replace", layout: "detail" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
