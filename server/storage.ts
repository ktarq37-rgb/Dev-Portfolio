import {
  type Profile, type InsertProfile,
  type Skill, type InsertSkill,
  type Project, type InsertProject,
  type Service, type InsertService
} from "@shared/schema";

export interface IStorage {
  // Profile
  getProfile(): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  
  // Skills
  getSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  
  // Projects
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Services
  getServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
}

export class MemoryStorage implements IStorage {
  private profileData: Profile | undefined;
  private skillsData: Skill[] = [];
  private projectsData: Project[] = [];
  private servicesData: Service[] = [];
  private nextId = 1;

  // Profile
  async getProfile(): Promise<Profile | undefined> {
    return this.profileData;
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const data: Profile = { id: this.nextId++, ...insertProfile, socialLinks: insertProfile.socialLinks ?? null };
    this.profileData = data;
    return data;
  }

  // Skills
  async getSkills(): Promise<Skill[]> {
    return this.skillsData;
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const data: Skill = { id: this.nextId++, ...insertSkill };
    this.skillsData.push(data);
    return data;
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return this.projectsData;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const data: Project = {
      id: this.nextId++,
      title: insertProject.title,
      description: insertProject.description,
      imageUrl: insertProject.imageUrl,
      liveUrl: insertProject.liveUrl ?? null,
      repoUrl: insertProject.repoUrl ?? null,
      tags: insertProject.tags ?? null,
      featured: insertProject.featured ?? false,
    };
    this.projectsData.push(data);
    return data;
  }

  // Services
  async getServices(): Promise<Service[]> {
    return this.servicesData;
  }

  async createService(insertService: InsertService): Promise<Service> {
    const data: Service = { id: this.nextId++, ...insertService };
    this.servicesData.push(data);
    return data;
  }
}

export const storage = new MemoryStorage();
