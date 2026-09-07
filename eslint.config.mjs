// Flat config (ESLint 9+)
// Install with: npm install -D eslint eslint-plugin-astro
import eslintPluginAstro from 'eslint-plugin-astro';

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      // add project-specific overrides here
    },
  },
];
