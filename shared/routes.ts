import { z } from 'zod';
import { insertProfileSchema, insertSkillSchema, insertProjectSchema, insertServiceSchema, profile, skills, projects, services } from './schema';

export const api = {
  profile: {
    get: {
      method: 'GET' as const,
      path: '/api/profile',
      responses: {
        200: z.custom<typeof profile.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
  },
  skills: {
    list: {
      method: 'GET' as const,
      path: '/api/skills',
      responses: {
        200: z.array(z.custom<typeof skills.$inferSelect>()),
      },
    },
  },
  projects: {
    list: {
      method: 'GET' as const,
      path: '/api/projects',
      responses: {
        200: z.array(z.custom<typeof projects.$inferSelect>()),
      },
    },
  },
  services: {
    list: {
      method: 'GET' as const,
      path: '/api/services',
      responses: {
        200: z.array(z.custom<typeof services.$inferSelect>()),
      },
    },
  },
  contact: {
    submit: {
      method: 'POST' as const,
      path: '/api/contact',
      input: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        message: z.string().min(10, "Message must be at least 10 characters"),
      }),
      responses: {
        200: z.object({ success: z.boolean(), message: z.string() }),
        400: z.object({ message: z.string() }),
      },
    }
  }
};
