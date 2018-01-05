import { makeDir, copyFile, writeFile, copyDir } from "./utils";
import { execSync } from "child_process";
import path from "path";
import { paths } from "../config";
import run from "./run";
import clean from "./clean";
import lint from "./lint";

const configFileNames = [
    ".babelrc",
    ".editorconfig",
    ".eslintignore",
    ".eslintrc",
    ".gitignore",
    ".istanbul.yml",
    ".stylelintignore",
    ".stylelintrc",
    "package.json",
    "README.md"
  ],
  buildIndexPath = path.join(paths.Build, "index.js"),
  libPath = path.join(paths.Build, "./lib"),
  webpackConfigPath = path.join(paths.Root, "webpack/webpack.prod.config.js");

async function make() {
  // Create an empty directory called lib
  await makeDir(libPath);

  // Copy the config files to build directory
  await configFileNames.forEach((configFileName) => {
    copyFile(path.join(paths.Root, configFileName), path.join(paths.Build, configFileName));
  });

  // Copy the src directory to lib directory
  //TODO:We need to check if code to be compiled or not execSync(`babel ${paths.Src} -d ${libPath} --copy-files`);
  await copyDir(paths.Src, libPath);

  // Creating the dist contents using webpack
  //TODO:Uncomment this if we need execSync(`./node_modules/.bin/webpack -p --config ${webpackConfigPath}`);

  // Creating the base index file to export yoda-core-components
  await writeFile(buildIndexPath, `module.exports = require('./lib');`);
}

export default async function build() {
  await run(lint);
  await run(clean);
  await run(make);
}
