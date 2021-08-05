const path = require('path')
const resolve = _path => path.resolve(__dirname, _path)


module.exports = {
  env: {
    browser: true,
    es6: true
  },
  parser: '@typescript-eslint/parser', // 配置ts解析器
  parserOptions: {
    project: resolve('./tsconfig.json'), 
    tsconfigRootDir: resolve('./'),
    sourceType: 'module'
  },
  // plugins: ['prettier'],
  rules: {
    'indent': ['off', 2],
    'no-unused-vars': 'error',
    'no-console': 'off',
    }
}
