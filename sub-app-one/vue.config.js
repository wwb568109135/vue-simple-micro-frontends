const webpack = require('webpack');
const ModifyChunkIdPlugin = require('modify-chunk-id-webpack-plugin');
const APP_NAME = require('./package.json').name;
const PORT = require('./package.json').devPort;
const patchCliService = require('./scripts/patch-cli-service');

patchCliService();

const NODE_ENV = process.env.NODE_ENV || 'development';

log('APP_NAME: ', APP_NAME);
log('NODE_ENV: ', NODE_ENV);

module.exports = {
  baseUrl: `/${APP_NAME}/`,

  css: { extract: false },

  productionSourceMap: false,

  configureWebpack: {
    externals: {
      vue: 'Vue',
      'element-ui': 'ELEMENT',
    },

    entry: './src/module.js',

    output: {
      libraryExport: 'default',
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.VUE_APP_NAME': JSON.stringify(APP_NAME),
      }),
      new ModifyChunkIdPlugin({ random: process.env.NODE_ENV === 'development' }),
    ],
  },

  devServer: {
    port: PORT,
  },
};

function log(label, content, options) {
  console.log('\x1b[1m%s\x1b[31m%s\x1b[0m', label, content);
}
