import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    shortDescription: z.string(),
    category: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    tags: z.array(z.string()),
    githubUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    role: z.string(),
    timeline: z.string(),
    status: z.string().default('Completed'),
    metrics: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          detail: z.string().optional(),
        })
      )
      .default([]),
    keyTakeaway: z.string().optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
};
