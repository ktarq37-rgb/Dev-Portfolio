import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import avatarImage from "@assets/avatar-transparent.png";

export function HeroAvatar({ avatarUrl }: { avatarUrl?: string }) {
  return (
    <div className="relative w-72 h-80 md:w-80 md:h-96 lg:w-[380px] lg:h-[420px] mx-auto flex items-end justify-center">
      {/* Background glow that follows avatar outline */}
      <motion.div
        animate={{ 
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.02, 1]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at center bottom, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
        }}
      />
      
      {/* 3D Tilt Container */}
      <Tilt
        className="relative z-10 w-full h-full"
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        perspective={1000}
        scale={1.02}
        transitionSpeed={2000}
        gyroscope={true}
      >
        <motion.div
          animate={{ 
            y: [0, -12, 0],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
          }}
          className="w-full h-full relative"
        >
          {/* Avatar with breathing glow */}
          <motion.img 
            src={avatarImage}
            alt="Hassan - 3D Avatar" 
            className="w-full h-full object-contain object-bottom"
            animate={{
              filter: [
                'drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))',
                'drop-shadow(0 0 40px rgba(168, 85, 247, 0.7))',
                'drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))',
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </Tilt>

      {/* Decorative orbiting elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 -right-4 w-14 h-14 border border-purple-500/30 rounded-full border-dashed"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-500 rounded-full" />
      </motion.div>
      
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -left-4 w-16 h-16 border border-cyan-500/30 rounded-full border-dashed"
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-500 rounded-full" />
      </motion.div>

      {/* Floating particles */}
      <motion.div
        animate={{ y: [-8, 8, -8], x: [0, 4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-0 w-2 h-2 bg-purple-400/80 rounded-full blur-[1px]"
      />
      <motion.div
        animate={{ y: [8, -8, 8], x: [0, -4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-1/2 left-0 w-1.5 h-1.5 bg-cyan-400/80 rounded-full blur-[1px]"
      />
    </div>
  );
}

// Magnetic Icon Component for social links
export function MagneticIcon({ 
  children, 
  href, 
  label 
}: { 
  children: React.ReactNode; 
  href: string; 
  label: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-colors"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.a>
  );
}
