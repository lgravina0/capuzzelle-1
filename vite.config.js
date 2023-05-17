import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import inject from '@rollup/plugin-inject';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
// https://vitejs.dev/config/
export default defineConfig({
  resolve:{

    alias: [
      {
        find: 'web3',
        replacement: 'web3/dist/web3.min.js',
        buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
        process: 'rollup-plugin-node-polyfills/polyfills/process-es6'
      },
    ],
  },
  plugins: [react()],
  define:{
    'process.env': {},
      global: "window",
      'process.env.NODE_ENV': '"production"'
      
      
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
    rollupOptions: {
			plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
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
