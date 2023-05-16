import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'


// https://vitejs.dev/config/
export default defineConfig({
  "rewrites": [
    {"source": "/(.*)", "destination": "/"}
    ],
  plugins: [react()],
  define:{
    'process.env': {},
      global: "window"
  },
  server: {
    host: true
  },
  optimizeDeps: {
    esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
            global: 'globalThis'
        },
        // Enable esbuild polyfill plugins
        plugins: [
            NodeGlobalsPolyfillPlugin({
                buffer: true
            })
        ]
    }
}
})
