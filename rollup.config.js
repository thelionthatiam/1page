export default {
  input: 'sdist/public/app/index.js',
  output: {
    file: 'sdist/public/rollup/bundle.js',
    format: 'iife',
    name: '_bundle',
    sourcemap: true
  },
  watch: {
    include: 'sdist/public/app/**'
  },
  external: ['react', 'react-dom'],
};
