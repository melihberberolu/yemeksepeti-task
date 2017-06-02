require("babel-core").transform("code", {
  plugins: ["transform-decorators"]
});
require("babel-polyfill");
require("babel-register");

const browserEnv = require('browser-env');
global.document = require("jsdom").jsdom("<body></body>");

global.window = document.defaultView;
global.navigator = window.navigator;

browserEnv(['window', 'document', 'navigator', "localStorage"]);


function noop() {
  return null;
}

require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;
