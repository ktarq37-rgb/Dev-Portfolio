"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  Mail,
  MapPin,
  Globe,
  GraduationCap,
  Briefcase,
  Code,
  Server,
  Database,
  Cloud,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const coreCompetencies = [
  "SaaS Architecture & MVP Development",
  "REST & GraphQL API Design",
  "Scalable Backend Systems",
  "Authentication & Authorization (JWT)",
  "Database Design & Optimization",
  "Real-time Applications",
  "Cloud Deployment & DevOps",
  "Performance Optimization",
  "Secure Application Development",
];

const skillGroups = [
  {
    label: "Frontend",
    icon: Code,
    items: ["React", "Next.js", "TailwindCSS", "TypeScript"],
  },
  {
    label: "Backend",
    icon: Server,
    items: ["Node.js", "Express.js", "FastAPI", "Fiber", "Apollo GraphQL"],
  },
  {
    label: "Databases",
    icon: Database,
    items: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
  },
  {
    label: "Cloud & DevOps",
    icon: Cloud,
    items: ["Docker", "AWS"],
  },
];

const projects = [
  {
    title: "TravelHub",
    subtitle: "Travel Booking Platform",
    bullets: [
      "Built responsive frontend using Next.js and TailwindCSS",
      "Structured scalable backend logic",
      "Designed clean database models",
      "Optimized performance and deployed production-ready application",
    ],
  },
  {
    title: "BeautyGlow",
    subtitle: "E-commerce Beauty Platform",
    bullets: [
      "Built dynamic product catalog with modern UI",
      "Implemented cart and checkout logic",
      "Structured scalable backend-ready system",
      "Designed fully responsive interface",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, type: "spring", stiffness: 120, damping: 18 },
  }),
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function CvPage() {
  const handlePrint = () => window.print();

  return (
    <div className="relative min-h-screen bg-background">
      {/* Subtle background glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Top action bar -- hidden when printing */}
      <div className="print:hidden sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-white/[0.06]">
        <div className="mx-auto max-w-[860px] flex items-center justify-between px-6 py-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            <Download size={14} />
            Download as PDF
          </button>
        </div>
      </div>

      {/* CV body */}
      <main className="relative z-10 mx-auto max-w-[860px] px-6 py-10 md:py-16 print:py-0 print:px-0 print:max-w-none">
        {/* ── Header ── */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="mb-10 md:mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
            Hassan
          </h1>
          <p className="text-lg md:text-xl font-semibold mb-4">
            <span className="shimmer-text">Fullstack Web Developer</span>
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/50">
            <span className="flex items-center gap-1.5">
              <Mail size={14} className="text-white/40" />
              hassandev@contact.me
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-white/40" />
              Sudan
            </span>
            <span className="flex items-center gap-1.5">
              <Globe size={14} className="text-white/40" />
              hassan.dev
            </span>
          </div>
        </motion.header>

        <Divider />

        {/* ── Professional Summary ── */}
        <Section title="Professional Summary" index={1}>
          <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-2xl">
            Fullstack Web Developer specialized in building scalable web
            applications, SaaS platforms, and production-ready systems.
            Experienced in designing end-to-end solutions from frontend
            interfaces to backend architecture and cloud deployment. Strong
            focus on performance optimization, clean system design, and secure
            application development.
          </p>
        </Section>

        <Divider />

        {/* ── Core Competencies ── */}
        <Section title="Core Competencies" index={2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {coreCompetencies.map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 text-sm text-white/70"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500/60" />
                {item}
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* ── Technical Skills ── */}
        <Section title="Technical Skills" index={3}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skillGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div key={group.label}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.08]">
                      <Icon size={14} className="text-white/60" />
                    </div>
                    <h4 className="text-sm font-semibold text-white/90">
                      {group.label}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 text-xs font-medium text-white/80 rounded-lg bg-white/[0.04] border border-white/[0.08] print:border-white/20 print:text-black/70"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        <Divider />

        {/* ── Projects ── */}
        <Section title="Projects" index={4}>
          <div className="flex flex-col gap-8">
            {projects.map((project) => (
              <div key={project.title}>
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase size={14} className="text-violet-400/60" />
                  <h4 className="text-base font-bold text-white">
                    {project.title}
                  </h4>
                  <span className="text-xs text-white/40">
                    {"/"} {project.subtitle}
                  </span>
                </div>
                <ul className="ml-5 mt-2 flex flex-col gap-1.5">
                  {project.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-white/65"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/20" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* ── Education ── */}
        <Section title="Education" index={5}>
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] shrink-0">
              <GraduationCap size={16} className="text-violet-400/70" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white leading-snug">
                {"Bachelor's Degree in Information Security"}
              </h4>
              <p className="text-sm text-white/50 mt-0.5">
                Sudan International University
              </p>
            </div>
          </div>
        </Section>

        {/* Footer note -- screen only */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 mb-8 text-center text-xs text-white/25 print:hidden"
        >
          {"Hassan"}<span className="text-violet-400/50">.</span>
          <span className="shimmer-dev">DEV</span>
          {" "}
          {"// "}Built with Next.js & TailwindCSS
        </motion.p>
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared sub-components                                              */
/* ------------------------------------------------------------------ */

function Section({
  title,
  index,
  children,
}: {
  title: string;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      custom={index}
      variants={fadeUp}
      className="py-6 md:py-8 print:py-4"
    >
      <h3 className="text-lg font-bold text-white mb-4 tracking-tight">
        {title}
      </h3>
      {children}
    </motion.section>
  );
}

function Divider() {
  return <div className="h-px bg-white/[0.06] print:bg-black/10" />;
}
