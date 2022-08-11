const {
  override,
  addDecoratorsLegacy,
  addWebpackResolve,
  addBabelPlugin,
  addWebpackPlugin,
  addWebpackModuleRule,
  disableEsLint,
} = require('customize-cra');
const path = require('path');
const webpack = require('webpack');

module.exports = override(
  disableEsLint(),
  addDecoratorsLegacy(),
  addWebpackModuleRule({ test: /\.svg$/, use: ['@svgr/webpack'] }),
  addWebpackResolve({
    extensions: ['*', '.js', '.jsx'],
    alias: {
      Pages: path.resolve(__dirname, 'src/pages/'),
      Components: path.resolve(__dirname, 'src/common/components/'),
      Styles: path.resolve(__dirname, 'src/common/styles/'),
      Assets: path.resolve(__dirname, 'src/assets/'),
      Modules: path.resolve(__dirname, 'src/modules/'),
      Helpers: path.resolve(__dirname, 'src/helpers/'),
      Utils: path.resolve(__dirname, 'src/utils/'),
    },
  }),
  addWebpackPlugin(
    new webpack.DefinePlugin({
      'process.env.WHICH_MODE': JSON.stringify(process.env.WHICH_MODE),
    }),
  ),
  addBabelPlugin('@babel/plugin-proposal-optional-chaining', { loose: true }),
  addBabelPlugin('@babel/plugin-proposal-export-namespace-from'),
  addBabelPlugin('@babel/plugin-proposal-nullish-coalescing-operator'),
);
