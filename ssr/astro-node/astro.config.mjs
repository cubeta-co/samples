// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// Server-rendered with the Node adapter's standalone server, which reads
// HOST and PORT.
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
});
