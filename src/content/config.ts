import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string().optional(),
    author: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    imageGallery: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      gallery: z.array(z.object({
        image: z.string(),
        title: z.string().optional(),
        caption: z.string().optional()
      })).optional()
    }).optional(),
  }),
});

const gallery = defineCollection({
  type: 'content',
  schema: z.object({
    image: z.string(),
    pubDate: z.coerce.date(),
    title: z.string(),
    caption: z.string().optional(),
  }),
});

export const collections = { blog, gallery };
