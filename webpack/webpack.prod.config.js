var webpack = require('webpack'),
  WebpackExtractTextPlugin = require("extract-text-webpack-plugin"),
  config = require("./config");

module.exports = {
  devtool: "source-map",
  debug: true,
  entry: [
    "./src/index.jsx"
  ],
  output: {
    path: config.paths.Dist,
    filename: 'yoda-site-components.js',
    libraryTarget: "umd"
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    }),
    new WebpackExtractTextPlugin("styles.css", {
      allChunks: true
    })
  ],
  resolve: {
    root: [
      config.paths.Src
    ],
    extensions: ['', '.js', '.jsx', ".json"]
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: [
        'react-hot',
        'babel'
      ],
      include: [
        config.paths.Src
      ]
    }, {
      test: /\.css$/,
      include: config.paths.Src,
      loader: WebpackExtractTextPlugin.extract('style-loader', [
          `resolve-url-loader?${
            JSON.stringify({
              silent: true
            })}`,
          `css-loader?${
            JSON.stringify({
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              isDebug: true,
              minimize: false,
              localIndentName: "[name]-[local]-[hash:base64:5]"
            })}`,
          'postcss-loader'
        ].join("!")
      )
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.png$/,
      loader: "url-loader?limit=100000"
    }, {
      test: /\.jpg$/,
      loader: "file-loader"
    }, {
      test: /\.woff2(\?.*)?$/,
      loader: `url?${
        JSON.stringify({
          prefix: "fonts/",
          name: "[path][name].[ext]",
          limit: 10000,
          mimetype: "application/font-woff2"
        })}`
    }]
  },
  postcss: function () {
    return [
      require('postcss-smart-import')({
        path: [
          config.paths.Src
        ]
      }),
      require("postcss-cssnext")(),
      require("postcss-browser-reporter")(),
      require("postcss-reporter")(),
      require("postcss-mixins")(),
      
    ];
  }
};
