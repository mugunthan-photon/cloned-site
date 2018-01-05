import { execSync } from 'child_process';
import { paths } from '../config';

/**
 * Executes eslint in command line
 * --ext : Helps in defining the extension to be checked for .js,.jsx.
 * --config : To pick the configuration from.
 * --fix : autofixes lint issues
 * --ignore-pattern : To ignore files of particular pattern.
 * e.g To ignore test files from linting use *.test.jsx
 */
export default async function lint() {
    await execSync(`${paths.Root}/node_modules/.bin/eslint --ext .jsx,.js ${paths.Src}`
        + ` --config ${paths.Root}/.eslintrc --fix`, { stdio: 'inherit' });
}
