import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroAvatar } from "@/components/Hero3D";
import { ProjectCard } from "@/components/ProjectCard";
import { ServiceCard } from "@/components/ServiceCard";
import { ContactForm } from "@/components/ContactForm";
import { useProfile, useProjects, useSkills, useServices } from "@/hooks/use-portfolio";
import { ArrowDown, Mail } from "lucide-react";

export default function Home() {
  const { data: profile } = useProfile();
  const { data: projects } = useProjects();
  const { data: skills } = useSkills();
  const { data: services } = useServices();

  const aboutRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });
  
  const aboutOpacity = useTransform(aboutProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const aboutY = useTransform(aboutProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -60]);

  if (!profile) return (
    <div className="min-h-screen bg-background flex items-center justify-center text-white noise-bg grid-bg">
      <div className="flex flex-col items-center gap-4 relative z-10">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground font-mono text-sm tracking-wider">Initializing Portfolio...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden noise-bg">
      {/* Grid background pattern */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0" />
      
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-background to-background z-0" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold mb-8 backdrop-blur-sm"
            >
              Available for Freelance
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] mb-6 tracking-tighter">
              <span className="text-white">HI, I'M</span> <br />
              <span className="text-gradient">{profile.name.toUpperCase()}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-lg mb-10 leading-relaxed">
              {profile.title}. {profile.bio.split('.')[0]}.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={profile.resumeUrl} 
                className="border-beam glow-border relative px-8 py-4 bg-[#0a0a0a] rounded-full font-bold text-white group transition-all inline-flex items-center justify-center gap-2"
                data-testid="button-download-cv"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Download CV <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
                </span>
              </a>
              
              <a 
                href="#contact"
                className="px-8 py-4 rounded-full border border-white/10 text-white font-bold hover:bg-white/5 hover:border-white/20 transition-all flex items-center justify-center gap-2"
                data-testid="button-contact"
              >
                Let's Talk <Mail size={18} />
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:block"
          >
            <HeroAvatar avatarUrl={profile.avatarUrl} />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-light">Scroll</span>
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 h-12 rounded-full bg-gradient-to-b from-primary via-primary/50 to-transparent"
          />
        </motion.div>
      </section>

      {/* --- TECH STACK (Marquee) --- */}
      <section className="py-20 border-y border-white/5 bg-black/60 backdrop-blur-sm overflow-hidden relative">
        <div className="flex gap-8 animate-infinite-scroll min-w-max">
          {[...(skills || []), ...(skills || [])].map((skill, i) => (
            <div 
              key={`${skill.name}-${i}`} 
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/5 text-white/70 hover:text-white hover:border-primary/40 hover:bg-white/10 transition-all duration-300"
              data-testid={`badge-skill-${skill.id}-${i}`}
            >
              <span className="font-mono text-base font-semibold tracking-wide">{skill.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* --- SERVICES --- */}
      <section id="services" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24"
          >
            <h2 className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-4">What I Do</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tight">Services & Expertise</h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services?.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJECTS (Sticky Stack) --- */}
      <section id="projects" className="py-32 px-6 bg-gradient-to-b from-background via-secondary/5 to-background relative">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24 text-center"
          >
            <h2 className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-4">Portfolio</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tight">Selected Works</h3>
          </motion.div>

          <div className="relative">
            {projects?.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                total={projects.length} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT (Scroll Reveal) --- */}
      <section id="about" className="py-32 px-6 relative overflow-hidden" ref={aboutRef}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div style={{ opacity: aboutOpacity, y: aboutY }}>
            <h2 className="text-7xl md:text-9xl font-display font-bold text-white/5 mb-8 tracking-tighter">ABOUT</h2>
            <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed font-light text-foreground/90 tracking-tight">
              {profile.bio}
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="py-32 px-6 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] -z-10" />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-24">
          <div>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tight">
              Let's work <br />
              <span className="text-gradient-accent">together.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Have a project in mind? Looking for a partner to help build your next big idea? Reach out and let's start a conversation.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-lg">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/10">
                  <Mail size={24} />
                </div>
                <a href="mailto:hello@example.com" className="hover:text-primary transition-colors font-medium">
                  hello@example.com
                </a>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 md:p-10 rounded-3xl border border-white/10">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-10 text-center text-muted-foreground border-t border-white/5 relative z-10">
        <p className="text-sm tracking-wide">&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}
