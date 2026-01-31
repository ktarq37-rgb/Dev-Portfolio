import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber"; // If we had r3f installed, but for simplicity we'll simulate 3D with css/motion
import { useProfile } from "@/hooks/use-portfolio";

// A stylized avatar component that uses CSS/motion to simulate depth
// This is more performant than a full 3D canvas for a portfolio landing
export function HeroAvatar({ avatarUrl }: { avatarUrl: string }) {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
      {/* Background glow */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-primary/30 rounded-full blur-3xl"
      />
      
      {/* Floating Container */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-full h-full rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl glass-card bg-black/40"
      >
        <img 
          src={avatarUrl} 
          alt="Avatar" 
          className="w-full h-full object-cover"
        />
        
        {/* Reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50" />
      </motion.div>

      {/* Decorative elements behind */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-10 -right-10 w-24 h-24 border border-secondary/20 rounded-full border-dashed"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-5 -left-5 w-32 h-32 border border-primary/20 rounded-full border-dashed"
      />
    </div>
  );
}
