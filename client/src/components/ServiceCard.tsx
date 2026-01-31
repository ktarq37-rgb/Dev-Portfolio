import { motion } from "framer-motion";
import { Service } from "@shared/schema";
import * as Icons from "lucide-react";

// Helper to dynamically render Lucide icon
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  // @ts-ignore
  const Icon = Icons[name as keyof typeof Icons] || Icons.Code;
  return <Icon className={className} />;
}

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="p-8 rounded-3xl bg-card border border-white/5 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
    >
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary group-hover:text-white">
          <DynamicIcon name={service.icon} className="w-7 h-7" />
        </div>
        
        <h3 className="text-xl font-bold font-display mb-3 text-white">
          {service.title}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-white/80 transition-colors">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}
