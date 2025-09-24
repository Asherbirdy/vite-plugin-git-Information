import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      include: ['lib'],
      staticImport: true,
      copyDtsFiles: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.ts'),
      name: 'VitePluginGitInformation',
      fileName: (format) => format === 'es' ? 'index.js' : `index.${format}.js`,
    },
    copyPublicDir: false,
    rollupOptions: {
      external: ['vite', 'child_process'],
      output: {
        globals: {
          vite: 'Vite',
        },
      },
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'lib'),
    },
  },
});
