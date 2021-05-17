const webpack = require('webpack')
const path = require('path')
module.exports = {
  entry: {
    Vendor: [
      '@fortawesome/fontawesome-free',
      'bootstrap',
      'jquery',
      'popper.js',
      'react',
      'react-dom'
    ]
  },
  output: {
    filename: '[name].dll.js',
    path: path.join(__dirname, 'docs'),
    publicPath: 'docs',
    library: '_dll_[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: '_dll_[name]', // 要跟 output.library 保持一致
      path: path.join(__dirname, 'docs' + '/[name]_manifest.json')
    })
  ]
}
