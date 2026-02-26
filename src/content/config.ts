import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    author: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    imageGallery: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      gallery: z.array(z.object({
        image: z.string(),
        caption: z.string().optional()
      })).optional()
    }).optional(),
  }),
});

export const collections = { blog };
