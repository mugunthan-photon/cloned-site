import { cleanDir } from "./utils";
import { paths } from "../config";

export default async function clean() {
    await cleanDir(paths.Build);
}
