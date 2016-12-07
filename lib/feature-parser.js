/* jshint node: true */
'use strict';

var yadda = require('yadda');
var Filter = require('broccoli-filter');
var fs = require('fs');
var path = require('path');
var inflected = require('inflected');

// voorbeeld van de brocolli-filter readme.
FeatureParser.prototype = Object.create(Filter.prototype);

FeatureParser.prototype.constructor = FeatureParser;
function FeatureParser(inputNode, testFramework, options) {
  this.testFramework = testFramework;
  this.testRunnerCache = {};
  this.options = options;
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
    this.getTestFeature(unitModule),
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
      return 'import { after, before, describe, it } from \'mocha\';';
    default: // qunit
      return 'import { moduleFor, moduleForComponent, test, skip } from \'ember-qunit\';\
              import { module } from \'qunit\';';
  }
};

FeatureParser.prototype.getTestRunnerSource = function(testType) {
  if (typeof this.testRunnerCache[testType] === 'undefined') {
    var filePath = path.join(__dirname, './test-runner', this.testFramework);
    if (this.options.separateSteps === true) {
      filePath = path.join(filePath, 'separate');
    }
    var file = path.join(filePath, testType + '.js');

    if (!fs.existsSync(file)) {
      throw new Error('No test runner is currently available for ' + testType + ' tests with ' + this.testFramework + '. Missing file: ' + file);
    }

    this.testRunnerCache[testType] = fs.readFileSync(file);
  }
  return this.testRunnerCache[testType];
};

FeatureParser.prototype.getTestFeature = function(unitModule) {
  if(unitModule && unitModule.indexOf('component') === 0) {
    return this.getTestRunnerSource('component');
  } else if(unitModule && unitModule.indexOf('model') === 0) {
    return this.getTestRunnerSource('model');
  } else if(unitModule) {
    return this.getTestRunnerSource('unit');
  } else {
    return this.getTestRunnerSource('acceptance');
  }
};

module.exports = FeatureParser;