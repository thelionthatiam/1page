var typescript = require('rollup-plugin-typescript');
var ts = require('typescript');
var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var replace = require('rollup-plugin-replace');
var uglify = require('rollup-plugin-uglify');
var buble = require('rollup-plugin-buble');
var builtins = require('rollup-plugin-node-builtins')
var globals = require('rollup-plugin-node-globals')

module.exports = {
    input: 'src/public/index.tsx',
    output: {
      file: 'sdist/public/rollup/bundle.js',
      format: 'iife',
      name: 'a',
      sourcemap:true
    },
    watch: {
      include: 'src/public/**'
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify( 'development' )
      }),
      typescript(),
      resolve({
        jsnext: true,
        main: true,
        browser: true
      }),
      buble(),
      globals(),
      builtins(),
      commonjs({
        include: [
          'node_modules/**'
        ],
        exclude: [
          'node_modules/process-es6/**'
        ],
        namedExports: {
          'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement', 'cloneElement', 'PureComponent'],
          'node_modules/react-dom/index.js': ['render', 'hydrate', 'unmountComponentAtNode'],
          'node_modules/aphrodite/no-important.js': ['StyleSheet', 'css'],
          'node_modules/aphrodite/lib/index.js': ['StyleSheet', 'css'],
          'node_modules/asap/raw.js': ['rawAsap']
        },
        //uglify() // add for faster running when in production
      })
    ]
};
