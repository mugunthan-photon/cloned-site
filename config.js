const path = require('path');

const rootPath = path.resolve(__dirname);
const srcPath = path.join(rootPath, './src');
const binPath = path.join(rootPath, './bin');
const buildPath = path.join(rootPath, './build');
const distPath = path.join(buildPath, './dist');
const publicPath = path.join(srcPath, './public');
const indexHtmlPath = path.join(srcPath, './public/index.hbs');
const appFilePath = path.join(srcPath, './app.jsx');

const nodeModulesPath = path.join(rootPath, './node_modules');
const yodaCoreNodeModulePath = path.join(nodeModulesPath, './yoda-core-components');
const yodaSiteComponentsNodeModulePath = path.join(nodeModulesPath, './yoda-site-components');
const yodaInterfacesModulePath = path.join(nodeModulesPath, './yoda-interfaces');
const yodaAppShellModulePath = path.join(nodeModulesPath, './yoda-app-shell');

module.exports = {
    paths: {
        Root: rootPath,
        Src: srcPath,
        Build: buildPath,
        Dist: distPath,
        Bin: binPath,
        IndexHtml: indexHtmlPath,
        AppFilePath: appFilePath,
        publicPath,
        NodeModules: nodeModulesPath,
        yodaCoreNodeModule: yodaCoreNodeModulePath,
        yodaSiteComponentsNodeModule: yodaSiteComponentsNodeModulePath,
        yodaInterfacesModule: yodaInterfacesModulePath,
        yodaAppShellModule: yodaAppShellModulePath,
    },
    hostname: 'localhost',
    port: 3000,
};
