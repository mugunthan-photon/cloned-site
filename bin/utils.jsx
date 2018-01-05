import fs from 'fs';
import path from 'path';
import glob from 'glob';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';

const readFile = (file) => new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => (err ? reject(err) : resolve(data)));
});

const writeFile = (file, contents) => new Promise((resolve, reject) => {
    fs.writeFile(file, contents, 'utf8', err => (err ? reject(err) : resolve()));
});

const copyFile = (source, target) => new Promise((resolve, reject) => {
    let isCbCalled = false;

    function done(err) {
        if (!isCbCalled) {
            isCbCalled = true;
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        }
    }

    const readStream = fs.createReadStream(source);
    readStream.on('error', err => done(err));

    const writeStream = fs.createWriteStream(target);
    writeStream.on('error', err => done(err));
    writeStream.on('close', err => done(err));

    readStream.pipe(writeStream);
});

const readDir = (pattern, options) => new Promise((resolve, reject) =>
    glob(pattern, options, (err, result) => (err ? reject(err) : resolve(result))),
);

const makeDir = (name) => new Promise((resolve, reject) => {
    mkdirp(name, err => (err ? reject(err) : resolve()));
});

const copyDir = async(source, target) => {
    const dirs = await readDir('**/*.*', {
        cwd: source,
        nosort: true,
        dot: true,
    });

    await Promise.all(dirs.map(async dir => {
        const from = path.resolve(source, dir);
        const to = path.resolve(target, dir);
        await makeDir(path.dirname(to));
        await copyFile(from, to);
    }));
};

const cleanDir = (pattern, options) => new Promise((resolve, reject) =>
    rimraf(pattern, {glob: options}, (err, result) => (err ? reject(err) : resolve(result))),
);

export { cleanDir, copyDir, readDir, makeDir, readFile, writeFile, copyFile };
