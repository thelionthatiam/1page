import typescript from 'rollup-plugin-typescript';

export default {
  input: 'src/public/app/index.tsx',
  output: {
    file: 'sdist/public/rollup/bundle.js',
    format: 'iife',
    name: '_bundle',
    sourcemap: true
  },
  watch: {
    include: 'src/public/app/**'
  },
  plugins: [
    typescript()
  ],
  external: ['react', 'react-dom'],
};
