"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";

export function HeroAvatar({ avatarUrl }: { avatarUrl: string }) {
  return (
    <div className="relative w-64 h-72 md:w-72 md:h-80 lg:w-[340px] lg:h-[380px] mx-auto flex items-end justify-center">
      {/* Background glow */}
      <motion.div
        animate={{
          opacity: [0.3, 0.55, 0.3],
          scale: [1, 1.03, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(124,58,237,0.35) 0%, transparent 65%)",
        }}
      />

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full relative z-10"
      >
        <Image
          src={avatarUrl}
          alt="Developer avatar"
          fill
          sizes="(max-width: 768px) 256px, (max-width: 1024px) 288px, 340px"
          className="object-contain object-bottom drop-shadow-[0_0_30px_rgba(124,58,237,0.4)]"
          priority
        />
      </motion.div>

      {/* Orbiting ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-8 -right-2 w-12 h-12 border border-violet-500/20 rounded-full border-dashed"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-violet-400 rounded-full" />
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -left-2 w-14 h-14 border border-cyan-500/20 rounded-full border-dashed"
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full" />
      </motion.div>
    </div>
  );
}

export function MagneticIcon({
  children,
  href,
  label,
}: {
  children: ReactNode;
  href: string;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="relative w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/50 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10 transition-colors duration-200"
      whileHover={{ scale: 1.12, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.a>
  );
}
