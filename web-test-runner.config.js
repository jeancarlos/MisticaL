import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  files: ['packages/**/*.test.ts'],
  plugins: [esbuildPlugin({ ts: true })],
}