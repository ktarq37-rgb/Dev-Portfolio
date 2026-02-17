export interface Profile {
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  resumeUrl: string;
  socialLinks: { platform: string; url: string; icon: string }[];
}

export interface Skill {
  id: number;
  name: string;
  icon: string;
  category: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl: string | null;
  repoUrl: string | null;
  tags: string[] | null;
  featured: boolean;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export const profile: Profile = {
  name: "Alex Dev",
  title: "Full Stack Engineer & UI Designer",
  bio: "I craft high-performance digital experiences with a focus on motion, aesthetics, and scalability. Based in San Francisco, working globally.",
  avatarUrl: "/images/avatar.jpeg",
  resumeUrl: "/resume.pdf",
  socialLinks: [
    { platform: "GitHub", url: "https://github.com", icon: "Github" },
    { platform: "Twitter", url: "https://twitter.com", icon: "Twitter" },
    { platform: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
  ],
};

export const skills: Skill[] = [
  { id: 1, name: "React", icon: "SiReact", category: "frontend" },
  { id: 2, name: "Next.js", icon: "SiNextdotjs", category: "frontend" },
  { id: 3, name: "TypeScript", icon: "SiTypescript", category: "frontend" },
  { id: 4, name: "Node.js", icon: "SiNodedotjs", category: "backend" },
  { id: 5, name: "PostgreSQL", icon: "SiPostgresql", category: "backend" },
  { id: 6, name: "Tailwind CSS", icon: "SiTailwindcss", category: "frontend" },
  { id: 7, name: "Figma", icon: "SiFigma", category: "tool" },
  { id: 8, name: "Docker", icon: "SiDocker", category: "tool" },
];

export const services: Service[] = [
  {
    id: 1,
    title: "Web Development",
    description:
      "Building blazing fast web apps using modern technologies like React, Next.js, and Tailwind CSS.",
    icon: "Code",
  },
  {
    id: 2,
    title: "UI/UX Design",
    description:
      "Designing intuitive and aesthetic user interfaces with a focus on user experience and accessibility.",
    icon: "Palette",
  },
  {
    id: 3,
    title: "Mobile Apps",
    description:
      "Developing cross-platform mobile applications using React Native for iOS and Android.",
    icon: "Smartphone",
  },
  {
    id: 4,
    title: "Consulting",
    description:
      "Helping startups and companies choose the right tech stack and architecture for their products.",
    icon: "Lightbulb",
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Neon Dashboard",
    description:
      "A futuristic analytics dashboard with real-time data visualization and dark mode UI.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    liveUrl: "#",
    repoUrl: "#",
    tags: ["React", "D3.js", "Tailwind"],
    featured: true,
  },
  {
    id: 2,
    title: "E-Commerce AI",
    description:
      "An AI-powered shopping assistant that helps users find products based on natural language queries.",
    imageUrl:
      "https://images.unsplash.com/photo-1523474253062-5c2ca29b4208?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    liveUrl: "#",
    repoUrl: "#",
    tags: ["Next.js", "OpenAI", "Stripe"],
    featured: true,
  },
  {
    id: 3,
    title: "Crypto Portfolio",
    description:
      "A secure and elegant way to track cryptocurrency assets across multiple wallets and exchanges.",
    imageUrl:
      "https://images.unsplash.com/photo-1621504450168-38f647319930?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    liveUrl: "#",
    repoUrl: "#",
    tags: ["React Native", "Web3", "Node.js"],
    featured: false,
  },
];
