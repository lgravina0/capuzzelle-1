import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import inject from '@rollup/plugin-inject';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import injectProcessEnv from 'rollup-plugin-inject-process-env';

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
    'process.env': process.env,
      global: "window",
      
      
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
    sourcemap: true,
    rollupOptions: {
			plugins: [inject({ Buffer: ['buffer', 'Buffer'] }), injectProcessEnv({ 
        NODE_ENV: 'production'})],
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
