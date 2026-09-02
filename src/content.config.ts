import { defineCollection } from 'astro:content';
import { photoLoader } from './content/photo-loader';
import { z } from 'astro/zod';

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
  schema: ({image}) => z.object({
    order: z.int().positive(),
    title: z.string(),
    description: z.string().optional(),
    camera: z.string().optional(),
    lens: z.string().optional(),
    filters: z.array(z.string()).optional(),
    film: film,
    tags: z.array(z.string()).optional(),
    image: image(),
  }),
});

export const collections = { photos };