var lintConfig = {
    module: {
        preLoaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
            },
        ]
    }
};

module.exports = lintConfig;
