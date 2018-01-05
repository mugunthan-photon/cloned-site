var webpack = require('webpack');

var genDefaultWebpackConfig = require('@kadira/storybook/dist/server/config/defaults/webpack.config.js'),
    config = require("../config");

function addPostCssConfig(webpackConfig) {
    webpackConfig.postcss = function () {
        return [
            require('postcss-smart-import')({
                path: [
                    config.paths.Src,
                    config.paths.Build,
                    config.paths.yodaAppShellModule,
                    config.paths.yodaCoreNodeModule,
                    config.paths.yodaSiteComponentsNodeModule,
                    config.paths.yodaInterfacesModule
                ]
            }),
            require("postcss-cssnext")(),
            require("postcss-browser-reporter")(),
            require("postcss-reporter")(),
            require("postcss-mixins")(),
        ];
    };
}

function addPlugIn(webpackConfig) {
    //console.log(webpackConfig.plugins);
    webpackConfig.plugins.forEach(function (plugin, index) {
        if (plugin instanceof webpack.DefinePlugin) {
            plugin.definitions['__SERVER__'] = false;
        }
    });
}

function addLoaders(webpackConfig) {
    webpackConfig.module.preLoaders = [
        {
            test: /\.(js|jsx)$/,
            loaders: ['eslint-loader'],
            include: [
                config.paths.Src,
                config.paths.Build,
                config.paths.yodaAppShellModule,
                config.paths.yodaCoreNodeModule,
                config.paths.yodaSiteComponentsNodeModule,
                config.paths.yodaInterfacesModule
            ],
        }
    ];

    webpackConfig.module.loaders.forEach(function (moduleLoader, index) {

        if (RegExp(moduleLoader.test).test("SampleJSXTestingName.jsx")) {
            webpackConfig.module.loaders[index].exclude.pop();
        }

        if (RegExp(moduleLoader.test).test("SampleStyleSheetRegexTestingName.css")) {
            webpackConfig.module.loaders[index] = {
                test: /\.css$/,
                include: [
                    config.paths.Src,
                    config.paths.Build,
                    config.paths.yodaAppShellModule,
                    config.paths.yodaCoreNodeModule,
                    config.paths.yodaSiteComponentsNodeModule,
                    config.paths.yodaInterfacesModule
                ],
                loaders: [
                    'style-loader',
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
                            localIdentName: "[name]-[local]-[hash:base64:5]"
                        })}`,
                    'postcss-loader'
                ],
            };
        }

        if (RegExp(moduleLoader.test).test("SampleTestingName.svg")) {
            webpackConfig.module.loaders[index] = {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/, // removed svg
                include: config.paths.rootPath,
                loader: 'file-loader',
                query: {
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            };
        }
    });
}

function addReactPerf(webpackConfig) {
    webpackConfig.module.loaders.push(
        {
            test: require.resolve("react-addons-perf"),
            loader: "expose?ReactPerf"
        });
}

function addSpriteLoader(webpackConfig) {
    webpackConfig.module.loaders.push(
        {
            test: /\.svg$/,
            include: [
                config.paths.Src,
                config.paths.Build,
                config.paths.yodaAppShellModule,
                config.paths.yodaCoreNodeModule,
                config.paths.yodaSiteComponentsNodeModule,
                config.paths.yodaInterfacesModule
            ],
            loaders: ['raw-loader'],
        });
}

function addDevServerConfig(webpackConfig) {
    webpackConfig.devServer = Object.assign({}, webpackConfig.devServer);
    webpackConfig.devServer.noInfo = true;
    webpackConfig.devServer.hot = true;
}

module.exports = function (config, env) {
    var storybookBaseConfig = genDefaultWebpackConfig(config, env);

    // adding pollyfills to the top of the entry.
    storybookBaseConfig.entry.preview.unshift("babel-polyfill");

    if (env === "PRODUCTION") {

    } else {
        addPostCssConfig(storybookBaseConfig);
        addDevServerConfig(storybookBaseConfig);
        addLoaders(storybookBaseConfig);
        addPlugIn(storybookBaseConfig);
        addReactPerf(storybookBaseConfig);
        addSpriteLoader(storybookBaseConfig);
    }

    return storybookBaseConfig;
};
