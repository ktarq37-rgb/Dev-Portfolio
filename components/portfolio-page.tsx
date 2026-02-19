"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { HeroAvatar, MagneticIcon } from "@/components/hero-avatar";
import { BentoCard, BentoGrid } from "@/components/bento-grid";
import { ContactForm } from "@/components/contact-form";
import { ParticleNetwork } from "@/components/particle-network";
import { GlassCard } from "@/components/glass-card";
import {
  ArrowDown,
  Mail,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Code,
  Palette,
  Smartphone,
  Lightbulb,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Terminal,
  Settings,
  Server,
  Monitor,
  Database,
} from "lucide-react";
import type { Profile, SkillCategory, Project, Service } from "@/lib/data";

/* ---- Icon maps ---- */
const serviceIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code,
  Palette,
  Smartphone,
  Lightbulb,
};

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  Github,
  Twitter,
  Linkedin,
};

const categoryIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Terminal,
  Settings,
  Server,
  Monitor,
  Database,
};

/* ---- Fade in variant ---- */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20, delay: i * 0.08 },
  }),
};

/* ---- Projects Carousel ---- */
function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.querySelector("div")?.offsetWidth ?? 400;
    const offset = direction === "left" ? -(cardWidth + 16) : cardWidth + 16;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  }, []);

  return (
    <section id="projects" className="py-24 px-4 md:px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10"
        >
          <motion.span
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-zinc-900/40 backdrop-blur-sm text-white/60 text-xs font-medium mb-5"
          >
            <Briefcase size={14} className="text-white/50" />
            Projects
          </motion.span>

          <div className="flex items-start justify-between gap-6">
            <div>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl md:text-5xl font-sans font-bold text-white mb-3 text-balance leading-tight"
              >
                You need proof I can actually do the work?
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-white/35 text-sm md:text-base max-w-xl leading-relaxed"
              >
                These are the projects that made me forget to eat, sleep, and socialize. It was worth it.
              </motion.p>
            </div>

            {/* Navigation + See all */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="hidden md:flex flex-col items-end gap-3 shrink-0 pt-2"
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scroll("left")}
                  aria-label="Scroll left"
                  className="w-10 h-10 rounded-full border border-white/[0.08] bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-white hover:border-white/[0.15] transition-all"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scroll("right")}
                  aria-label="Scroll right"
                  className="w-10 h-10 rounded-full border border-white/[0.08] bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-white hover:border-white/[0.15] transition-all"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
              <span className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer">
                See all
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Scrollable cards row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: i * 0.1 }}
              className="snap-start shrink-0 w-[85vw] md:w-[420px]"
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="h-full"
              >
                <GlassCard className="h-full flex flex-col">
                  {/* Screenshot */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      priority
                      quality={75}
                      sizes="(max-width: 768px) 85vw, 420px"
                      className="object-cover transition-transform duration-700 ease-out group-hover/glass:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>

                  {/* Tags + title + button */}
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-mono text-white/50 rounded-lg bg-white/[0.03] border border-white/[0.08]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-white">{project.title}</h3>
                    <p className="text-sm text-white/35 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.04] backdrop-blur-sm text-white text-sm font-semibold hover:bg-violet-500/10 hover:border-violet-500/30 transition-all w-fit"
                      >
                        Visit Live Site
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Mobile navigation */}
        <div className="flex md:hidden items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-10 h-10 rounded-full border border-white/[0.08] bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-white transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-10 h-10 rounded-full border border-white/[0.08] bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-white transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <span className="text-sm text-white/50">See all</span>
        </div>
      </div>
    </section>
  );
}

/* ---- Component ---- */
interface PortfolioPageProps {
  profile: Profile;
  skillCategories: SkillCategory[];
  projects: Project[];
  services: Service[];
}

