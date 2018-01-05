global.__SERVER__ = false; // eslint-disable-line
const localStorage = new require('node-localstorage').LocalStorage('__yoda'); // eslint-disable-line

if (!global.window.localStorage) {
    global.window.localStorage = localStorage;
    global.localStorage = localStorage;
}
