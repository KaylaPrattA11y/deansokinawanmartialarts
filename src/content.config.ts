// Migrated from src/content/config.ts for Astro v6+
// See https://docs.astro.build/en/guides/upgrade-to/v6/#removed-legacy-content-collections

import { defineCollection } from "astro:content";
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
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
        mediaType: z.enum(['photo', 'video']),
        image: z.string().optional(),
        vimeoUrl: z.string().optional(),
        title: z.string().optional(),
        caption: z.string().optional(),
        credit: z.string().optional()
      })).optional()
    }).optional(),
    postToGroupMe: z.boolean().default(true),
  }),
});

const gallery = defineCollection({
  loader: glob({ base: './src/content/gallery', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    mediaType: z.enum(['photo', 'video']),
    image: z.string().optional(),
    vimeoUrl: z.string().optional(),
    pubDate: z.coerce.date(),
    title: z.string(),
    caption: z.string().optional(),
    credit: z.string().optional()
  }),
});

const faqs = defineCollection({
  loader: glob({ base: './src/content/faqs', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    question: z.string(),
    sortOrder: z.number().optional(),
  }),
});

const dictionary = defineCollection({
  loader: glob({ base: './src/content/dictionary', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    term: z.string(),
    pronunciation: z.string().optional(),
  }),
});

const classes = defineCollection({
  loader: glob({ base: './src/content/classes', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    name: z.string(),
    ages: z.string(),
    description: z.string().max(200),
    startTime: z.string(),
    endTime: z.string(),
    location: z.string(),
    recurrence: z.string(),
    recurrence_byDay: z.array(z.string()),
    tuitionOnce: z.number(),
    tuitionTwice: z.number().optional(),
    tuition_billing_recurrence: z.string(),
    sortOrder: z.number().optional(),
    kanji: z.string().optional(),
  }),
});

const announcements = defineCollection({
  loader: glob({ base: './src/content/announcements', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    className: z.string(),
    date: z.coerce.date(),
    cancelled: z.boolean().default(false),
    message: z.string().max(100).optional(),
    postToGroupMe: z.boolean().default(true),
  }),
});

const instructors = defineCollection({
  loader: glob({ base: './src/content/instructors', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    name: z.string(),
    title: z.string().optional(),
    rank: z.string().optional(),
    photo: z.string().optional(),
    photoOrientation: z.enum(['Portrait', 'Landscape']).default('Portrait'),
    sortOrder: z.number().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, gallery, faqs, dictionary, instructors, classes, announcements };
