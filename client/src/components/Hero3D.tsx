import { motion } from "framer-motion";
import avatarImage from "@/assets/images/avatar.jpeg";

export function HeroAvatar({ avatarUrl }: { avatarUrl?: string }) {
  const imageSrc = avatarImage;
  
  return (
    <div className="relative w-80 h-96 md:w-[400px] md:h-[480px] mx-auto flex items-end justify-center">
      {/* Background glow - purple gradient matching the avatar */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[60%] bg-gradient-to-t from-primary/50 via-purple-500/30 to-transparent rounded-[100%] blur-3xl"
      />
      
      {/* Secondary glow ring */}
      <motion.div
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-16 bg-primary/40 rounded-[100%] blur-2xl"
      />
      
      {/* Floating Avatar Container */}
      <motion.div
        animate={{ 
          y: [0, -15, 0],
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut",
        }}
        className="relative z-10 w-full h-full"
      >
        {/* Avatar Image with bottom fade */}
        <div className="relative w-full h-full">
          <img 
            src={imageSrc} 
            alt="Hassan - 3D Avatar" 
            className="w-full h-full object-cover object-top"
          />
          
          {/* Bottom fade gradient - makes avatar blend into background */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background via-background/80 to-transparent" />
          
          {/* Subtle top gradient for depth */}
          <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-background/20 to-transparent" />
        </div>
      </motion.div>

      {/* Decorative orbiting elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 -right-4 w-16 h-16 border border-secondary/30 rounded-full border-dashed"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-secondary rounded-full" />
      </motion.div>
      
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/3 -left-6 w-20 h-20 border border-primary/30 rounded-full border-dashed"
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full" />
      </motion.div>

      {/* Floating particles */}
      <motion.div
        animate={{ y: [-10, 10, -10], x: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -right-2 w-3 h-3 bg-primary/60 rounded-full blur-sm"
      />
      <motion.div
        animate={{ y: [10, -10, 10], x: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 -left-3 w-2 h-2 bg-secondary/60 rounded-full blur-sm"
      />
    </div>
  );
}
