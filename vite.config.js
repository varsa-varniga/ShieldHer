import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Only use this if you're using Emotion CSS
const emotionPlugins = {
  jsxImportSource: '@emotion/react',
  babel: {
    plugins: ['@emotion/babel-plugin'],
  },
};

export default defineConfig({
  plugins: [react(process.env.USE_EMOTION ? emotionPlugins : undefined)],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': '/src',
    },
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  },
  json: {
    stringify: true, // Will inline JSON files <10kb
  },
});