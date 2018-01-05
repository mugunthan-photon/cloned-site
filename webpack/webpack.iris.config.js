/* eslint-disable global-require */
const webpack = require('webpack');
const path = require('path'); // for absolute path
const WebpackExtractTextPlugin = require('extract-text-webpack-plugin'); // extracting css to a separate file
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // optimizing css

const IRIS_BUILD_DIR = path.resolve(__dirname, '../build');
const APP_DIR = path.resolve(__dirname, '../src');
const IRIS_DIR = path.resolve(__dirname, '../src/iris/');

const webpackPlugins = [
    new webpack.optimize.DedupePlugin(),  // Deduping repeated content
    new webpack.optimize.OccurrenceOrderPlugin(),
    new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true,
    }),
    new WebpackExtractTextPlugin('yoda-site-components.css', {
        allChunks: true,
    }),
];

const config = {
    entry: `${IRIS_DIR}/index.js`,
    output: {
        path: IRIS_BUILD_DIR,
        filename: 'yoda-site-components.js',
        libraryTarget: 'umd',
        library: 'iris',
    },


    // Loaders to resolve all the file types
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                include: [
                    APP_DIR,
                    IRIS_DIR,
                    /node_modules\/yoda-/, /** Include yoda modules */
                ],
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                exclude: [
                    /\/assets\/externalStyles\//, /** Exclude external styles */
                ],
                loader: WebpackExtractTextPlugin.extract('style-loader', [
                    `resolve-url-loader?${
                        JSON.stringify({
                            silent: true,
                        })}`,
                    `css-loader?${
                        JSON.stringify({
                            importLoaders: 1,
                            sourceMap: true,
                            modules: true,
                            isDebug: true,
                            minimize: false,
                            localIdentName: '[name]-[local]-[hash:base64:5]',
                        })}`,
                    'postcss-loader',
                ].join('!')),
            },
            {
                test: /\.css$/,
                include: [
                    /\/assets\/externalStyles\//, /** Include only external styles for third party components */
                ],
                loader: WebpackExtractTextPlugin.extract('style-loader', [
                    `resolve-url-loader?${
                        JSON.stringify({
                            silent: true,
                        })}`,
                    `css-loader?${
                        JSON.stringify({
                            importLoaders: 1,
                            sourceMap: true,
                            modules: true,
                            isDebug: true,
                            minimize: false,
                            localIdentName: '[name]-[local]-[hash:base64:5]',
                        })}`,
                    'postcss-loader',
                ].join('!')),
            },
            {
                test: /(assets\/sprite.svg)/,
                include: [
                    APP_DIR,
                    /node_modules\/yoda-/, /** Include yoda modules */
                ],
                loader: 'raw-loader',
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
        ],
    },
    resolve: {
        modulesDirectories: [
            IRIS_DIR,
            APP_DIR,
            'node_modules',
        ],
        extensions: ['', '.js', '.jsx', '.json'],
    },
    plugins: webpackPlugins, // plugins helps in custom build steps
    postcss() {
        return [
            require('postcss-smart-import')({
                path: [
                    APP_DIR,
                ],
            }),
            require('postcss-cssnext')(),
            require('postcss-browser-reporter')(),
            require('postcss-reporter')(),
            require('postcss-mixins')(),
        ];
    },
};

module.exports = config;
