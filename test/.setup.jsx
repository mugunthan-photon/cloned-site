require('babel-register')({
    ignore: /node_modules\/(?!yoda-*)/
});

global.__SERVER__ = false; // for server side rendering
var jsdom = require('jsdom').jsdom,
    exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('', { url: 'http://localhost/' });
global.window = document.defaultView;
global.navigator = {
    userAgent: 'node.js'
};

if(global && global.window) {
  global.window.matchMedia = global.window.matchMedia || function() {
      return {
          matches : false,
          addListener : function() {},
          removeListener: function() {}
      };
  };
}


Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});
