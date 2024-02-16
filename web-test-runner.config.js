import { vitePlugin } from '@remcovaes/web-test-runner-vite-plugin';

export default {
  files: ['packages/**/*.test.ts'],
  plugins: [vitePlugin()],
  report: true,
  reportDir: 'coverage',
  threshold: {
    statements: 70,
    branches: 70,
    functions: 70,
    lines: 70,
  },
  exclude: ['node_modules/**/*']
}