const webpack = require('webpack');
const WebpackExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config');
const argv = require('yargs').argv;

console.log('--name', argv.name);
const compName = argv.name;
const inputIndexPath = `./src/components/${compName}/entry.jsx`;
const outputFileName = `${compName}.js`;
const compOutputPath = '../components-bundle';
module.exports = {
    // devtool: 'source-map',
    // debug: true,
    // entry: [
    //     './src/components/index-ds.jsx',
    // ],
    entry: [
        inputIndexPath,
    ],
    output: {
        path: compOutputPath,

        filename: outputFileName,
        libraryTarget: 'umd',
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false,
            },
        }),
        new WebpackExtractTextPlugin('styles.css', {
            allChunks: true,
        }),
    ],
    resolve: {
        root: [
            config.paths.Src,
        ],
        extensions: ['', '.js', '.jsx', '.json'],
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            include: [
                config.paths.Src,
                config.paths.Build,
                config.paths.yodaAppShellModule,
                config.paths.yodaCoreNodeModule,
                config.paths.yodaSiteComponentsNodeModule,
                config.paths.yodaInterfacesModule,
            ],
        }, {
            test: /\.css$/,
            include: [
                config.paths.Src,
                config.paths.Build,
                config.paths.yodaAppShellModule,
                config.paths.yodaCoreNodeModule,
                config.paths.yodaSiteComponentsNodeModule,
                config.paths.yodaInterfacesModule,
            ],
            loaders: [
                'style-loader',
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
            ],
        }, {
            test: /\.json$/,
            loader: 'json-loader',
        }, {
            test: /\.png$/,
            loader: 'url-loader?limit=100000',
        }, {
            test: /\.jpg$/,
            loader: 'file-loader',
        }, {
            test: /\.woff2(\?.*)?$/,
            loader: `url?${
                JSON.stringify({
                    prefix: 'fonts/',
                    name: '[path][name].[ext]',
                    limit: 10000,
                    mimetype: 'application/font-woff2',
                })}`,
        },
        {
            test: /\.svg$/,
            include: [
                config.paths.Src,
                config.paths.Build,
                config.paths.yodaAppShellModule,
                config.paths.yodaCoreNodeModule,
                config.paths.yodaSiteComponentsNodeModule,
                config.paths.yodaInterfacesModule,
            ],
            loaders: ['raw-loader'],
        },
        {
            test: require.resolve('react-redux'),
            loader: 'expose-loader?Redux',
        },
        ],
    },
    postcss: function () {
        return [
            require('postcss-smart-import')({
                path: [
                    config.paths.Src,
                    config.paths.Build,
                    config.paths.yodaAppShellModule,
                    config.paths.yodaCoreNodeModule,
                    config.paths.yodaSiteComponentsNodeModule,
                    config.paths.yodaInterfacesModule,
                ]
            }),
            require('postcss-cssnext')(),
            require('postcss-browser-reporter')(),
            require('postcss-reporter')(),
        ];
    }
};