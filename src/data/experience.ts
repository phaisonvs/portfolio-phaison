
export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: "edgmonics",
    company: "Edgmonics Log",
    role: "Frontend Developer",
    period: "Novembro 2023 - Atual",
    description: "Leveraged HTML5, CSS3, JavaScript (Vue.js), and TypeScript for tasks ranging from maintenance to new feature development and bug fixing. Integrated tools for Android compilation, with notable contributions including Google Maps API integration.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Vue.js", "TypeScript", "Google Maps API"]
  },
  {
    id: "createapps",
    company: "CreateApps LLC",
    role: "Full Stack Developer",
    period: "Abril 2023 - Julho 2023",
    description: "Achieved system optimization and scalability through meticulous maintenance and improvement, employing React hooks and TypeScript with Next.js. Also pioneered the development of new applications, implementing tools for reusable components, ensuring uniform and scalable interfaces.",
    technologies: ["React", "TypeScript", "Next.js", "UI/UX", "Responsive Design"]
  },
  {
    id: "ivalabs",
    company: "IvaLabs",
    role: "Frontend Developer",
    period: "Fevereiro 2022 - Junho 2023",
    description: "Led UI/UX design initiatives for websites focused on feature delivery and engagement with high-performing websites and systems. Enhanced SEO visibility through a 30% increase in organic traffic while maintaining uncompromised speed through dynamic SEO strategies.",
    technologies: ["HTML", "CSS", "JavaScript", "SEO", "UI/UX", "Performance Optimization"]
  },
  {
    id: "stacklycode",
    company: "StacklyCode",
    role: "Frontend Developer",
    period: "Janeiro 2021 - Dezembro 2021",
    description: "Migrated main web page codebase to TypeScript for better developer experience and integrate Frontend architectural patterns and coding best practices also achieving a 10% reduction in the legacy code by taking an atomic design within prettier reducing the legacy code by 10%.",
    technologies: ["TypeScript", "React", "Atomic Design", "Code Optimization"]
  }
];