export function PortfolioPage({ profile, skillCategories, projects, services }: PortfolioPageProps) {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-black text-neutral-100 overflow-x-hidden">
      <ParticleNetwork />

      {/* Noise texture */}
      <div className="noise-bg fixed inset-0 z-0 pointer-events-none" />

      <Navbar />

      {/* ========== HERO BENTO SECTION ========== */}
      <section className="relative min-h-screen pt-24 pb-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <BentoGrid className="grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[170px] md:auto-rows-[190px]">

            {/* Hero Text -- large */}
            <BentoCard className="md:col-span-2 md:row-span-2 p-7 flex flex-col justify-center" delay={0}>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="inline-block px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold tracking-wide uppercase mb-5 w-fit"
              >
                Available for Freelance
              </motion.span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold leading-[1.1] mb-3 tracking-tight text-balance">
                <span className="text-white">{"Heyyoo! I'm"}</span>{" "}
                <span className="text-white">
                  {profile.name}
                </span>
              </h1>

              <p className="text-lg md:text-xl font-bold mb-2">
                <span className="shimmer-text">
                  {profile.title}
                </span>
              </p>

              <p className="text-sm md:text-base text-white/50 max-w-md mb-6 leading-relaxed">
                {profile.tagline}
              </p>

              <div className="flex flex-wrap gap-2.5">
                <motion.a
                  href={profile.resumeUrl}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-2.5 bg-white text-black rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-white/90 transition-colors"
                >
                  Download CV <ArrowDown size={14} />
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-white/80 font-semibold text-sm flex items-center gap-2 hover:bg-white/[0.04] hover:border-white/20 transition-all"
                >
                  {"Let's Talk"} <Mail size={14} />
                </motion.a>
              </div>
            </BentoCard>

            {/* Avatar Card */}
            <BentoCard className="md:col-span-1 lg:col-span-2 md:row-span-2 p-0 flex items-end justify-center overflow-hidden" delay={0.08}>
              <HeroAvatar avatarUrl={profile.avatarUrl} />
            </BentoCard>

            {/* Quick Skills summary */}
            <BentoCard className="md:col-span-2 lg:col-span-2 p-5" delay={0.15}>
              <h3 className="text-[10px] font-semibold text-violet-400 tracking-[0.2em] uppercase mb-3">
                Core Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Typescript", "React", "Next.js", "Node.js", "Python", "Postgres", "Tailwind", "Docker"].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 + i * 0.04, type: "spring" }}
                    whileHover={{ scale: 1.08, y: -1 }}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/60 hover:text-white hover:border-violet-500/25 transition-colors duration-200"
                  >
                    <span className="text-[11px] font-mono font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </BentoCard>

            {/* Social Links */}
            <BentoCard className="p-5 flex flex-col justify-between" delay={0.2}>
              <h3 className="text-[10px] font-semibold text-violet-400 tracking-[0.2em] uppercase mb-3">
                Connect
              </h3>
              <div className="flex gap-2">
                {profile.socialLinks.map((link) => {
                  const Icon = socialIcons[link.icon];
                  return (
                    <MagneticIcon key={link.platform} href={link.url} label={link.platform}>
                      {Icon && <Icon size={18} />}
                    </MagneticIcon>
                  );
                })}
              </div>
            </BentoCard>

            {/* Quick Services */}
            <BentoCard className="p-5" delay={0.24}>
              <h3 className="text-[10px] font-semibold text-violet-400 tracking-[0.2em] uppercase mb-3">
                Services
              </h3>
              <div className="flex flex-col gap-1.5">
                {services.slice(0, 3).map((service, i) => {
                  const Icon = serviceIconMap[service.icon] || Code;
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.08, type: "spring" }}
                      className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200"
                    >
                      <Icon size={12} className="text-violet-400 shrink-0" />
                      <span className="text-[11px]">{service.title}</span>
                    </motion.div>
                  );
                })}
              </div>
            </BentoCard>

            {/* Featured Project Cards */}
            {featuredProjects.map((project, idx) => (
              <BentoCard
                key={project.id}
                className={`${idx === 0 ? "md:col-span-2 lg:col-span-2" : "md:col-span-1 lg:col-span-2"} p-0 group`}
                delay={0.3 + idx * 0.06}
              >
                <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      priority
                      quality={75}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex gap-1.5 mb-1.5">
                          {project.tags?.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-[9px] font-mono font-semibold rounded-md bg-violet-500/15 text-violet-300 border border-violet-500/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h4 className="text-sm font-bold text-white">{project.title}</h4>
                      </div>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg border border-neutral-700 bg-neutral-900/80 backdrop-blur-sm text-white text-[11px] font-semibold flex items-center gap-1.5 hover:bg-neutral-800 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          Visit Live Site
                          <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </BentoCard>
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* ========== SKILLS SECTION (matching screenshot) ========== */}
      <section id="skills" className="py-24 px-4 md:px-6 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-white/60 text-xs font-medium mb-5"
            >
              <Lightbulb size={14} className="text-violet-400" />
              Skills
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-5xl font-sans font-bold text-white mb-3 text-balance"
            >
              What am I good at?
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-white/40 text-sm md:text-base max-w-3xl leading-relaxed">
              A set of skills and tools that help me craft digital experiences, acquired over a very long career of trial and, mostly, error.
            </motion.p>
          </motion.div>

          {/* Skills grid: 3 columns, 2 rows, "Others" spans center vertically */}
          <div className="rounded-3xl border border-white/[0.06] bg-zinc-950/30 p-3 md:p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {skillCategories.map((category, i) => {
                const Icon = categoryIconMap[category.icon] || Code;
                const isOthers = category.title === "Others";
                return (
                  <motion.div
                    key={category.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    variants={fadeUp}
                    className={isOthers ? "lg:row-span-2" : ""}
                  >
                    <motion.div
                      whileHover={{ y: -3 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="h-full"
                    >
                      <GlassCard className="p-6 h-full flex flex-col min-h-[180px]">
                        <div className="flex items-center gap-3 mb-auto">
                          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/60 shrink-0">
                            <Icon size={18} />
                          </div>
                          <h3 className="text-base font-bold text-white">{category.title}</h3>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-6">
                          {category.items.map((item) => (
                            <span
                              key={item}
                              className="px-3 py-1.5 text-xs font-mono text-white/50 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:text-white/70 hover:border-white/[0.15] transition-colors"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </GlassCard>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========== ABOUT ========== */}
      <section id="about" className="py-24 px-4 md:px-6 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-sans font-bold text-white/[0.03] mb-4 select-none"
          >
            ABOUT
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
            className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto"
          >
            {profile.bio}
          </motion.p>
        </div>
      </section>

      {/* ========== PROJECTS CAROUSEL ========== */}
      <ProjectsCarousel projects={projects} />

      {/* ========== SERVICES ========== */}
      <section id="services" className="py-24 px-4 md:px-6 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl md:text-4xl font-sans font-bold text-white mb-2"
            >
              Services
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-white/40 text-sm">
              What I can do for you
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {services.map((service, i) => {
              const Icon = serviceIconMap[service.icon] || Code;
              return (
                <motion.div
                  key={service.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                >
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <GlassCard className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-violet-400 shrink-0 group-hover/glass:text-violet-300 transition-colors">
                          <Icon size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <h3 className="text-sm font-bold text-white">{service.title}</h3>
                            <ArrowUpRight
                              size={14}
                              className="text-white/20 group-hover/glass:text-violet-400 transition-colors"
                            />
                          </div>
                          <p className="text-[12px] text-white/40 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== CONTACT ========== */}
      <section id="contact" className="py-24 px-4 md:px-6 relative">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
          >
            <h2 className="text-3xl md:text-5xl font-sans font-bold mb-5 tracking-tight text-white">
              {"Let's work"} <br />
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                together.
              </span>
            </h2>
            <p className="text-sm text-white/40 mb-8 leading-relaxed max-w-md">
              Have a project in mind? I{"'"}d love to hear about it. Reach out and let{"'"}s start a conversation.
            </p>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/[0.04] flex items-center justify-center text-violet-400 border border-white/[0.08]">
                <Mail size={18} />
              </div>
              <a
                href="mailto:hassan@example.com"
                className="text-sm text-white/70 hover:text-violet-400 transition-colors font-medium"
              >
                hassan@example.com
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.08 }}
            className="bg-zinc-900/40 backdrop-blur-xl p-7 rounded-2xl border border-white/[0.08]"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="relative pt-16 pb-0 px-4 md:px-6 overflow-hidden">
        {/* Starfield background */}
        <div className="absolute inset-0 z-0">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-px bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.4 + 0.1,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Top bordered card */}
          <div className="rounded-2xl border border-white/[0.08] bg-zinc-900/40 backdrop-blur-xl p-10 md:p-14 text-center mb-12">
            {/* Brand */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-xl font-bold text-white tracking-tight">
                {"Hassan"}<span className="text-violet-400">.</span><span className="text-blue-400">DEV</span>
              </span>
            </div>
            <p className="text-sm text-white/40">
              &copy; {new Date().getFullYear()} Hassan. All rights reserved.
            </p>
          </div>

          {/* Social icons row */}
          <div className="flex items-center justify-center flex-wrap gap-3 mb-14">
            {[
              { label: "Resume", icon: (
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
              ), href: "#" },
              { label: "WhatsApp", icon: (
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              ), href: "#" },
              { label: "Email", icon: <Mail size={20} />, href: "mailto:hassan@example.com" },
              { label: "LinkedIn", icon: <Linkedin size={20} />, href: "#" },
              { label: "GitHub", icon: <Github size={20} />, href: "#" },
              { label: "Instagram", icon: (
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z"/></svg>
              ), href: "#" },
              { label: "TikTok", icon: (
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z"/></svg>
              ), href: "#" },
              { label: "Threads", icon: (
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.17.408-2.246 1.331-3.029.878-.744 2.066-1.173 3.348-1.206 1.07-.028 2.047.13 2.91.462-.04-.96-.24-1.71-.6-2.244-.47-.7-1.26-1.06-2.35-1.06h-.07c-.795.02-1.45.268-1.943.74l-1.39-1.49c.81-.754 1.868-1.163 3.15-1.217h.12c1.725 0 3.07.605 3.895 1.75.7.97 1.07 2.29 1.1 3.924l.003.186c.68.3 1.27.677 1.76 1.13 1.06.975 1.74 2.27 1.97 3.74.257 1.64-.015 3.457-1.19 5.02-1.57 2.09-4.063 3.134-7.424 3.1Zm-.09-5.666c1.077-.054 1.835-.457 2.318-1.06.542-.677.876-1.634.994-2.846a7.592 7.592 0 0 0-2.14-.325c-.836.02-1.538.213-2.03.558-.438.307-.648.7-.622 1.168.037.67.504 1.407 1.48 2.042.312.194.686.37 1.084.452l-.084.011Z"/></svg>
              ), href: "#" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/[0.08] bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-white hover:border-violet-500/30 hover:bg-violet-500/10 transition-all duration-300"
              >
                {item.icon}
              </a>
            ))}
          </div>

          {/* Contact info grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pb-16">
            <div>
              <p className="text-[11px] font-semibold text-white/30 tracking-[0.15em] uppercase mb-2">Email</p>
              <a href="mailto:hassan@example.com" className="text-sm text-white/80 hover:text-white transition-colors">
                hassan@example.com
              </a>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-white/30 tracking-[0.15em] uppercase mb-2">Phone</p>
              <p className="text-sm text-white/80">+62 822-2111-9674</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-white/30 tracking-[0.15em] uppercase mb-2">Location</p>
              <p className="text-sm text-white/80 leading-relaxed">
                Jl. Lamtoro No.16E Romang<br />
                Lompoa Kec. Bontomarannu<br />
                Kabupaten Gowa, Sulawesi Selatan<br />
                92171, Indonesia
              </p>
            </div>
          </div>
        </div>

        {/* Bottom glowing gradient line */}
        <div className="relative h-1 w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/80 to-transparent blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        </div>
      </footer>
    </div>
  );
}
