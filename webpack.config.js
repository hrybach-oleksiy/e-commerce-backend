const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const fileName = (ext) => (isDev ? `[name]${ext}` : `[name].[contenthash:8]${ext}`);

module.exports = {
  entry: {
    index: path.join(__dirname, 'src/server', 'server.ts'),
  },
  target: 'node',
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  mode: 'development',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `${fileName('.js')}`,
    assetModuleFilename: `assets/${fileName('[ext]')}`,
  },
  optimization: {
    usedExports: false,
  },
  devtool: isProd ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: 'html-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      inject: true,
      chunks: ['index'],
      filename: 'index.html',
      minify: {
        collapseWhitespace: isProd,
        removeComments: isProd,
        removeRedundantAttributes: isProd,
        useShortDoctype: isProd,
      },
    }),
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ['dist'],
        },
      },
    }),
    new EslintPlugin({ extensions: 'ts' }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  // devServer: {
  //   watchFiles: path.join(__dirname, 'src'),
  //   port: 9000,
  // },
  devServer: {
    historyApiFallback: true,
    static: './',
    hot: true,
    port: 9000,
  },
};
