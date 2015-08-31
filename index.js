var yadda = require('yadda');
var Filter = require('broccoli-filter');
var path = require('path');

/* jshint node: true */
'use strict';

// voorbeeld van de brocolli-filter readme. bah en bah
FeatureParser.prototype = Object.create(Filter.prototype);
FeatureParser.prototype.constructor = FeatureParser;
function FeatureParser(inputNode) {
  Filter.call(this, inputNode);
}
FeatureParser.prototype.extensions = ['feature', 'spec', 'specification'];
FeatureParser.prototype.targetExtension = 'js';
FeatureParser.prototype.processString = function(content, relativePath) {
  var feature = new yadda.parsers.FeatureParser().parse(content);
  var head = [
    "import Ember from 'ember';",
    "import { module, test } from 'qunit';",
    "import { createInstance } from 'yadda';",
    "import * as library from './steps/" + feature.title.replace(/\s/,'-') + "-steps';",
    "import startApp from '../helpers/start-app';",

    "function yadda(feature) {",
    "  module(`Feature: ${feature.title}`, {",
    "    beforeEach: function() {",
    "      this.application = startApp();",
    "    },",
    "    afterEach: function() {",
    "      Ember.run(this.application, 'destroy');",
    "    }",
    "  });",

    "  feature.scenarios.forEach(function(scenario) {",
    "    test(`Scenario: ${scenario.title}`, function(assert) {",
    "      expect(scenario.steps.length);",
    "      createInstance(library.default(assert)).run(scenario.steps);",
    "    });",
    "  });",
    "};",
    "",
    "yadda("
  ].join('\n');
  var foot = ');';
  return head + JSON.stringify(feature, null, 2) + foot;
};
FeatureParser.prototype.getDestFilePath = function (relativePath) {
  var ext = path.extname(relativePath);
  if(ext === '.feature' || ext === '.spec' || ext === '.specifiation') {
    return relativePath.replace(ext, '-test.js');
  }
  return null;
};

module.exports = {
  name: 'ember-cli-yadda',
  setupPreprocessorRegistry: function(type, registry) {
    registry.add('js', {
      name: 'ember-cli-yadda',
      ext: ['feature', 'spec', 'specification'],
      toTree: function(tree, inputPath, outputPath) {
        return new FeatureParser(tree);
      }
    });
  },
  postBuild: function(result) {
    result.directory
  },
  included: function(app) {
    this._super.included(app);
    app.import(app.bowerDirectory + '/yadda/dist/yadda-0.15.1.js', {
      type: 'test',
      exports: {
        'yadda': [
          'createInstance',
          'localisation'
        ]
      }
    });
  },
  isDevelopingAddon: function() {
   return true;
 }
};
