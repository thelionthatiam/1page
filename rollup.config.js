// import typescript from 'rollup-plugin-typescript';
//
// let globals = {
//   'react':'React',
//   'react-redux':'reactRedux',
//   'redux':'redux',
//   'react-dom':'ReactDOM'}
//
//
// export default {
//   input: 'src/public/app/index.tsx',
//   output: {
//     file: 'sdist/public/rollup/bundle.js',
//     format: 'iife',
//     name: '_bundle',
//     sourcemap: true,
//     globals: globals
//   },
//   watch: {
//     include: 'src/public/app/**'
//   },
//   plugins: [
//     typescript()
//   ],
//   external: ['react', 'react-dom', 'redux'],
// };

var typescript = require('rollup-plugin-typescript');
var ts = require('typescript');
var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var replace = require('rollup-plugin-replace');
var uglify = require('rollup-plugin-uglify');
var buble = require('rollup-plugin-buble');

module.exports = {
    input: 'src/public/app/index.tsx',
    output: {
      file: 'sdist/public/rollup/bundle.js',
      format: 'iife',
      name: 'supercoolnamehere',
      sourcemap:true
    },
    watch: {
      include: 'src/public/app/**'
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify( 'production' )
      }),
      typescript(),
      resolve({
        jsnext: true,
        main: true,
        browser: true
      }),
      buble(),
      commonjs({
        include: [
          'node_modules/**'
        ],
        exclude: [
          'node_modules/process-es6/**'
        ],
        namedExports: {
          'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement'],
          'node_modules/react-dom/index.js': ['render']
        }
      }),
      uglify()
    ]
};


// npm install --save rollup-plugin-node-resolve
// npm install --save rollup-plugin-commmonjs
// npm install --save rollup-plugin-replace
// npm install --save rollup-plugin-uglify
// npm install --save rollup-plugin-buble
