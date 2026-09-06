import type { Loader } from 'astro/loaders';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';

export function photoLoader(dir: string): Loader {
  return {
    name: 'photos-loader',
    load: async ({ store, logger, config, parseData }) => {
      const files = await fs.readdir(dir);
      const rootPath = fileURLToPath(config.root);
      const imageExts = ['.png', '.jpg', '.jpeg', '.webp'];
      const images = files.filter(f => imageExts.includes(path.extname(f).toLowerCase()));

      store.clear();

      for (const imageFile of images) {
        const base = path.basename(imageFile, path.extname(imageFile));
        const metaPath = path.join(dir, `${base}.yml`);
        const absoluteImagePath = path.join(dir, imageFile);
        const filePath = path.relative(rootPath, absoluteImagePath);

        try {
          const rawData = parseYaml(await fs.readFile(metaPath, 'utf-8')) ?? {};
          const data = await parseData({
            id: base,
            data: { ...rawData, image: imageFile },
            filePath,
          });

          store.set({ id: base, data, filePath });
        } catch {
          logger.warn(`Missing/invalid metadata for ${imageFile}`);
        }
      }
    },
  };
}