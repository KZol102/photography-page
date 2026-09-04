import { defineCollection } from 'astro:content';
import { photoLoader } from './content/photo-loader';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

export const blogCategories = ["camera", "lens", "film", "other"] as const;
export const lensMounts = ["Minolta SR", "M42"] as const;

const film = z.union(
  [
    z.string(),
    z.object({
      name: z.string(),
      push: z.int().optional(),
      pull: z.int().optional(),
      rating: z.int().optional(),
      cross_process: z.string().optional(),
      misc: z.string().optional()
    }
    )
  ])

const photos = defineCollection({
  loader: photoLoader('./src/photos'),
  schema: ({ image }) => z.object({
    order: z.int().positive(),
    title: z.string(),
    description: z.string().optional(),
    camera: z.string().optional(),
    lens: z.string().optional(),
    filters: z.array(z.string()).optional(),
    film: film.optional(),
    tags: z.array(z.string()).optional(),
    image: image(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/blog" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    hero: image().optional(),
    category: z.enum(blogCategories),
    pubDate: z.date().optional(),
    lastUpdateDate: z.date().optional(),
    camera: z.string().optional(),
    lens: z.string().optional(),
    mount: z.enum(lensMounts).optional(),
    film: z.string().optional()
  }),
});

export const collections = { photos, blog };