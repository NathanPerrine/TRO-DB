import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import './src/theme';
        `,
      }
    }
  },
	plugins: [sveltekit()]
});
