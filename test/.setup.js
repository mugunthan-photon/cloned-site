require('babel-register')();

var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('', { url: 'http://localhost/' });
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

if(global && global.window) {
  global.window.matchMedia = global.window.matchMedia || function() {
      return {
          matches : false,
          addListener : function() {},
          removeListener: function() {}
      };
  };
}

global.navigator = {
  userAgent: 'node.js'
};

//documentRef = document;
