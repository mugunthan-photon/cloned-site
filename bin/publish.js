import { execSync } from "child_process";
import run from "./run";
import build from "./build";
import { paths } from "../config";
import packageJson from "../package.json";

async function updatePackageVersion() {
    let updatedVersion = execSync(`npm version patch --prefix ${paths.Root} --no-git-tag-version`);

    console.log("old package version: ", packageJson.version);
    console.log("new package version: ", updatedVersion.toString());
}

async function publishPackage() {
    let publishResult = execSync(`npm publish ${paths.Build}`);

    console.log(publishResult.toString());
}

async function loginToNpm() {
  // console.log(execSync(`npm config set strict-ssl false`).toString());
  // console.log("Don't forget to do a npm login..");
}

export default async function publish() {
    await run(updatePackageVersion);
    await run(build);
    await run(loginToNpm);
    await run(publishPackage);
}
