"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFine, setIsFine] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 300 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 300 });

  useEffect(() => {
    // Only show on devices with a fine pointer (mouse)
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setIsFine(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleOver = () => setIsPointer(true);
    const handleOut = () => setIsPointer(false);
    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    // Detect hovering over interactive elements
    const observer = new MutationObserver(() => {
      const interactiveEls = document.querySelectorAll(
        "a, button, input, textarea, [role='button'], select, label"
      );
      interactiveEls.forEach((el) => {
        el.addEventListener("mouseenter", handleOver);
        el.addEventListener("mouseleave", handleOut);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial pass
    const interactiveEls = document.querySelectorAll(
      "a, button, input, textarea, [role='button'], select, label"
    );
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", handleOver);
      el.addEventListener("mouseleave", handleOut);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  if (!isFine) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className="rounded-full bg-white transition-transform duration-150"
          style={{
            width: isPointer ? 6 : 4,
            height: isPointer ? 6 : 4,
          }}
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className="rounded-full border border-white/60 transition-all duration-200"
          style={{
            width: isPointer ? 44 : 32,
            height: isPointer ? 44 : 32,
          }}
        />
      </motion.div>
    </>
  );
}
