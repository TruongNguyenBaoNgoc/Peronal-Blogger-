import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      // Ensure static images in the `assets/` folder are deployed.
      // Vercel only serves files emitted to `dist`; Vite copies everything
      // from `publicDir` into the build output. By pointing `publicDir` to
      // our existing `assets/` folder, paths like `/assets/xxx.jpg` work
      // both locally and on Vercel.
      publicDir: 'assets',
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
