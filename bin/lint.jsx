import { execSync } from "child_process";
import { paths } from "../config";

export default async function lint() {
    await execSync(`${paths.Root}/node_modules/.bin/eslint ${paths.Src}`
        + ` --config ${paths.Root}/.eslintrc --fix`,{stdio: 'inherit'});
}
