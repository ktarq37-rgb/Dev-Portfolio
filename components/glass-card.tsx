"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect, type ReactNode, type MouseEvent } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || window.innerWidth < 768);
  }, []);

  const smoothX = useSpring(mouseX, { stiffness: 400, damping: 40 });
  const smoothY = useSpring(mouseY, { stiffness: 400, damping: 40 });

  const glowBg = useMotionTemplate`radial-gradient(300px circle at ${smoothX}px ${smoothY}px, rgba(124,58,237,0.06), transparent 60%)`;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group/glass relative overflow-hidden rounded-2xl bg-zinc-900/50 backdrop-blur-2xl border border-white/[0.08] hover:border-white/[0.16] shadow-[0_2px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all duration-300 ${className}`}
    >
      {/* Mouse-tracking spotlight glow - desktop only */}
      {!isTouch && (
        <motion.div
          className="pointer-events-none absolute -inset-px z-0 rounded-2xl opacity-0 group-hover/glass:opacity-100 transition-opacity duration-500"
          style={{ background: glowBg }}
        />
      )}

      {/* Top edge shine */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
