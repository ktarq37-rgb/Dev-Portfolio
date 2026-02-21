export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  resumeUrl: string;
  socialLinks: { platform: string; url: string; icon: string }[];
}

export interface SkillCategory {
  id: number;
  title: string;
  icon: string;
  items: string[];
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
  name: "Hassan",
  title: "Fullstack Web Developer",
  tagline:
    "who delivers Fullstack Solutions that connecting the dots between Users and Business Goals",
  bio: "I craft high-performance digital experiences with a focus on motion, aesthetics, and scalability. Working globally to deliver fullstack solutions.",
  avatarUrl: "/images/avatar-transparent.png",
  resumeUrl: "/resume.pdf",
  socialLinks: [
    { platform: "GitHub", url: "https://github.com", icon: "Github" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/hassan-tarig-3ab7a6266", icon: "Linkedin" },
    { platform: "Instagram", url: "https://www.instagram.com/pablo_ff.7", icon: "Instagram" },
  ],
};

export const skillCategories: SkillCategory[] = [
  {
    id: 1,
    title: "General Programming",
    icon: "Terminal",
    items: ["Typescript", "Node.js", "Python", "Golang", "PHP"],
  },
  {
    id: 2,
    title: "Others",
    icon: "Settings",
    items: ["Figma", "Docker", "Playwright", "Tensorflow", "OpenCV", "AWS", "Supabase", "n8n"],
  },
  {
    id: 3,
    title: "Backend",
    icon: "Server",
    items: ["Express.js", "FastAPI", "Fiber", "Apollo", "Socket.io"],
  },
  {
    id: 4,
    title: "Web Framework & UI",
    icon: "Monitor",
    items: ["Next.js", "Laravel", "React", "Tailwind"],
  },
  {
    id: 5,
    title: "Database",
    icon: "Database",
    items: ["MongoDB", "MySQL", "Postgres", "Redis"],
  },
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

export interface Education {
  id: number;
  degree: string;
  field: string;
  institution: string;
  status: string;
}

export const education: Education[] = [
  {
    id: 1,
    degree: "Bachelor's Degree",
    field: "Information Security",
    institution: "Currently Studying",
    status: "In Progress",
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Beauty Glow",
    description:
      "A comprehensive E-commerce platform for beauty and skincare products with a sleek, modern shopping experience.",
    imageUrl: "/images/beautyglow.jpg",
    liveUrl: "https://beautyglow-sd.vercel.app/",
    repoUrl: null,
    tags: ["E-commerce", "Next.js", "Fullstack"],
    featured: true,
  },
  {
    id: 2,
    title: "Travel Hub",
    description:
      "Official website for a Travel & Tourism Agency featuring destination browsing, booking, and tour packages.",
    imageUrl: "/images/travelhub.jpg",
    liveUrl: "https://travelhub-sd.vercel.app/",
    repoUrl: null,
    tags: ["Tourism", "Web App", "Fullstack"],
    featured: true,
  },
];
