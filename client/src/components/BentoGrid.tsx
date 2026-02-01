import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function BentoCard({ children, className = "", delay = 0 }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15, 
        delay 
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      className={`
        relative overflow-hidden rounded-3xl
        bg-white/[0.03] backdrop-blur-xl
        border border-white/[0.08]
        hover:border-purple-500/30
        transition-colors duration-300
        ${className}
      `}
    >
      {/* Glassmorphism shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}

export function BentoGrid({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`grid gap-4 md:gap-5 ${className}`}>
      {children}
    </div>
  );
}
