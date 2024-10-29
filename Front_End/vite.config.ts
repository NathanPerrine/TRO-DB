import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `
          @use '$lib/scss/mixins' as *;
          @use '$lib/scss/theme' as *;
        `
      }
    }
  },
  plugins: [sveltekit()]
});
