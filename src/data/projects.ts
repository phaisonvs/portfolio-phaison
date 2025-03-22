
export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  liveUrl?: string;
  gitUrl?: string;
  date: string;
  tags: string[];
  featured: boolean;
  visible: boolean;
  views: number;
}

export const projects: Project[] = [
  {
    id: "replidshop",
    title: "ReplidShop",
    description: "Ecommerce platform built with Vue.js, Tailwind, Vuex",
    fullDescription: "A comprehensive e-commerce platform designed for seamless online shopping experiences. Features include user accounts, product browsing with advanced filtering, shopping cart functionality, secure checkout, and order tracking. Built with a modern tech stack for optimal performance.",
    image: "/lovable-uploads/1d1a30fb-6f2d-4525-94d3-9dd652079284.png",
    liveUrl: "https://example.com/replidshop",
    gitUrl: "https://github.com/example/replidshop",
    date: "2023-05-10",
    tags: ["Vue.js", "Tailwind CSS", "E-commerce", "Vuex", "Frontend"],
    featured: true,
    visible: true,
    views: 453
  },
  {
    id: "web-animated-series",
    title: "Web animated series",
    description: "Collection of web-based animated series using WebGL and Canvas",
    fullDescription: "An immersive web-based platform showcasing animated series created using advanced WebGL and Canvas technologies. The platform offers smooth animations, interactive elements, and a responsive design that adapts to different screen sizes. The project demonstrates cutting-edge web animation capabilities.",
    image: "https://placehold.co/600x400/png",
    liveUrl: "https://example.com/web-animated-series",
    gitUrl: "https://github.com/example/web-animated-series",
    date: "2023-03-22",
    tags: ["WebGL", "Canvas", "Animation", "JavaScript", "Frontend"],
    featured: true,
    visible: true,
    views: 287
  },
  {
    id: "color-generator",
    title: "Color Generator",
    description: "Image color generator built with Next.js, TailwindCSS and Typescript",
    fullDescription: "A sophisticated tool that analyzes images to extract key colors and generate harmonious color palettes. Users can upload images or provide URLs, and the application processes the visual data to create custom color schemes. Features include palette export options, color code display, and accessibility ratings for color combinations.",
    image: "https://placehold.co/600x400/png",
    liveUrl: "https://example.com/color-generator",
    gitUrl: "https://github.com/example/color-generator",
    date: "2023-02-15",
    tags: ["Next.js", "TailwindCSS", "TypeScript", "Color Theory", "Frontend"],
    featured: true,
    visible: true,
    views: 312
  },
  {
    id: "image-editor-tool",
    title: "Image Editor Tool",
    description: "Comprehensive online image editing application with advanced filters",
    fullDescription: "A feature-rich online image editing tool that allows users to manipulate images with professional-grade precision. The application includes features such as cropping, resizing, filters, adjustments, text overlay, and layer management. Built with performance in mind, it handles large image files smoothly while providing an intuitive user interface.",
    image: "https://placehold.co/600x400/png",
    liveUrl: "https://example.com/image-editor",
    gitUrl: "https://github.com/example/image-editor",
    date: "2022-11-30",
    tags: ["React", "Canvas API", "Image Processing", "Frontend"],
    featured: true,
    visible: true,
    views: 198
  },
  {
    id: "task-management-app",
    title: "Task Management App",
    description: "Productivity tool for managing projects and tasks efficiently",
    fullDescription: "A comprehensive task management application designed to boost productivity and streamline project workflows. Users can create projects, add tasks with detailed information, set deadlines, assign priorities, and track progress. The app includes features like Kanban boards, calendar views, time tracking, and collaboration tools.",
    image: "https://placehold.co/600x400/png",
    liveUrl: "https://example.com/task-manager",
    gitUrl: "https://github.com/example/task-manager",
    date: "2022-09-15",
    tags: ["React", "Redux", "Firebase", "Productivity", "Fullstack"],
    featured: false,
    visible: true,
    views: 176
  },
  {
    id: "weather-dashboard",
    title: "Weather Dashboard",
    description: "Real-time weather application with detailed forecasts and visualizations",
    fullDescription: "A sophisticated weather dashboard that provides users with real-time weather data and forecasts. The application features beautiful visualizations of weather patterns, detailed hourly and daily forecasts, radar maps, and weather alerts. Users can save favorite locations and access historical weather data for comparative analysis.",
    image: "https://placehold.co/600x400/png",
    liveUrl: "https://example.com/weather-dashboard",
    gitUrl: "https://github.com/example/weather-dashboard",
    date: "2022-07-08",
    tags: ["React", "D3.js", "API Integration", "Data Visualization"],
    featured: false,
    visible: true,
    views: 143
  }
];
