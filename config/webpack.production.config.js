const path = require('path');
const root = __dirname;
const isProd = process.env.NODE_ENV === 'production';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: [
    "react-hot-loader/patch",
    path.resolve(root, '../webapp/entry/main.jsx')
  ],
  mode:'production',
  output: {
    path: path.resolve(root, '../build/dist'),
    filename: 'js/[name].[chunkhash:5].bundle.js'
  },
  resolve: {
    modules: [path.resolve(root, "../webapp"), "node_modules"],
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets:['react','es2015','stage-0']
          }
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          loader: [
            MiniCssExtractPlugin.loader,
        　　 　　 "css-loader"
          ]
        },
        {
          test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
          loader: 'file-loader?name=images/[name].[ext]'
        },
        {
          test: /\.(ico)$/,
          loader: 'file-loader?name=favicon/[name].[ext]'
        }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Demo',
      inject: true,
      template: path.resolve(root, '../webapp/template/template.html'),
      filename:'index.html',
      // minify: {
      //     // removeComments: true,
      //     collapseWhitespace: true,
      //     removeAttributeQuotes: true
      //     // https://github.com/kangax/html-minifier#options-quick-reference
      // },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: 'css/[id].[chunkhash:8].css'
    }),
    new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
    })

  ],


 optimization: {
   minimize:true,
   runtimeChunk:{
     name:'runtime'
   },
   splitChunks:{

      chunks: "all",
      cacheGroups: {
        libs: {
          name: "chunklibs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial" // 只打包初始时依赖的第三方
        },
        react: {
          name: "chunkmain", // 单独将 react 拆包
          priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/
        }
        
      }

   }

}


}
