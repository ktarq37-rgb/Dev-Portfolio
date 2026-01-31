import { motion } from "framer-motion";
import { Service } from "@shared/schema";
import * as Icons from "lucide-react";
import { useRef, useState, MouseEvent } from "react";

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = Icons[name as keyof typeof Icons] || Icons.Code;
  return <Icon className={className} />;
}

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="p-8 rounded-3xl bg-card border border-white/5 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
      data-testid={`card-service-${service.id}`}
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(138, 43, 226, 0.15), transparent 60%)`,
        }}
      />

      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30">
          <DynamicIcon name={service.icon} className="w-7 h-7" />
        </div>
        
        <h3 className="text-xl font-bold font-display mb-3 text-white">
          {service.title}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-white/80 transition-colors">
          {service.description}
        </p>
      </div>

      {/* Corner accent */}
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-full" />
    </motion.div>
  );
}
