import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // === API ROUTES ===

  app.get(api.profile.get.path, async (req, res) => {
    const profile = await storage.getProfile();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  });

  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.services.list.path, async (req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      // In a real app, this would send an email
      console.log("Contact form submitted:", input);
      res.json({ success: true, message: "Message sent successfully!" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // === SEED DATA ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProfile = await storage.getProfile();
  if (!existingProfile) {
    await storage.createProfile({
      name: "Alex Dev",
      title: "Full Stack Engineer & UI Designer",
      bio: "I craft high-performance digital experiences with a focus on motion, aesthetics, and scalability. Based in San Francisco, working globally.",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      resumeUrl: "/resume.pdf",
      socialLinks: [
        { platform: "GitHub", url: "https://github.com", icon: "Github" },
        { platform: "Twitter", url: "https://twitter.com", icon: "Twitter" },
        { platform: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" }
      ]
    });

    const skills = [
      { name: "React", icon: "SiReact", category: "frontend" },
      { name: "Next.js", icon: "SiNextdotjs", category: "frontend" },
      { name: "TypeScript", icon: "SiTypescript", category: "frontend" },
      { name: "Node.js", icon: "SiNodedotjs", category: "backend" },
      { name: "PostgreSQL", icon: "SiPostgresql", category: "backend" },
      { name: "Tailwind CSS", icon: "SiTailwindcss", category: "frontend" },
      { name: "Figma", icon: "SiFigma", category: "tool" },
      { name: "Docker", icon: "SiDocker", category: "tool" }
    ];

    for (const skill of skills) {
      await storage.createSkill(skill);
    }

    const services = [
      { 
        title: "Web Development", 
        description: "Building blazing fast web apps using modern technologies like React, Next.js, and Tailwind CSS.", 
        icon: "Code" 
      },
      { 
        title: "UI/UX Design", 
        description: "Designing intuitive and aesthetic user interfaces with a focus on user experience and accessibility.", 
        icon: "Palette" 
      },
      { 
        title: "Mobile Apps", 
        description: "Developing cross-platform mobile applications using React Native for iOS and Android.", 
        icon: "Smartphone" 
      },
      { 
        title: "Consulting", 
        description: "Helping startups and companies choose the right tech stack and architecture for their products.", 
        icon: "Lightbulb" 
      }
    ];

    for (const service of services) {
      await storage.createService(service);
    }

    const projects = [
      {
        title: "Neon Dashboard",
        description: "A futuristic analytics dashboard with real-time data visualization and dark mode UI.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        liveUrl: "#",
        repoUrl: "#",
        tags: ["React", "D3.js", "Tailwind"],
        featured: true
      },
      {
        title: "E-Commerce AI",
        description: "An AI-powered shopping assistant that helps users find products based on natural language queries.",
        imageUrl: "https://images.unsplash.com/photo-1523474253062-5c2ca29b4208?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        liveUrl: "#",
        repoUrl: "#",
        tags: ["Next.js", "OpenAI", "Stripe"],
        featured: true
      },
      {
        title: "Crypto Portfolio",
        description: "A secure and elegant way to track cryptocurrency assets across multiple wallets and exchanges.",
        imageUrl: "https://images.unsplash.com/photo-1621504450168-38f647319930?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        liveUrl: "#",
        repoUrl: "#",
        tags: ["React Native", "Web3", "Node.js"],
        featured: false
      }
    ];

    for (const project of projects) {
      await storage.createProject(project);
    }
  }
}
