import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Github, ExternalLink } from "lucide-react";
import { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
}

export function ProjectCard({ project, index, total }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);

  const stickyTop = 100 + index * 20;

  return (
    <motion.div 
      ref={cardRef}
      style={{ 
        scale,
        opacity,
        top: `${stickyTop}px`,
        zIndex: total - index
      }}
      className="sticky mb-8 last:mb-0"
      data-testid={`card-project-${project.id}`}
    >
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="rounded-3xl overflow-hidden border border-white/10 bg-[#080808] shadow-2xl transition-all duration-500 hover:border-primary/40 hover:shadow-primary/10"
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section with parallax */}
          <div className="relative h-64 md:h-[400px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/10 mix-blend-overlay z-10" />
            <motion.img 
              style={{ y }}
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-[120%] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-transparent to-transparent md:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent md:hidden" />
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12 flex flex-col justify-center relative">
            {/* Decorative number */}
            <span className="absolute top-8 right-8 text-8xl font-display font-bold text-white/5">
              0{index + 1}
            </span>

            <div className="flex gap-2 mb-6 flex-wrap">
              {project.tags?.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-3xl md:text-4xl font-bold font-display mb-4 text-white">
              {project.title}
            </h3>
            
            <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
              {project.description}
            </p>

            <div className="flex items-center gap-4 mt-auto">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-100 transition-all hover:scale-105 active:scale-95"
                  data-testid={`link-project-live-${project.id}`}
                >
                  View Project <ExternalLink size={16} />
                </a>
              )}
              {project.repoUrl && (
                <a 
                  href={project.repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all"
                  aria-label="GitHub Repository"
                  data-testid={`link-project-repo-${project.id}`}
                >
                  <Github size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
