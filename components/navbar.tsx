"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { name: "Skills", href: "#skills" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
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
          {"Hassan"}<span className="text-violet-400">{"."}</span><span className="text-blue-400">{"DEV"}</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-sm text-white/50 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
          <ThemeToggle />
          <a
            href="#contact"
            className="rotating-border ml-2 px-5 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500 transition-colors shadow-lg shadow-violet-600/20"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile */}
        <button
          className="md:hidden text-foreground p-1"
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
            className="absolute top-16 left-4 right-4 p-5 rounded-2xl bg-black/95 backdrop-blur-xl border border-neutral-800 md:hidden flex flex-col gap-1"
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
  );
}
