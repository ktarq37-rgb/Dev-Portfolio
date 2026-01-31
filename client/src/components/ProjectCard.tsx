import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef(null);
  
  // Create a subtle parallax effect for the image inside the card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group sticky top-24 mb-8 last:mb-0"
      style={{ zIndex: index }} // Sticky stacking order
    >
      <div className="glass-card rounded-3xl overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-2xl transition-all duration-300 hover:border-primary/50">
        <div className="grid md:grid-cols-2 gap-0 md:gap-8">
          {/* Image Section */}
          <div className="relative h-64 md:h-auto overflow-hidden">
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-300" />
            <motion.img 
              style={{ y }}
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="flex gap-3 mb-6 flex-wrap">
              {project.tags?.map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-3xl font-bold font-display mb-4 text-white group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {project.description}
            </p>

            <div className="flex items-center gap-4 mt-auto">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors"
                >
                  View Project <ExternalLink size={16} />
                </a>
              )}
              {project.repoUrl && (
                <a 
                  href={project.repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
                  aria-label="GitHub Repository"
                >
                  <Github size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
