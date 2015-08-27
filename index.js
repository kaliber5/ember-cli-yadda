var yadda = require('yadda');
var fs = require('fs');
var BMergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');
/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-yadda',
  // preBuild: function() {
  //   var features = [];
  //   new yadda
  //     .FeatureFileSearch('tests/acceptance')
  //     .each(function(file) {
  //         features.push(new yadda.parsers.FeatureFileParser().parse(file));
  //     });
  //   console.log(features);
  //   return new Promise(function(resolve, reject) {
  //     return fs.writeFile('test-support/acceptance/features.js', 'export default ' + JSON.stringify(features) + ';', function(err) {
  //       if(err) {
  //         reject(err);
  //       }
  //       resolve();
  //     });
  //   });
  // },
  treeForTestSupport: function(tree) {
    var features = [];
    new yadda
      .FeatureFileSearch('tests/acceptance')
      .each(function(file) {
          features.push(new yadda.parsers.FeatureFileParser().parse(file));
      });
    return new Promise(function(resolve, reject) {
      return fs.writeFile('tmp/features/acceptance/features.js', 'export default ' + JSON.stringify(features) + ';', function(err) {
        if(err) {
          reject(err);
        }
        resolve();
      });
    }).then(function() {
      return new BMergeTrees(['tree', 'tmp/features'])
    });
  },
  included: function(app) {
    this._super.included(app);
    app.import(app.bowerDirectory + '/yadda/dist/yadda-0.15.1.js', {
      type: 'test',
      exports: {
        'yadda': [
          'createInstance'
        ]
      }
    });
  },
  isDevelopingAddon: function() {
   return true;
 }
};
