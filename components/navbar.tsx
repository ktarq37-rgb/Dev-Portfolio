"use client";

import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Home,
  Lightbulb,
  User,
  FolderOpen,
  Layers,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const dockItems = [
  { name: "Home", href: "#", icon: Home },
  { name: "Skills", href: "#skills", icon: Lightbulb },
  { name: "About", href: "#about", icon: User },
  { name: "Projects", href: "#projects", icon: FolderOpen },
  { name: "Services", href: "#services", icon: Layers },
  { name: "Contact", href: "#contact", icon: Mail },
];

const DOCK_ICON_SIZE = 40;
const DOCK_MAGNIFICATION = 60;
const DOCK_DISTANCE = 120;

function DockIcon({
  item,
  mouseX,
  isActive,
}: {
  item: (typeof dockItems)[0];
  mouseX: ReturnType<typeof useMotionValue<number>>;
  isActive: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distance,
    [-DOCK_DISTANCE, 0, DOCK_DISTANCE],
    [DOCK_ICON_SIZE, DOCK_MAGNIFICATION, DOCK_ICON_SIZE]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const Icon = item.icon;

  return (
    <motion.a
      ref={ref}
      href={item.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.85, y: 4 }}
      className="relative flex flex-col items-center"
      aria-label={item.name}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute -top-9 px-2.5 py-1 rounded-lg bg-black/90 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-white whitespace-nowrap pointer-events-none"
          >
            {item.name}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Icon container */}
      <motion.div
        style={{ width, height: width }}
        className="flex items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.1] hover:border-white/[0.15] transition-colors duration-200"
      >
        <Icon size={18} />
      </motion.div>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="dock-active"
          className="absolute -bottom-2 w-1 h-1 rounded-full bg-violet-400"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}
    </motion.a>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = dockItems
        .map((item) => item.href.replace("#", ""))
        .filter(Boolean);
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top bar: branding + Hire Me (desktop) + hamburger (mobile) */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
      >
        <div
          className={`max-w-6xl mx-auto rounded-2xl px-5 py-2.5 flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? "bg-black/80 backdrop-blur-xl border border-neutral-800 shadow-2xl shadow-black/40"
              : "bg-transparent border border-transparent"
          }`}
        >
          <Link
            href="/"
            className="text-lg font-bold font-display tracking-tight text-foreground"
          >
            {"Hassan"}
            <span className="text-violet-400">{"."}</span>
            <span className="text-blue-400">{"DEV"}</span>
          </Link>

          {/* Desktop: Hire Me only */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              className="rotating-border px-5 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500 transition-colors shadow-lg shadow-violet-600/20"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-foreground p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-4 right-4 p-5 rounded-2xl bg-black/95 backdrop-blur-xl border border-neutral-800 md:hidden flex flex-col gap-1"
            >
              {dockItems.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2.5 text-base text-white/70 hover:text-white hover:bg-white/[0.04] rounded-xl transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Floating Dock (desktop only) */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 100, damping: 20 }}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-end gap-2 px-3 py-2 rounded-2xl bg-black/70 backdrop-blur-2xl border border-white/[0.08] shadow-2xl shadow-black/50"
      >
        {dockItems.map((item) => (
          <DockIcon
            key={item.name}
            item={item}
            mouseX={mouseX}
            isActive={
              item.href === "#"
                ? activeSection === ""
                : activeSection === item.href.replace("#", "")
            }
          />
        ))}
      </motion.div>
    </>
  );
}
