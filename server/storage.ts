import { db } from "./db";
import {
  profile, skills, projects, services,
  type Profile, type InsertProfile,
  type Skill, type InsertSkill,
  type Project, type InsertProject,
  type Service, type InsertService
} from "@shared/schema";
import { eq } from "drizzle-orm";

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

export class DatabaseStorage implements IStorage {
  // Profile
  async getProfile(): Promise<Profile | undefined> {
    const [data] = await db.select().from(profile).limit(1);
    return data;
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const [data] = await db.insert(profile).values(insertProfile).returning();
    return data;
  }

  // Skills
  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const [data] = await db.insert(skills).values(insertSkill).returning();
    return data;
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [data] = await db.insert(projects).values(insertProject).returning();
    return data;
  }

  // Services
  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const [data] = await db.insert(services).values(insertService).returning();
    return data;
  }
}

export const storage = new DatabaseStorage();
