"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Lightbulb,
  User,
  FolderOpen,
  Layers,
  Mail,
  Menu,
  X,
  FileText,
  Phone,
} from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

const dockItems = [
  { name: "Home", href: "#", icon: Home },
  { name: "Skills", href: "#skills", icon: Lightbulb },
  { name: "About", href: "#about", icon: User },
  { name: "Projects", href: "#projects", icon: FolderOpen },
  { name: "Services", href: "#services", icon: Layers },
  { name: "Contact", href: "#contact", icon: Mail },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

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
      {/* ===== TOP NAVBAR ===== */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-3"
      >
        <div
          className={`max-w-6xl mx-auto rounded-2xl px-5 py-2.5 flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? "bg-black/80 backdrop-blur-xl border border-neutral-800 shadow-2xl shadow-black/40"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* Brand */}
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-white"
          >
            {"Hassan"}<span className="text-violet-400">{"."}</span><span className="text-blue-400">{"DEV"}</span>
          </Link>

          {/* Desktop: center text nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  activeSection === link.href.replace("#", "")
                    ? "text-white"
                    : "text-white/45 hover:text-white/80"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop: right side icons + CTA */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/[0.06] transition-all duration-200"
            >
              <FileText size={17} />
            </a>
            <a
              href="https://wa.me/249114610204"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/[0.06] transition-all duration-200"
            >
              <Phone size={17} />
            </a>
            <a
              href="#contact"
              className="rotating-border ml-1 px-5 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500 transition-colors shadow-lg shadow-violet-600/20"
            >
              Book a call
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
              <div className="mt-2 pt-3 border-t border-white/[0.06] flex items-center gap-2">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white/40 hover:text-white bg-white/[0.04]"
                >
                  <FileText size={18} />
                </a>
                <a
                  href="https://wa.me/249114610204"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white/40 hover:text-white bg-white/[0.04]"
                >
                  <Phone size={18} />
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="rotating-border ml-auto px-5 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold"
                >
                  Book a call
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ===== BOTTOM DOCK (desktop only) ===== */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 100, damping: 20 }}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1.5 px-2.5 py-2 rounded-2xl bg-black/70 backdrop-blur-2xl border border-white/[0.08] shadow-2xl shadow-black/50"
      >
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "#"
              ? activeSection === ""
              : activeSection === item.href.replace("#", "");

          return (
            <motion.a
              key={item.name}
              href={item.href}
              aria-label={item.name}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200 ${
                isActive
                  ? "bg-white/[0.1] text-white border border-white/[0.12]"
                  : "bg-white/[0.04] text-white/50 border border-white/[0.06] hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              <Icon size={18} />
              {isActive && (
                <motion.div
                  layoutId="dock-dot"
                  className="absolute -bottom-2.5 w-1 h-1 rounded-full bg-violet-400"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </motion.a>
          );
        })}
      </motion.div>
    </>
  );
}
