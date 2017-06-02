// For info about this file refer to webpack and webpack-hot-middleware documentation
// For info on how we're generating bundles with hashed filenames for cache busting: https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.w99i89nsz
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import csso from "postcss-csso";
import jsonToSassVars from "./tools/jsonToSassVars";

const project = "./project.json";

const packageJSON = require("./package.json");

// const FlowtypePlugin = require("flowtype-loader/plugin");

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
  __DEV__: false
};
const isMinify = Boolean(Number(process.env.MINIFY));
const sassVariables = {
  "font-path": '../../assets/fonts/'
};

export default {
  node: {
    fs: "empty"
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx',
      '.json'
    ],
    root: path.resolve('./src')
  },
  debug: true,
  cache: true,
  devtool: 'source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  noInfo: false, // set to false to see a list of every file being bundled.
  entry: {
    app: path.resolve(__dirname, 'src/index'),
    vendor: [
      "babel-polyfill"
    ]
  },
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    chunkFilename: "js/[name].js",
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].[chunkhash].js'
  },
  plugins: [
    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),

    // Optimize the order that items are bundled. This assures the hash is deterministic.
    new webpack.optimize.OccurenceOrderPlugin(),

    // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    new webpack.DefinePlugin(GLOBALS),

    // Generate an external css file with a hash in the filename
    new ExtractTextPlugin('css/[name].[contenthash].css', {
      allChunks: true
    }),


    // Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
    new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
      title: project.title,
      template: 'src/index.ejs',
      lang: project.lang,
      mobile: true,
      appMountId: "app",
      favIconPath: "img/favicons",
      minify: {
        removeComments: isMinify,
        collapseWhitespace: isMinify
      },
      hash: true,
      cache: false,
      inject: false
    }),

    // Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'js/[name].[chunkhash].js'
    }),

    new CopyWebpackPlugin([
      {
        from: "src/assets/favicons/",
        to: "img/favicons/"
      },
      {
        from: "static",
        to: ""
      }
    ]),


    // Minify JS
    new webpack.optimize.UglifyJsPlugin({
      compress: isMinify,
      comments: !isMinify,
      mangle: {
        "screw_ie8": true
      },
      sourceMap: true,
      beautify: !isMinify
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        loader: 'url?name=fonts/[name].[hash].[ext]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=1&mimetype=application/font-woff&name=fonts/[name].[hash].[ext]"
      },
      {
        test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
        loader: 'url?limit=1&mimetype=application/octet-stream&name=fonts/[name].[hash].[ext]'
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        loader: 'url?limit=1000&mimetype=image/svg+xml&name=img/[name].[hash].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        loader: 'file?limit=1000&name=img/[name].[hash].[ext]'
      },
      {
        test: /(\.css|\.scss)$/,
        loader: ExtractTextPlugin.extract('css!postcss!sass')
      },
      {
        test: /\.json$/,
        loader: "json"
      }
    ]
  },

  sassLoader: {
    data: jsonToSassVars(sassVariables),
    includePaths: [
      path.resolve("src/assets/sass/")
    ]
  },

  postcss() {
    return [
      require("postcss-inline-svg"),
      require('postcss-svgo'),
      // autoprefixer({
      //   browsers: [
      //     'last 10 versions',
      //     'IE >= 9',
      //     'IOS >= 7',
      //     'Safari >= 8'
      //   ]
      // }),
      csso
    ];
  }

};
