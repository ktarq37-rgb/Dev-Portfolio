import { motion } from "framer-motion";
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

  // Loading skeleton could be added here, but for simplicity returning null for critical data
  if (!profile) return (
    <div className="min-h-screen bg-background flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground font-mono text-sm">Initializing Portfolio...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-bold mb-6">
              Available for Freelance
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] mb-6">
              HI, I'M <br />
              <span className="text-gradient tracking-tight">{profile.name.toUpperCase()}</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg mb-8 leading-relaxed">
              {profile.title}. {profile.bio.split('.')[0]}.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={profile.resumeUrl} 
                className="glow-border relative px-8 py-4 bg-background rounded-full font-bold text-white overflow-hidden group transition-all"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Download CV <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
                </span>
              </a>
              
              <a 
                href="#contact"
                className="px-8 py-4 rounded-full border border-white/10 text-white font-bold hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
              >
                Let's Talk <Mail size={18} />
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
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
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-12 rounded-full bg-gradient-to-b from-primary to-transparent"
          />
        </motion.div>
      </section>

      {/* --- TECH STACK (Marquee) --- */}
      <section className="py-20 border-y border-white/5 bg-black/40 backdrop-blur-sm overflow-hidden">
        <div className="flex gap-12 animate-infinite-scroll min-w-max">
          {[...(skills || []), ...(skills || [])].map((skill, i) => (
            <div 
              key={`${skill.name}-${i}`} 
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/5 text-white/70 hover:text-white hover:border-primary/50 transition-colors"
            >
              <span className="font-mono text-lg font-bold">{skill.name}</span>
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
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">What I Do</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">Services & Expertise</h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services?.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJECTS --- */}
      <section id="projects" className="py-32 px-6 bg-secondary/5 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24 text-center"
          >
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Portfolio</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">Selected Works</h3>
          </motion.div>

          <div className="space-y-12">
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

      {/* --- ABOUT --- */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl md:text-8xl font-display font-bold opacity-10 mb-8">ABOUT</h2>
            <p className="text-2xl md:text-3xl leading-relaxed font-light text-foreground/90">
              {profile.bio}
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="py-32 px-6 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-24">
          <div>
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-8">Let's work <br /><span className="text-gradient">together.</span></h2>
            <p className="text-xl text-muted-foreground mb-12">
              Have a project in mind? Looking for a partner to help build your next big idea? Reach out and let's start a conversation.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-lg">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary">
                  <Mail />
                </div>
                <a href="mailto:hello@example.com" className="hover:text-primary transition-colors">
                  hello@example.com
                </a>
              </div>
              {/* Add more contact details here if needed */}
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-white/10">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 text-center text-muted-foreground border-t border-white/5">
        <p className="text-sm">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}
