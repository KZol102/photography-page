import type { Loader } from 'astro/loaders';
import fs from 'node:fs/promises';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';

export function photoLoader(dir: string): Loader {
  return {
    name: 'photos-loader',
    load: async ({ store, logger }) => {
      const files = await fs.readdir(dir);
      const imageExts = ['.png', '.jpg', '.jpeg', '.webp'];
      const images = files.filter(f => imageExts.includes(path.extname(f).toLowerCase()));

      store.clear();

      for (const imageFile of images) {
        const base = path.basename(imageFile, path.extname(imageFile));
        const metaPath = path.join(dir, `${base}.yml`);

        let data: Record<string, unknown> = {};
        try {
          data = parseYaml(await fs.readFile(metaPath, 'utf-8')) ?? {};
          store.set({ id: base, data: { ...data, image: { src: dir + '/' + imageFile, format: path.extname(imageFile).substring(1) } } });
        } catch {
          logger.warn(`Missing/invalid metadata for ${imageFile}`);
        }
      }
    },
  };
}