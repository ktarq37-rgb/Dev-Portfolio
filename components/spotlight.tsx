"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function Spotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY + window.scrollY });
      setOpacity(1);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-500 overflow-hidden"
      style={{ opacity }}
    >
      <div
        className="absolute h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: position.x,
          top: position.y,
          background:
            "radial-gradient(circle, rgba(124,58,237,0.07) 0%, rgba(59,130,246,0.03) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}
