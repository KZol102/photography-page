import { defineCollection } from 'astro:content';
import { photoLoader } from './content/photo-loader';
import { z } from 'astro/zod';

const photos = defineCollection({
  loader: photoLoader('./src/photos'),
  schema: ({image}) => z.object({
    title: z.string(),
    description: z.string().optional(),
    camera: z.string().optional(),
    lens: z.string().optional(),
    filters: z.array(z.string()).optional(),
    film: z.union([z.string(),z.object({name: z.string(),push: z.int().optional(), pull: z.int().optional(), rating: z.int().optional(), cross_process: z.string().optional()})]),
    tags: z.array(z.string()).optional(),
    image: image(),
  }),
});

export const collections = { photos };