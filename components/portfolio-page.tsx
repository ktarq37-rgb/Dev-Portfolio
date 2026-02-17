"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { HeroAvatar, MagneticIcon } from "@/components/hero-avatar";
import { BentoCard, BentoGrid } from "@/components/bento-grid";
import { ContactForm } from "@/components/contact-form";
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
} from "lucide-react";
import {
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiPostgresql,
  SiTailwindcss,
  SiDocker,
} from "react-icons/si";
import type { Profile, Skill, Project, Service } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code,
  Palette,
  Smartphone,
  Lightbulb,
};

const techIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  React: SiReact,
  TypeScript: SiTypescript,
  "Node.js": SiNodedotjs,
  PostgreSQL: SiPostgresql,
  "Tailwind CSS": SiTailwindcss,
  Docker: SiDocker,
};

interface PortfolioPageProps {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  services: Service[];
}

export function PortfolioPage({
  profile,
  skills,
  projects,
  services,
}: PortfolioPageProps) {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#050505] text-foreground overflow-x-hidden">
      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 opacity-[0.015] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ambient gradient */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none z-0" />

      <Navbar />

      {/* --- BENTO GRID HERO --- */}
      <section className="relative min-h-screen pt-24 pb-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <BentoGrid className="grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px]">
            {/* Hero Text - Large Card */}
            <BentoCard
              className="md:col-span-2 lg:col-span-2 md:row-span-2 p-8 flex flex-col justify-center"
              delay={0}
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="inline-block px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-bold mb-6 w-fit"
              >
                Available for Freelance
              </motion.span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[0.95] mb-4 tracking-tight">
                <span className="text-foreground">{"HI, I'M"}</span> <br />
                <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  {profile.name.toUpperCase()}
                </span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground max-w-md mb-6 leading-relaxed">
                {profile.title}
              </p>

              <div className="flex flex-wrap gap-3">
                <motion.a
                  href={profile.resumeUrl}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  }}
                  className="px-6 py-3 bg-foreground text-background rounded-full font-bold text-sm flex items-center gap-2 hover:bg-foreground/90"
                >
                  Download CV <ArrowDown size={16} />
                </motion.a>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  }}
                  className="px-6 py-3 rounded-full border border-white/20 text-foreground font-bold text-sm flex items-center gap-2 hover:bg-white/5"
                >
                  {"Let's Talk"} <Mail size={16} />
                </motion.a>
              </div>
            </BentoCard>

            {/* Avatar Card */}
            <BentoCard
              className="md:col-span-1 lg:col-span-2 md:row-span-2 p-0 flex items-end justify-center overflow-hidden"
              delay={0.1}
            >
              <HeroAvatar avatarUrl={profile.avatarUrl} />
            </BentoCard>

            {/* Tech Stack Card */}
            <BentoCard className="md:col-span-2 lg:col-span-2 p-6" delay={0.2}>
              <h3 className="text-xs font-bold text-purple-400 tracking-widest uppercase mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.slice(0, 8).map((skill, i) => {
                  const IconComponent = techIcons[skill.name];
                  return (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.3 + i * 0.05,
                        type: "spring",
                      }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/5 text-white/70 hover:text-foreground hover:border-purple-500/30 transition-colors"
                    >
                      {IconComponent && (
                        <IconComponent className="w-4 h-4" />
                      )}
                      <span className="text-xs font-medium">{skill.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </BentoCard>

            {/* Social Links Card */}
            <BentoCard
              className="md:col-span-1 lg:col-span-1 p-6 flex flex-col justify-between"
              delay={0.25}
            >
              <h3 className="text-xs font-bold text-purple-400 tracking-widest uppercase mb-4">
                Connect
              </h3>
              <div className="flex gap-3">
                <MagneticIcon href="https://github.com" label="GitHub">
                  <Github size={20} />
                </MagneticIcon>
                <MagneticIcon href="https://linkedin.com" label="LinkedIn">
                  <Linkedin size={20} />
                </MagneticIcon>
                <MagneticIcon href="https://twitter.com" label="Twitter">
                  <Twitter size={20} />
                </MagneticIcon>
              </div>
            </BentoCard>

            {/* Services Card */}
            <BentoCard className="md:col-span-1 lg:col-span-1 p-6" delay={0.3}>
              <h3 className="text-xs font-bold text-purple-400 tracking-widest uppercase mb-4">
                Services
              </h3>
              <div className="space-y-2">
                {services.slice(0, 3).map((service, i) => {
                  const IconComp = iconMap[service.icon] || Code;
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                      className="flex items-center gap-2 text-white/60 hover:text-foreground transition-colors"
                    >
                      <IconComp size={14} className="text-purple-400" />
                      <span className="text-xs">{service.title}</span>
                    </motion.div>
                  );
                })}
              </div>
            </BentoCard>

            {/* Featured Project 1 */}
            {featuredProjects[0] && (
              <BentoCard
                className="md:col-span-2 lg:col-span-2 p-0 group"
                delay={0.35}
              >
                <div className="relative w-full h-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featuredProjects[0].imageUrl}
                    alt={featuredProjects[0].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex gap-2 mb-2">
                      {featuredProjects[0].tags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-1">
                      {featuredProjects[0].title}
                    </h4>
                    <p className="text-xs text-white/60 line-clamp-2">
                      {featuredProjects[0].description}
                    </p>
                  </div>
                  {featuredProjects[0].liveUrl && (
                    <a
                      href={featuredProjects[0].liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </BentoCard>
            )}

            {/* Featured Project 2 */}
            {featuredProjects[1] && (
              <BentoCard
                className="md:col-span-1 lg:col-span-2 p-0 group"
                delay={0.4}
              >
                <div className="relative w-full h-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featuredProjects[1].imageUrl}
                    alt={featuredProjects[1].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex gap-2 mb-2">
                      {featuredProjects[1].tags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-1">
                      {featuredProjects[1].title}
                    </h4>
                    <p className="text-xs text-white/60 line-clamp-2">
                      {featuredProjects[1].description}
                    </p>
                  </div>
                  {featuredProjects[1].liveUrl && (
                    <a
                      href={featuredProjects[1].liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </BentoCard>
            )}
          </BentoGrid>

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="mt-16 max-w-3xl mx-auto text-center"
          >
            <h2 className="text-6xl md:text-8xl font-display font-bold text-white/5 mb-6">
              ABOUT
            </h2>
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-light">
              {profile.bio}
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24 px-4 md:px-6 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight text-foreground">
              {"Let's work"} <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                together.
              </span>
            </h2>
            <p className="text-lg text-white/60 mb-10 leading-relaxed">
              Have a project in mind? Looking for a partner to help build your
              next big idea? Reach out and let{"'"}s start a conversation.
            </p>

            <div className="flex items-center gap-4 text-lg">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-purple-400 border border-white/10">
                <Mail size={24} />
              </div>
              <a
                href="mailto:hello@example.com"
                className="hover:text-purple-400 transition-colors font-medium text-foreground"
              >
                hello@example.com
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: 0.1,
            }}
            className="backdrop-blur-xl bg-white/[0.03] p-8 rounded-3xl border border-white/[0.08]"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 text-center text-white/40 border-t border-white/5">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} {profile.name}. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
