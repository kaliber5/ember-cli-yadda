var yadda = require('yadda');
var Filter = require('broccoli-filter');
var path = require('path');
var inflected = require('inflected');

/* jshint node: true */
'use strict';

// voorbeeld van de brocolli-filter readme. bah en bah
FeatureParser.prototype = Object.create(Filter.prototype);
FeatureParser.prototype.constructor = FeatureParser;
function FeatureParser(inputNode, testFramework) {
  this.testFramework = testFramework;
  Filter.call(this, inputNode);
}
FeatureParser.prototype.extensions = ['feature', 'spec', 'specification'];
FeatureParser.prototype.targetExtension = 'js';
FeatureParser.prototype.processString = function(content, relativePath) {
  var feature = new yadda.parsers.FeatureParser().parse(content);
  var basePath = relativePath.split('/').slice(0,2).join('/');
  var nestedPath = relativePath.split('/').length > 4 ? relativePath.split('/').slice(3,-1).join('/') + '/' : '';
  var fileName = relativePath.split('/').slice(-1)[0].split('.')[0]; //remove extension

  var unitIndex = relativePath.split('/').indexOf('unit');
  var testType = unitIndex === -1? 'acceptance' : 'unit'; // Find if the current test is an acceptance or unit test
  var unitType = testType === 'unit'? relativePath.split('/').slice(unitIndex+1,unitIndex+2)[0] : false;
  var unitModule = testType === 'unit'? inflected.singularize(unitType)+':'+fileName : false;
  var stepsPath = basePath + "/"+testType+"/steps/" ;

  var head = [
    "import Ember from 'ember';",
    this.getTestFrameworkImport(),
    "import yadda from '" + basePath + "/helpers/yadda';",
    "import * as library from '" + stepsPath + nestedPath + fileName + "-steps';",
    "import startApp from '" + basePath + "/helpers/start-app';",
    "import destroyApp from '" + basePath + "/helpers/destroy-app';",
    "",
    this.getTestFeature(unitModule, fileName),
    "",
    "testFeature("
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
FeatureParser.prototype.getTestFrameworkImport = function() {
  switch (this.testFramework) {
    case 'mocha':
      return 'import { afterEach, beforeEach, describe, it } from \'mocha\';';
    default: // qunit
      return 'import { moduleFor, moduleForComponent, test } from \'ember-qunit\';\
              import { module } from \'qunit\';';
  }
};
FeatureParser.prototype.getTestFeature = function(unitModule,fileName) {
  var testFeature;
  switch (this.testFramework) {
    case 'mocha':
      testFeature = [
        "function testFeature(feature) {",
        "  describe(`Feature: ${feature.title}`, () => {",
        "    beforeEach(function() {",
        "      this.application = startApp();",
        "    });",
        "    afterEach(function() {",
        "      destroyApp(this.application);",
        "    });",
        "    ",
        "    feature.scenarios.forEach(function(scenario) {",
        "      it(`Scenario: ${scenario.title}`, function() {",
        "        let self = this;",
        "        return new Ember.RSVP.Promise(function(resolve) { yadda.Yadda(library.default(), self).yadda(scenario.steps, { ctx: {} }, resolve); });",
        "      });",
        "    });",
        "  });",
        "};"
      ];
      break;
    default: // qunit
      if(unitModule && unitModule.indexOf('component') === 0) {
        testFeature = [
          "function testFeature(feature) {",
          "  moduleForComponent('"+fileName+"', `Feature: ${feature.title}`, {",
          "     unit:true,",
          "     needs: feature.annotations.needs? feature.annotations.needs.split(',') : [],",
          "});",

          "  feature.scenarios.forEach(function(scenario) {",
          "    test(`Scenario: ${scenario.title}`, function(assert) {",
          "      let self = this;",
          "      return new Ember.RSVP.Promise(function(resolve){ yadda.Yadda(library.default(assert), self).yadda(scenario.steps, { ctx: {} }, resolve); });",
          "    });",
          "  });",
          "};"
        ];
      } else if(unitModule && unitModule.indexOf('model') === 0) {
        // TODO: Implement unit test for models
        // use moduleForModel
      } else if(unitModule) {
        // TODO: Implement unit test for generic classes
        // use moduleFor
      } else {
        testFeature = [
          "function testFeature(feature) {",
          "  module(`Feature: ${feature.title}`, {",
          "    beforeEach: function() {",
          "      this.application = startApp();",
          "    },",
          "    afterEach: function() {",
          "      destroyApp(this.application);",
          "    }",
          "  });",

          "  feature.scenarios.forEach(function(scenario) {",
          "    test(`Scenario: ${scenario.title}`, function(assert) {",
          "      return new Ember.RSVP.Promise(function (resolve) { yadda.Yadda(library.default(assert), this).yadda(scenario.steps, { ctx: {} }, resolve); });",
          "    });",
          "  });",
          "};"
        ];
      }
  }
  return testFeature.join('\n');
};

module.exports = {
  name: 'ember-cli-yadda',
  getTestFramework: function() {
    var packages = Object.keys(this.project.addonPackages);
    if (packages.indexOf('ember-cli-mocha') > -1) {
      return 'mocha';
    } else {
      return 'qunit';
    }
  },
  setupPreprocessorRegistry: function(type, registry) {
    var testFramework = this.getTestFramework();
    registry.add('js', {
      name: 'ember-cli-yadda',
      ext: ['feature', 'spec', 'specification'],
      toTree: function(tree, inputPath, outputPath) {
        return new FeatureParser(tree, testFramework);
      }
    });
  },
  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints', this.getTestFramework());
  },
  included: function(app) {
    this._super.included(app);
  }
};
