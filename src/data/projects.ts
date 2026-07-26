// Common Bath
import bath01 from "../assets/projects/common-bath/01.jpg";
import bath02 from "../assets/projects/common-bath/02.jpg";
import bath03 from "../assets/projects/common-bath/03.jpg";
import bath04 from "../assets/projects/common-bath/04.jpg";
import bathPlan from "../assets/projects/common-bath/floor-plan.png";
import bathElev01 from "../assets/projects/common-bath/elevation-01.png";
import bathElev02 from "../assets/projects/common-bath/elevation-02.png";

// Family Kitchen
import kitchen01 from "../assets/projects/family-kitchen/01.jpg";
import kitchen02 from "../assets/projects/family-kitchen/02.jpg";
import kitchen03 from "../assets/projects/family-kitchen/03.jpg";
import kitchen04 from "../assets/projects/family-kitchen/04.jpg";
import kitchenPlan from "../assets/projects/family-kitchen/floor-plan.png";
import kitchenElev01 from "../assets/projects/family-kitchen/elevation-01.png";
import kitchenElev02 from "../assets/projects/family-kitchen/elevation-02.png";

// Master Suite
import suite01 from "../assets/projects/master-suite/01.jpg";
import suite02 from "../assets/projects/master-suite/02.jpg";
import suite03 from "../assets/projects/master-suite/03.jpg";
import suite04 from "../assets/projects/master-suite/04.jpg";
import suite05 from "../assets/projects/master-suite/05.jpg";
import suite06 from "../assets/projects/master-suite/06.jpg";
import suitePlan from "../assets/projects/master-suite/floor-plan.png";
import suiteElev01 from "../assets/projects/master-suite/elevation-01.png";
import suiteElev02 from "../assets/projects/master-suite/elevation-02.png";
import suiteWardrobe from "../assets/projects/master-suite/wardrobe.png";

export type ProjectPhoto = {
  src: string;
  alt: string;
  /**
   * full = full-bleed single, half = 2-up pair slot,
   * detail = smaller offset crop, drawing = technical sheet
   * (floor plan / elevation) shown matted, never cropped
   */
  layout: "full" | "half" | "detail" | "drawing";
};

export type Project = {
  slug: string;
  title: string;
  typology: string;
  location: string;
  year: string;
  role: string;
  tools: string[];
  /** 2-4 sentence intro shown under the detail-page title */
  intro: string;
  /** optional further paragraphs */
  story: string[];
  cover: string;
  coverAlt: string;
  photos: ProjectPhoto[];
};

export const projects: Project[] = [
  {
    slug: "master-suite",
    title: "The Master Suite",
    typology: "Residential · Bedroom",
    location: "Vadodara, IN",
    year: "2025",
    role: "Design, working drawings, visualisation",
    tools: ["AutoCAD", "SketchUp"],
    intro:
      "A master bedroom arranged around one gesture: a book-matched marble panel set into dark veneer, holding the bed. Behind it runs a walk-in wardrobe planned shelf by shelf in the drawings. Soft greys, warm curtains and a full-height window do the rest.",
    story: [],
    cover: suite01,
    coverAlt: "Master bedroom with book-matched marble panel behind the bed",
    photos: [
      { src: suite01, alt: "Master bedroom in daylight, marble panel and upholstered bed", layout: "full" },
      { src: suite03, alt: "Bedroom view toward the seating corner", layout: "half" },
      { src: suite04, alt: "Bedside detail with veneer panelling", layout: "half" },
      { src: suite02, alt: "The suite at dusk, warm light on the marble wall", layout: "full" },
      { src: suite05, alt: "View across the bed toward the window", layout: "half" },
      { src: suite06, alt: "Wardrobe corridor beyond the bedroom", layout: "half" },
      { src: suitePlan, alt: "Floor plan: master bedroom and walk-in wardrobe", layout: "drawing" },
      { src: suiteWardrobe, alt: "Walk-in wardrobe drawing", layout: "drawing" },
      { src: suiteElev01, alt: "Bed wall elevation", layout: "drawing" },
      { src: suiteElev02, alt: "Wardrobe side elevation", layout: "drawing" },
    ],
  },
  {
    slug: "common-bath",
    title: "The Common Bath",
    typology: "Residential · Bath",
    location: "Vadodara, IN",
    year: "2025",
    role: "Design, working drawings, visualisation",
    tools: ["AutoCAD", "SketchUp"],
    intro:
      "A compact common bath built on two confident materials: forest-green marble and glossy oxblood tile. Matte-black fixtures and a lit mirror keep the small footprint sharp. Drawn to the last tile joint, so the site had nothing to guess.",
    story: [],
    cover: bath01,
    coverAlt: "Bathroom in green marble and glossy oxblood tile",
    photos: [
      { src: bath01, alt: "Vanity wall in oxblood tile with green marble counter", layout: "full" },
      { src: bath02, alt: "Shower area in green marble", layout: "half" },
      { src: bath03, alt: "View from the entrance", layout: "half" },
      { src: bath04, alt: "Overview of the bath", layout: "full" },
      { src: bathPlan, alt: "Floor plan of the common bath", layout: "drawing" },
      { src: bathElev01, alt: "Vanity wall elevation", layout: "drawing" },
      { src: bathElev02, alt: "Shower wall elevation", layout: "drawing" },
    ],
  },
  {
    slug: "family-kitchen",
    title: "The Family Kitchen",
    typology: "Residential · Kitchen",
    location: "Vadodara, IN",
    year: "2025",
    role: "Design, working drawings, visualisation",
    tools: ["AutoCAD", "SketchUp"],
    intro:
      "An L-shaped kitchen in greys and warm whites, opening over a service counter to the family dining nook. Glass-front uppers, a concrete-toned worktop and brass pendants keep it equal parts workroom and living room. Every elevation was drawn before the first carcass was built.",
    story: [],
    cover: kitchen01,
    coverAlt: "L-shaped kitchen opening to the dining nook",
    photos: [
      { src: kitchen01, alt: "Kitchen and dining nook seen from the counter", layout: "full" },
      { src: kitchen02, alt: "The working wall: hob, hood and fridge niche", layout: "half" },
      { src: kitchen03, alt: "Cabinet fronts and fluted glass detail", layout: "half" },
      { src: kitchen04, alt: "Second view across the kitchen", layout: "full" },
      { src: kitchenPlan, alt: "Kitchen floor plan", layout: "drawing" },
      { src: kitchenElev01, alt: "Kitchen elevation, working wall", layout: "drawing" },
      { src: kitchenElev02, alt: "Kitchen elevation, tall units", layout: "drawing" },
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
