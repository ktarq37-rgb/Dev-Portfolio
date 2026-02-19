"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 400, damping: 40 });
  const smoothY = useSpring(mouseY, { stiffness: 400, damping: 40 });

  const glowBg = useMotionTemplate`radial-gradient(300px circle at ${smoothX}px ${smoothY}px, rgba(124,58,237,0.06), transparent 60%)`;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group/glass relative overflow-hidden rounded-2xl bg-zinc-900/40 backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.15] transition-colors duration-300 ${className}`}
    >
      {/* Mouse-tracking spotlight glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 rounded-2xl opacity-0 group-hover/glass:opacity-100 transition-opacity duration-500"
        style={{ background: glowBg }}
      />

      {/* Top edge shine */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
