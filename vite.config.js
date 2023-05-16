import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import buffer from 'buffer';
// https://vitejs.dev/config/
export default defineConfig({
  resolve:{

    alias: [
      {
        find: 'web3',
        replacement: 'web3/dist/web3.min.js',
      },
    ],
  },
  plugins: [react()],
  define:{
    'process.env': {},
      global: "window",
      Buffer: buffer.Buffer
      
      
  },
  server: {
    host: true
  },
  commonjsOptions: {
    transformMixedEsModules: true,
  },
  "compilerOptions": {
    "types": ["vite/client"]
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
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
