
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  liveUrl?: string;
  tags?: string[];
  index?: number;
}

export function ProjectCard({ 
  id,
  title, 
  description, 
  image, 
  liveUrl,
  tags = [],
  index = 0
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
          <h3 className="text-white font-medium truncate">{title}</h3>
          <div className="flex gap-2">
            {liveUrl && (
              <a 
                href={liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
                aria-label="Ver site ao vivo"
              >
                <ExternalLink className="w-4 h-4 text-white" />
              </a>
            )}
            <Link
              to={`/projects/${id}`}
              className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
              aria-label="Detalhes do projeto"
            >
              <Play className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-900 rounded-full text-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-900 rounded-full text-gray-700 dark:text-gray-300">
              +{tags.length - 3}
            </span>
          )}
        </div>
        <h3 className="text-lg font-medium mb-2 truncate">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{description}</p>
      </div>
    </motion.div>
  );
}
