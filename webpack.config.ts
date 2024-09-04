import { resolve } from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import InlineChunkHtmlPlugin from 'react-dev-utils/InlineChunkHtmlPlugin';
import Dotenv from 'dotenv-webpack';

module.exports = (_env, { mode }) => ({
  mode: mode === 'production' ? 'production' : 'development',
  devtool: mode === 'production' ? false : 'inline-source-map',
  entry: {
    ui: './src/app/index.tsx',
    code: './src/plugin/FigmaPlugin.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'swc-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader', // Translates CSS into CommonJS
          'postcss-loader', // Process CSS with PostCSS
        ],
      },
      {
        test: /\.(png|jpg|gif|webp)$/,
        loader: 'url-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
          },
        ],
      },
    ],
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    fallback: {
      stream: require.resolve('stream-browserify'),
    },
  },

  optimization: {
    nodeEnv: mode === 'production' ? 'production' : 'development',
    minimize: mode === 'production',
    usedExports: true,
    concatenateModules: true,
  },

  output: {
    publicPath: '',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    path: resolve(__dirname, 'dist'),
  },

  devServer: {
    static: resolve(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true,
    open: true,
  },

  plugins: [
    new Dotenv({
      path: mode === 'production' ? '.env' : '.env.development.local',
    }),
    new HtmlWebpackPlugin({
      template: './src/app/index.html',
      inject: 'body',
      filename: 'index.html',
      chunks: ['ui'],
      cache: mode === 'production',
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/]),
  ],
});
