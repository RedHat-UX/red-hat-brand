// Import rollup plugins
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-import-css';
import del from 'rollup-plugin-delete';
import copy from 'rollup-plugin-copy';

export default {
  plugins: [
    // Resolve bare module specifiers to relative paths
    resolve(),
    terser({
      ecma: 2020,
      module: true,
      warnings: true,
    }),
    // Get any CSS in JS imports
    css(),
    // Remove old dist directory
    del({
      targets: './_site/assets/javascript',
    }),
    copy({ targets: 
      [
        { src: 'node_modules/@patternfly/icons/**/*', dest: './_site/assets/javascript/icons' }
      ]
    }),
  ],
  // Single bundle example
  input: 'public/assets/javascript/main.js',
  output: [{
    dir: 'public/assets/javascript/',
    entryFileNames: 'bundle.js',
    chunkFileNames: 'bundle-chunk.js',
    format: 'esm'
  }],
  preserveEntrySignatures: 'strict',
};