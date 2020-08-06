const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => {
  let config = {
    mode: env == 'development' ? 'development' : 'production',
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: env == 'development' ? 'js/[name].dev.js' : '[name].[chunkhash:8].js',
      path: path.resolve(__dirname, 'dist'),
      hotUpdateChunkFilename: 'hot/hot-update.js',
      hotUpdateMainFilename: 'hot/hot-update.json'
    },
    module: {
      rules: [
        {
          test: /\.(ts[x]?|js[x]?)$/,
          loader: 'babel-loader',
          options: {
            plugins: [
              ['import', {
                  libraryName: 'antd',
                  libraryDirectory: 'lib',
                  style: true
              }]
            ]
          },
          exclude: /node_modules/
        },
        {
          test: /\.(css|less)$/,
          use: [
            'css-hot-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            {
              loader:  'less-loader',
              options: {
                sourceMap: true,
                lessOptions: {
                  javascriptEnabled: true
                }
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: 'index.html',
        minify: {
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          removeComments: true
        }
      }),
      new MiniCssExtractPlugin({
        filename: env == 'development' ? 'css/[name].dev.css' : '[name].[chunkhash:8].css',
        chunkFilename: env == 'development' ? 'css/[name].dev.css' : '[name].[chunkhash:8].css'
      })
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    optimization: {
      splitChunks: {
          chunks: 'all',
          name: 'vendor'
      }
    }
  }
  
  return config
}