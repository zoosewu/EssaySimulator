const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const glob = require('glob-all')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const PATHS = {
  views: path.resolve(__dirname, 'src')
}
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// eslint-disable-next-line no-unused-vars
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// eslint-disable-next-line no-unused-vars
const smp = new SpeedMeasurePlugin()

module.exports = {
  entry: ['./src/app.jsx'],
  output: {
    path: path.join(__dirname, 'docs'),
    filename: './js/bundle.min.js',
    library: '_dll_[name]'
  },
  module: {
    rules: [
      {
        test: /.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
            cacheDirectory: true
          }
        }
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
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
                  ]
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
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.DllReferencePlugin({
      manifest: require('./Vendor/Vendor_manifest.json')
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/index.css'
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
        return []
      },
      whitelistPatterns: function () {
        return []
      },
      whitelistPatternsChildren: function () {
        return []
      },
      paths: glob.sync(
        [
          `${PATHS.views}/**/*`,
          path.resolve(__dirname, 'node_modules/jquery/dist/jquery.slim.js'),
          path.resolve(__dirname, 'node_modules/bootstrap/dist/js/bootstrap.bundle.js')
        ],
        { nodir: true }
      )
    })
  ]
}
