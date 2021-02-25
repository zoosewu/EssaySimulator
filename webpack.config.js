const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const PATHS = {
  views: path.resolve(__dirname, 'src'),
};
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'docs'),
    filename: './js/bundle.min.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: './css/index.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyCSS: true,
        minifyJS: true,
        sortAttributes: true,
        useShortDoctype: true
      },
      inject: false
    }),
    new PurgecssPlugin({
      whitelist: function () {
        return [];
      },
      whitelistPatterns: function () {
        return [];
      },
      whitelistPatternsChildren: function () {
        return [];
      },
      paths: glob.sync(`${PATHS.views}/**/*`, { nodir: true }),
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,

        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: function () {
                  return [
                    require('autoprefixer'),
                    require('cssnano')({ preset: ['default', { discardComments: { removeAll: true } }] })
                  ];
                }
              }
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        },
        extractComments: false
      })
    ]
  }
};