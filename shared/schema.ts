import { pgTable, text, serial, integer, boolean, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  avatarUrl: text("avatar_url").notNull(),
  resumeUrl: text("resume_url").notNull(),
  socialLinks: jsonb("social_links").$type<{ platform: string; url: string; icon: string }[]>(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(), // Lucide or Si icon name
  category: text("category").notNull(), // 'frontend', 'backend', 'tool'
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  liveUrl: text("live_url"),
  repoUrl: text("repo_url"),
  tags: text("tags").array(), // Array of strings
  featured: boolean("featured").default(false),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
});

// === SCHEMAS ===

export const insertProfileSchema = createInsertSchema(profile);
export const insertSkillSchema = createInsertSchema(skills);
export const insertProjectSchema = createInsertSchema(projects);
export const insertServiceSchema = createInsertSchema(services);

// === TYPES ===

export type Profile = typeof profile.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;

export type Skill = typeof skills.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
