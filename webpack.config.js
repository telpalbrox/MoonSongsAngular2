// @AngularClass

/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var path = require('path');
var webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
var CopyWebpackPlugin  = require('copy-webpack-plugin');
var HtmlWebpackPlugin  = require('html-webpack-plugin');
var ENV = process.env.ENV = process.env.NODE_ENV = 'development';

var metadata = {
  title: 'MoonSongs',
  baseUrl: '/',
  host: 'localhost',
  port: 3000,
  ENV: ENV
};
/*
 * Config
 */
module.exports = {
  // static data for index.html
  metadata: metadata,
  // for faster builds use 'eval'
  devtool: 'source-map',
  debug: true,

  // our angular app
  entry: { 'vendor': './src/vendor.ts', 'main': './src/main.ts' },

  // Config for our build files
  output: {
    path: root('dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    // ensure loader extensions match
    extensions: ['','.ts','.js','.json','.css','.html']
  },

  module: {
    preLoaders: [{ test: /\.ts$/, loader: 'tslint-loader', exclude: [/node_modules/] }],
    loaders: [
      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        query: {
          'ignoreDiagnostics': [
            2403, // 2403 -> Subsequent variable declarations
            2300, // 2300 -> Duplicate identifier
            2374, // 2374 -> Duplicate number index signature
            2375  // 2375 -> Duplicate string index signature
          ]
        },
        exclude: [ /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/ ]
      },

      // Support for *.json files.
      { test: /\.json$/,  loader: 'json-loader' },

      // Support for CSS as raw text
      { test: /\.css$/,   loader: 'raw-loader' },

      // support for .html as raw text
      { test: /\.html$/,  loader: 'raw-loader' },

      { test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass'] },
      { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' },
      // Bootstrap 3
      { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' }

      // if you add a loader include the resolve file extension above
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js', minChunks: Infinity }),
    // static assets
    new CopyWebpackPlugin([ { from: 'src/assets', to: 'assets' } ]),
    // generating html
    new HtmlWebpackPlugin({ template: 'src/index.html', inject: false }),
    // replace
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'NODE_ENV': JSON.stringify(metadata.ENV)
      }
    }),
    new ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    })
  ],

  postcss: [autoprefixer],

  // Other module loader config
  tslint: {
    emitErrors: false,
    failOnHint: false
  },
  // our Webpack Development Server config
  devServer: {
    port: metadata.port,
    host: metadata.host,
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 }
  },
  // we need this due to problems with es6-shim
  node: {global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false}
};

// Helper functions

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return root.apply(path, ['node_modules'].concat(args));
}
