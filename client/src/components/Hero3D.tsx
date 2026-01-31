import { motion } from "framer-motion";

export function HeroAvatar({ avatarUrl }: { avatarUrl: string }) {
  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
      {/* Outer pulse ring */}
      <motion.div
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-3xl border-2 border-primary/40"
      />
      
      {/* Secondary pulse ring */}
      <motion.div
        animate={{ 
          scale: [1, 1.25, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute inset-0 rounded-3xl border border-secondary/30"
      />

      {/* Background glow */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-br from-primary/40 via-purple-500/30 to-secondary/30 rounded-3xl blur-3xl"
      />
      
      {/* Floating Container with enhanced animation */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotateZ: [0, 1, -1, 0],
          rotateX: [0, 2, -2, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1]
        }}
        className="relative z-10 w-full h-full rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(10,10,10,0.9) 0%, rgba(20,20,20,0.8) 100%)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Inner pulse ring effect */}
        <div className="pulse-ring rounded-3xl" />
        
        <img 
          src={avatarUrl} 
          alt="Hassan - Developer Avatar" 
          className="w-full h-full object-cover"
        />
        
        {/* Glass reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10" />
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
      </motion.div>

      {/* Decorative orbiting elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-8 -right-8 w-20 h-20 border border-secondary/30 rounded-full border-dashed"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-secondary rounded-full" />
      </motion.div>
      
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-6 -left-6 w-28 h-28 border border-primary/30 rounded-full border-dashed"
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full" />
      </motion.div>

      {/* Floating particles */}
      <motion.div
        animate={{ y: [-10, 10, -10], x: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -right-4 w-3 h-3 bg-primary/60 rounded-full blur-sm"
      />
      <motion.div
        animate={{ y: [10, -10, 10], x: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 -left-3 w-2 h-2 bg-secondary/60 rounded-full blur-sm"
      />
    </div>
  );
}
