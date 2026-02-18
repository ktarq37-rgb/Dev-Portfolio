"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Lightbulb, User, Briefcase, Settings, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Skills", href: "#skills", icon: Lightbulb },
  { name: "About", href: "#about", icon: User },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Services", href: "#services", icon: Settings },
  { name: "Contact", href: "#contact", icon: MessageCircle },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Detect active section
      const sections = navLinks.map((l) => l.href.replace("#", ""));
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
      {/* Top navbar with brand */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
      >
        <div
          className={`max-w-6xl mx-auto rounded-2xl px-5 py-2.5 flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? "bg-black/70 backdrop-blur-xl border border-white/[0.06] shadow-2xl shadow-black/40"
              : "bg-transparent border border-transparent"
          }`}
        >
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-white"
          >
            {"Hassan"}<span className="text-violet-400">{"."}</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-white bg-white/[0.06]"
                      : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            <a
              href="#contact"
              className="ml-3 px-5 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500 transition-colors shadow-lg shadow-violet-600/20"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-4 right-4 p-5 rounded-2xl bg-black/95 backdrop-blur-xl border border-white/[0.06] md:hidden flex flex-col gap-1"
            >
              {navLinks.map((link) => (
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

      {/* Bottom Dock - macOS style */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 100, damping: 20 }}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 hidden md:flex"
      >
        <div className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-zinc-900/60 backdrop-blur-2xl border border-white/[0.08] shadow-2xl shadow-black/60">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <motion.a
                key={link.name}
                href={link.href}
                aria-label={link.name}
                className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-colors duration-200 ${
                  isActive
                    ? "text-violet-400"
                    : "text-white/40 hover:text-white"
                }`}
                whileHover={{ scale: 1.3, y: -8 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Icon size={20} />
                {/* Active glow dot */}
                {isActive && (
                  <motion.div
                    layoutId="dock-indicator"
                    className="absolute -bottom-0.5 w-1 h-1 bg-violet-400 rounded-full shadow-[0_0_6px_rgba(124,58,237,0.8)]"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                {/* Tooltip */}
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  whileHover={{ opacity: 1, y: -4 }}
                  className="absolute -top-8 px-2 py-0.5 rounded-md bg-zinc-800 text-[10px] text-white/80 font-medium pointer-events-none whitespace-nowrap"
                >
                  {link.name}
                </motion.span>
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
