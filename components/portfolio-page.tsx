"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { HeroAvatar, MagneticIcon } from "@/components/hero-avatar";
import { BentoCard, BentoGrid } from "@/components/bento-grid";
import { ContactForm } from "@/components/contact-form";
import { Spotlight } from "@/components/spotlight";
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
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiPostgresql,
  SiTailwindcss,
  SiFigma,
  SiDocker,
} from "react-icons/si";
import type { Profile, Skill, Project, Service } from "@/lib/data";

/* ---- Icon Mappings ---- */
const serviceIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code,
  Palette,
  Smartphone,
  Lightbulb,
};

const techIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "Node.js": SiNodedotjs,
  PostgreSQL: SiPostgresql,
  "Tailwind CSS": SiTailwindcss,
  Figma: SiFigma,
  Docker: SiDocker,
};

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  Github,
  Twitter,
  Linkedin,
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

/* ---- Component ---- */
interface PortfolioPageProps {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  services: Service[];
}

export function PortfolioPage({ profile, skills, projects, services }: PortfolioPageProps) {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-slate-950 text-foreground overflow-x-hidden">
      <Spotlight />

      {/* Noise texture */}
      <div className="noise-bg fixed inset-0 z-0 pointer-events-none" />

      {/* Subtle dot grid */}
      <div className="fixed inset-0 pointer-events-none z-0 grid-bg" />

      {/* Ambient glow top */}
      <div className="fixed top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-violet-600/[0.07] rounded-full blur-[120px] pointer-events-none z-0" />

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

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-[1] mb-3 tracking-tight text-balance">
                <span className="text-white/90">{"Hi, I'm"}</span>{" "}
                <span className="bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
                  {profile.name}
                </span>
              </h1>

              <p className="text-sm md:text-base text-white/50 max-w-md mb-6 leading-relaxed">
                {profile.title}
              </p>

              <div className="flex flex-wrap gap-2.5">
                <motion.a
                  href={profile.resumeUrl}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-2.5 bg-white text-slate-950 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-white/90 transition-colors"
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

            {/* Tech Stack */}
            <BentoCard className="md:col-span-2 lg:col-span-2 p-5" delay={0.15}>
              <h3 className="text-[10px] font-semibold text-violet-400 tracking-[0.2em] uppercase mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => {
                  const Icon = techIconMap[skill.name];
                  return (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.25 + i * 0.04, type: "spring" }}
                      whileHover={{ scale: 1.08, y: -1 }}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/60 hover:text-white hover:border-violet-500/25 transition-colors duration-200"
                    >
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                      <span className="text-[11px] font-medium">{skill.name}</span>
                    </motion.div>
                  );
                })}
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

            {/* Quick Stats / Services */}
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
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex gap-1.5 mb-1.5">
                      {project.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[9px] font-semibold rounded-md bg-violet-500/15 text-violet-300 border border-violet-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-sm font-bold text-white mb-0.5">{project.title}</h4>
                    <p className="text-[11px] text-white/50 line-clamp-1">{project.description}</p>
                  </div>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </BentoCard>
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* ========== ABOUT ========== */}
      <section id="about" className="py-24 px-4 md:px-6 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-display font-bold text-white/[0.03] mb-4 select-none"
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

      {/* ========== ALL PROJECTS ========== */}
      <section id="projects" className="py-24 px-4 md:px-6 relative">
        <div className="absolute top-0 right-[-200px] w-[600px] h-[600px] bg-violet-600/[0.04] rounded-full blur-[150px] pointer-events-none" />
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
              className="text-3xl md:text-4xl font-display font-bold text-white mb-2"
            >
              Projects
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-white/40 text-sm">
              A selection of recent work
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="group relative rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/[0.06] hover:border-violet-500/25 overflow-hidden transition-colors duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {(project.liveUrl || project.repoUrl) && (
                      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                          >
                            <Github size={14} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex gap-1.5 mb-2">
                      {project.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[9px] font-semibold rounded-md bg-white/[0.04] text-white/50 border border-white/[0.06]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">{project.title}</h3>
                    <p className="text-[12px] text-white/40 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              className="text-3xl md:text-4xl font-display font-bold text-white mb-2"
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
                    className="group relative p-6 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/[0.06] hover:border-violet-500/25 transition-colors duration-300"
                  >
                    {/* Top shine */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0 group-hover:bg-violet-500/15 transition-colors">
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <h3 className="text-sm font-bold text-white">{service.title}</h3>
                          <ArrowUpRight
                            size={14}
                            className="text-white/20 group-hover:text-violet-400 transition-colors"
                          />
                        </div>
                        <p className="text-[12px] text-white/40 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== CONTACT ========== */}
      <section id="contact" className="py-24 px-4 md:px-6 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/[0.05] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-5 tracking-tight text-white">
              {"Let's work"} <br />
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                together.
              </span>
            </h2>
            <p className="text-sm text-white/40 mb-8 leading-relaxed max-w-md">
              Have a project in mind? I{"'"}d love to hear about it. Reach out and let{"'"}s start a conversation.
            </p>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/[0.04] flex items-center justify-center text-violet-400 border border-white/[0.06]">
                <Mail size={18} />
              </div>
              <a
                href="mailto:hello@example.com"
                className="text-sm text-white/70 hover:text-violet-400 transition-colors font-medium"
              >
                hello@example.com
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.08 }}
            className="backdrop-blur-xl bg-white/[0.02] p-7 rounded-2xl border border-white/[0.06]"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-8 text-center text-white/30 border-t border-white/[0.04]">
        <p className="text-xs">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
