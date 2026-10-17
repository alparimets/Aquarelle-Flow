import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Relative base lets the build work under any GitHub Pages sub-path.
export default defineConfig({
  base: './',
  plugins: [react()],
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text-summary', 'lcov'],
      include: ['src/lib/**', 'src/data/**'],
      exclude: ['src/**/*.test.ts'],
    },
  },
});
