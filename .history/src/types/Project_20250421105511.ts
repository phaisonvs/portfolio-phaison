export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  liveUrl?: string;
  gitUrl?: string;
  date?: string;
  tags: string[];
  featured?: boolean;
  visible?: boolean;
  views?: number;
}

export type ProjectTag = string;

export const availableTags = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "TailwindCSS",
  "CSS",
  "HTML",
  "API",
  "Full Stack",
  "Frontend",
  "Backend",
  "Mobile",
  "Web",
  "UI/UX",
  "Design",
  "Testing",
  "DevOps",
  "AWS",
  "Firebase",
  "Authentication",
  "Database",
  "Deployment",
  "Performance",
  "SEO",
  "Accessibility",
  "Responsive",
  "PWA",
] as const;
