export const siteConfig = {
  email: "algeniux@gmail.com",
  phone: "[YOUR PHONE NUMBER]",
  social: {
    instagram: "https://instagram.com/algeniux",
    twitter: "https://x.com/algeniux",
    facebook: "https://facebook.com/algeniux",
    threads: "https://www.threads.net/@algeniux",
  },
} as const;

export type ProjectCategory = "Websites" | "Web Apps" | "Frontend" | "UI/UX" | "Full Stack";

export interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  problem: string;
  solution: string;
  features: string[];
  visual:
    | "commerce"
    | "business"
    | "property"
    | "food"
    | "analytics"
    | "finance"
    | "education"
    | "health"
    | "events"
    | "travel"
    | "portfolio"
    | "agency"
    | "photography"
    | "3d"
    | "animation"
    | "hardware"
    | "fashion"
    | "blog"
    | "landing"
    | "video"
    | "music"
    | "product"
    | "coffee";
}

const concepts: Array<[string, ProjectCategory, string[], Project["visual"], string, string]> = [
  [
    "Personal Portfolio",
    "Websites",
    ["React", "Next.js", "Framer Motion", "Tailwind CSS"],
    "portfolio",
    "A refined personal portfolio with smooth transitions, bold typography and case-study storytelling.",
    "https://portfoliothree.reactbd.com/",
  ],
  [
    "Digital Agency",
    "Websites",
    ["React", "GSAP", "Tailwind CSS"],
    "agency",
    "A confident agency presence that turns services into a clean, conversion-focused narrative.",
    "https://business.reactbd.com/",
  ],
  [
    "Scrolling Photographer Website",
    "Frontend",
    ["React", "Lenis", "Framer Motion", "CSS3"],
    "photography",
    "An immersive scroll-driven gallery built to let photography breathe and guide the viewer.",
    "https://www.melvinwinkeler.com/",
  ],
  [
    "3D Scrolling Portfolio",
    "Frontend",
    ["React", "Three.js", "React Three Fiber", "GSAP"],
    "3d",
    "A dimensional portfolio experience where 3D scenes respond to scroll and cursor movement.",
    "https://designbybrandin.com/",
  ],
  [
    "Can Drink Animation Web",
    "Frontend",
    ["React", "Framer Motion", "WebGL", "Tailwind CSS"],
    "animation",
    "A playful product story told through sequenced motion, scroll triggers and bold color.",
    "https://chug-spylt.vercel.app/",
  ],
  [
    "Cherry Tree Animation Website",
    "Frontend",
    ["React", "SVG Animation", "GSAP", "Canvas"],
    "animation",
    "A poetic, nature-inspired site where illustration and animation create a memorable brand moment.",
    "https://cherry-tree-psi.vercel.app/",
  ],
  [
    "Hardware Chip Manufacturing Company",
    "Websites",
    ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    "hardware",
    "A technical brand site that makes complex silicon engineering feel accessible and premium.",
    "https://www.etched.com/",
  ],
  [
    "Sneaker Store",
    "Full Stack",
    ["Next.js", "Shopify", "TypeScript", "Tailwind CSS"],
    "commerce",
    "A sneaker storefront built for discovery, quick add-to-cart and a confident checkout flow.",
    "https://www.permianworld.com/",
  ],
  [
    "Outfit Store",
    "Full Stack",
    ["React", "Stripe", "Node.js", "Tailwind CSS"],
    "fashion",
    "A fashion e-commerce experience focused on editorial layouts and seamless purchasing.",
    "https://outfit.hellohello.is/",
  ],
  [
    "Marketing Agency",
    "Websites",
    ["React", "Next.js", "Framer Motion", "Tailwind CSS"],
    "agency",
    "A high-energy marketing agency site with sharp messaging and conversion-oriented sections.",
    "https://www.northofzero.dev/",
  ],
  [
    "Finance Agency",
    "Websites",
    ["React", "TypeScript", "Recharts", "Tailwind CSS"],
    "finance",
    "A trustworthy finance brand experience that balances data clarity with human warmth.",
    "https://www.town.com/",
  ],
  [
    "Agency Site",
    "Websites",
    ["React", "Next.js", "GSAP", "Tailwind CSS"],
    "agency",
    "A modern practice site using whitespace, motion and case studies to build credibility.",
    "https://itsmodernpractice.com/",
  ],
  [
    "Hardware Retail Site",
    "Full Stack",
    ["Next.js", "Commerce Layer", "TypeScript", "Tailwind CSS"],
    "hardware",
    "A precision hardware retail experience with spec-rich product pages and reliable checkout.",
    "https://www.digitalmetal.io/",
  ],
  [
    "Pirate Blog",
    "Web Apps",
    ["Next.js", "MDX", "TypeScript", "Tailwind CSS"],
    "blog",
    "A sharp, opinionated publishing platform designed for long-form writing and loyal readership.",
    "https://www.piratewires.com/",
  ],
  [
    "Editorial Blog",
    "Web Apps",
    ["React", "Next.js", "Sanity", "Tailwind CSS"],
    "blog",
    "A calm, editorial blog experience with thoughtful typography and easy content management.",
    "https://www.caleomag.com/",
  ],
  [
    "Landing Page",
    "Websites",
    ["React", "Framer Motion", "Tailwind CSS"],
    "landing",
    "A focused landing page that distills a product promise into a single, high-conversion scroll.",
    "https://airspace.airtable.com/",
  ],
  [
    "Film Landing Page",
    "Websites",
    ["React", "Next.js", "Video", "Tailwind CSS"],
    "landing",
    "A cinematic landing experience that uses rich media and minimal copy to create anticipation.",
    "https://flim.ai/",
  ],
  [
    "Video Editor",
    "Web Apps",
    ["React", "WebGL", "TypeScript", "Tailwind CSS"],
    "video",
    "A product site for a video editor, emphasizing speed, collaboration and creative control.",
    "https://www.butter.video",
  ],
  [
    "Music Inspiration Website",
    "Websites",
    ["React", "Next.js", "Audio API", "Tailwind CSS"],
    "music",
    "A mood-driven music discovery site with immersive visuals and intuitive browsing.",
    "https://artemiilebedev.com/",
  ],
  [
    "Product Shop",
    "Full Stack",
    ["Next.js", "Shopify", "TypeScript", "Tailwind CSS"],
    "product",
    "A clean product shop that puts ingredients, benefits and subscription options first.",
    "https://seed.com/",
  ],
  [
    "Coffee Shop",
    "Websites",
    ["React", "Next.js", "Framer Motion", "Tailwind CSS"],
    "coffee",
    "A warm, local coffee shop site with menu highlights, location details and online ordering.",
    "https://touchycoffee.com/",
  ],
];

export const projects: Project[] = concepts.map(
  ([title, category, technologies, visual, description, liveUrl], index) => ({
    id: index + 1,
    title,
    category,
    description,
    technologies,
    visual,
    liveUrl,
    githubUrl: "#contact",
    featured: index < 6,
    problem:
      "The project needed a cohesive digital experience that could communicate value quickly without sacrificing craft or performance.",
    solution:
      "A modular interface system was built around clear hierarchy, responsive behavior and reusable engineering patterns tailored to the brand.",
    features: ["Responsive interface", "Accessible interactions", "Scalable component system", "Performance-focused delivery"],
  })
);

export const testimonials = [
  { quote: "Algeniux brought structure, care and a strong product mindset to every detail of the experience.", name: "Placeholder Client", role: "Replace with client role" },
  { quote: "The final interface felt polished, purposeful and noticeably easier for our audience to use.", name: "Placeholder Client", role: "Replace with client role" },
  { quote: "A thoughtful engineering partner who understands that quality lives in both the code and the experience.", name: "Placeholder Client", role: "Replace with client role" },
];
