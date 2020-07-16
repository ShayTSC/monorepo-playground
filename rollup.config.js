/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';

function getConfig(minify, buildModule, testing) {
  let input = 'packages/demo/lib/main.js';
  let output = ['umd'];
  let format = 'umd';
  /**
   * main : 定义了 npm 包的入口文件，browser 环境和 node 环境均可使用
   * module : 定义 npm 包的 ESM 规范的入口文件，browser 环境和 node 环境均可使用
   * browser : 定义 npm 包在 browser 环境下的入口文件
   */
  let mainFields = ['browser', 'main'];


  if (buildModule) {
    input = 'packages/demo/lib.esm/main.js';
    output = ['esm'];
    format = 'esm';
    mainFields = ['browser', 'module', 'main'];
  }

  // TODO: A replacer if needed

  const plugins = [
    json(),
    resolve({
      mainFields: mainFields,
    }),
    // Custom Export names
    // left-hand side can be an absolute path, a path
    // relative to the current directory, or the name
    // of a module in node_modules
    commonjs({
      namedExports: {
        'bn.js': ['BN'],
        'hash.js': ['hmac', 'ripemd160', 'sha256', 'sha512'],
        'elliptic': ['ec'],
        'scrypt-js': ['scrypt', 'syncScrypt']
      }
    }),
  ];

  if (minify) {
    output.push('min');
    plugins.push(terser()); // minify output js file
  }

  const outputFile = [
    'packages',
    (testing ? 'tests' : 'demo'), // final dist project on the right
    ('/dist/demo.' + output.join('.') + '.js')
  ].join('/');

  return {
    input,
    output: {
      file: outputFile,
      format,
      name: 'demo',
      exports: 'named'
    },
    context: 'window',
    treeshake: false,
    plugins: plugins,
  };
}

export default commandLineArgs => {
  // rollup -c --configModule
  const testing = commandLineArgs.configTest;
  const buildModule = commandLineArgs.configModule;

  return [
    getConfig(false, buildModule, testing),
    getConfig(true, buildModule, testing)
  ]
}
