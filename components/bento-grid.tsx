"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function BentoCard({ children, className = "", delay = 0 }: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const smoothY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  const glowBg = useMotionTemplate`radial-gradient(450px circle at ${smoothX}px ${smoothY}px, rgba(124,58,237,0.1), transparent 60%)`;
  const borderGlow = useMotionTemplate`radial-gradient(350px circle at ${smoothX}px ${smoothY}px, rgba(124,58,237,0.25), rgba(59,130,246,0.12) 50%, transparent 80%)`;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 16,
        delay,
      }}
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
      onMouseMove={handleMouseMove}
      className={`
        group/card relative overflow-hidden rounded-2xl
        bg-zinc-900/40 backdrop-blur-xl
        transition-all duration-300
        ${className}
      `}
    >
      {/* Gradient border overlay */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.08] group-hover/card:border-white/[0.15] transition-colors duration-300 pointer-events-none z-20" />

      {/* Animated gradient border glow on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-10 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
        style={{ background: borderGlow }}
      />

      {/* Per-card hover glow that follows cursor */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
        style={{ background: glowBg }}
      />

      {/* Top edge shine */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-20" />

      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

export function BentoGrid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`grid gap-3 md:gap-4 ${className}`}>{children}</div>;
}
