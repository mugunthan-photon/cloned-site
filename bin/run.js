import path from 'path';
import { paths } from "../config";

const format = (time) => {
    return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
};

const run = (fn, options) => {
    const task = (typeof fn.default === 'undefined') ? fn : fn.default,
        start = new Date();

    console.log(`###[${format(start)}] Starting '${task.name}${options ? ` (${options})` : ''}'...`);
    return task(options).then((resolution) => {
        const end = new Date(),
            time = end.getTime() - start.getTime();

        console.log(`###[${format(end)}] Finished '${task.name}${options ? ` (${options})` : ''}' after ${time} ms`);
        return resolution;
    });
};

if (require.main === module && process.argv.length > 2) {
    let command = process.argv[2],
        commandFileName = path.join(paths.Bin, `${command}.js`),
        commandModuleRef;

    delete require.cache[__filename];

    if (command) {
        commandModuleRef = require(commandFileName);

        run(commandModuleRef).catch(err => {
            console.error(err.stack);
            process.exit(1);
        });
    } else {
        console.error(`${command} not found!`);
    }
}

export default run;
