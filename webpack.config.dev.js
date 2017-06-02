import path from "path";
// import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import csso from "postcss-csso";
import jsonToSassVars from "./tools/jsonToSassVars";

const project = "./project.json";

// const packageJSON = require("./package.json");
// const FlowtypePlugin = require("flowtype-loader/plugin");

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
  'process.env.MINIFY': Boolean(process.env.MINIFY),
  __DEV__: true
};

const sassVariables = {
  "font-path": '../../assets/fonts/'
};

export default {
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
  // devtool: 'eval-source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  devtool: 'source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  noInfo: true, // set to false to see a list of every file being bundled.
  entry: [
        // must be first entry to properly set public path
    './webpack-public-path',
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, 'src/index.js') // Defining path seems necessary for this to work consistently on Windows machines.
  ],
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: path.resolve(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  "sourceMapPathOverrides": {
    "webpack:///./*": "${cwd}/*",
    "webpack:///*": "*"
  },
  plugins: [
        // new FlowtypePlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
      title: project.title,
      template: 'src/index.ejs',
      lang: project.lang,
      mobile: true,
      favIconPath: "/assets/favicons",
      appMountId: "app",
      minify: {
        removeComments: false,
        collapseWhitespace: false
      },
      hash: true,
      inject: false
    })
    // new BundleAnalyzerPlugin()
  ],
  module: {
        // preLoaders: [
        //   {
        //     test: /\.jsx?$/,
        //     exclude: /node_modules/,
        //     loaders: ['flowtype']
        //   }
        // ],
    loaders: [
      {
        test: /(?!\.test)\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=1&mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=1&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=1&mimetype=image/svg+xml'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file?limit=1&img/name=[name].[ext]'
      },
      {
        test: /\.ico$/,
        loader: 'file?limit=1&img/name=[name].[ext]'
      },
      {
        test: /(\.css|\.scss)$/,
        loaders: [
          'style',
          'css?sourceMap',
          'postcss',
          'sass?sourceMap'
        ]
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
