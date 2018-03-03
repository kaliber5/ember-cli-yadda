'use strict';

const yadda = require('yadda');
const Filter = require('broccoli-persistent-filter');
const fs = require('fs');
const path = require('path');
const inflected = require('inflected');

class FeatureParser extends Filter {
  constructor(inputNode, testFramework, options) {
    super(inputNode);
    this.testFramework = testFramework;
    this.testRunnerCache = {};
    this.options = options;
    this.extensions = ['feature', 'spec', 'specification'];
    this.targetExtension = 'js';
  }

  processString(content, relativePath) {
    let feature = new yadda.parsers.FeatureParser().parse(content);
    let basePath = relativePath.split('/').slice(0, 2).join('/');
    let nestedPath = relativePath.split('/').length > 4 ? relativePath.split('/').slice(3, -1).join('/') + '/' : '';
    let fileName = relativePath.split('/').slice(-1)[0].split('.')[0]; //remove extension

    let unitIndex = relativePath.split('/').indexOf('unit');
    let testType = unitIndex === -1 ? 'acceptance' : 'unit'; // Find if the current test is an acceptance or unit test
    let unitType = testType === 'unit' ? relativePath.split('/').slice(unitIndex + 1, unitIndex + 2)[0] : false;
    let unitModule = testType === 'unit' ? inflected.singularize(unitType) + ':' + fileName : false;
    let stepsPath = basePath + "/" + testType + "/steps/";

    let head = [
      "import Ember from 'ember';",
      this.getTestFrameworkImport(),
      "import yadda from '" + basePath + "/helpers/yadda';",
      "import * as library from '" + stepsPath + nestedPath + fileName + "-steps';",
      "import startApp from '" + basePath + "/helpers/start-app';",
      "import destroyApp from '" + basePath + "/helpers/destroy-app';",
      "import yaddaAnnotations from '" + basePath + "/helpers/yadda-annotations';",
      "",
      this.getTestFeature(unitModule),
      "",
      "testFeature("
    ].join('\n');
    let foot = ');';

    return head + JSON.stringify(feature, null, 2) + foot;
  }

  getDestFilePath(relativePath) {
    let ext = path.extname(relativePath);
    if (ext === '.feature' || ext === '.spec' || ext === '.specifiation') {
      return relativePath.replace(ext, '-test.js');
    }
    return null;
  }

  getTestFrameworkImport() {
    switch (this.testFramework) {
      case 'mocha':
        return 'import { after, before, describe, it } from \'mocha\';';
      default: // qunit
        return 'import { moduleFor, moduleForComponent, test, skip } from \'ember-qunit\';\
              import { module } from \'qunit\';';
    }
  }

  getTestRunnerSource(testType) {
    if (typeof this.testRunnerCache[testType] === 'undefined') {
      let filePath = path.join(__dirname, './test-runner', this.testFramework);
      if (this.options.separateSteps === true) {
        filePath = path.join(filePath, 'separate');
      }
      let file = path.join(filePath, testType + '.js');

      if (!fs.existsSync(file)) {
        throw new Error('No test runner is currently available for ' + testType + ' tests with ' + this.testFramework + '. Missing file: ' + file);
      }

      this.testRunnerCache[testType] = fs.readFileSync(file);
    }
    return this.testRunnerCache[testType];
  }

  getTestFeature(unitModule) {
    if (unitModule && unitModule.indexOf('component') === 0) {
      return this.getTestRunnerSource('component');
    } else if (unitModule && unitModule.indexOf('model') === 0) {
      return this.getTestRunnerSource('model');
    } else if (unitModule) {
      return this.getTestRunnerSource('unit');
    } else {
      return this.getTestRunnerSource('acceptance');
    }
  }
}

module.exports = FeatureParser;
