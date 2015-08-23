/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-addon');
// var isProduction = EmberApp.env() === 'production';

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });
    // app.import('yadda', { type: 'test' } );
  // if ( !isProduction ) {
  //   app.import('npm:yadda', { type: 'test' } );
  // }
  /*
    This build file specifes the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
