var yadda = require('yadda');
var fs = require('fs');
/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-yadda',
  preBuild: function() {
    var features = [];
    new yadda
      .FeatureFileSearch('tests/acceptance')
      .each(function(file) {
          features.push(new yadda.parsers.FeatureFileParser().parse(file));
      });
    console.log(features);
    return new Promise(function(resolve, reject) {
      return fs.writeFile('tests/acceptance/features.js', 'export default ' + JSON.stringify(features) + ';', function(err) {
        if(err) {
          reject(err);
        }
        resolve();
      });
    });
  },
  treeForTestSupport: function() {

  },
  included: function(app) {
    this._super.included(app);
    app.import('/vendor/yadda-0.15.2.js', {type: 'test'});
  },
  isDevelopingAddon: function() {
   return true;
 }
};
