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

  const glowBg = useMotionTemplate`radial-gradient(350px circle at ${smoothX}px ${smoothY}px, rgba(124,58,237,0.07), transparent 60%)`;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 18,
        delay,
      }}
      whileHover={{
        scale: 1.015,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
      onMouseMove={handleMouseMove}
      className={`
        group/card relative overflow-hidden rounded-2xl
        bg-zinc-900/40 backdrop-blur-xl
        border border-white/[0.08]
        hover:border-white/[0.15]
        transition-colors duration-300
        ${className}
      `}
    >
      {/* Per-card hover glow that follows cursor */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
        style={{ background: glowBg }}
      />

      {/* Top edge shine */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

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
