import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import { eslint } from 'rollup-plugin-eslint'
import pkg from './package.json'

const path = require('path')
const getPath = _path => path.resolve(__dirname, _path)
// ts
const tsPlugin = typescript({
  tsconfig: getPath('./tsconfig.json'), // 导入本地ts配置
  extensions: ['.js', '.ts', '.tsx']
})

// eslint
const esPlugin = eslint({
  throwOnError: true,
  include: ['src/**/*.ts'],
  exclude: ['node_modules/**']
})

export default [
  // UMD for browser-friendly build
  {
    input: 'src/index.ts',
    output: {
      name: 'tools',
      file: pkg.browser,
      format: 'umd',
      exports: 'auto'
    },
    plugins: [
      resolve(),
      commonjs(),
      tsPlugin,
      esPlugin,
    ]
  },
  // CommonJS for Node and ES module for bundlers build
  {
    input: 'src/index.ts',
    external: ['ms'],
    plugins: [
      typescript()
    ],
    output: [
      {  file: pkg.main, format: 'cjs', exports: 'auto' },
      {  file: pkg.module, format: 'es', exports: 'auto' }
    ]
  }
];
