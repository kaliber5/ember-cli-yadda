'use strict';

const yadda = require('yadda');
const Filter = require('broccoli-persistent-filter');
const path = require('path');

class FeatureParser extends Filter {
  constructor(inputNode, testFramework, options) {
    super(inputNode);
    this.testFramework = testFramework;
    this.testRunnerCache = {};
    this.options = options;
    this.extensions = ['feature', 'spec', 'specification'];
    this.targetExtension = 'js';

    let yaddaOptions = options.yaddaOptions || {};
    if (typeof yaddaOptions.language === 'string') {
      yaddaOptions.language = yadda.localisation[yaddaOptions.language];
    }
    this.yaddaOptions = yaddaOptions;
  }

  processString(content, relativePath) {
    let feature = new yadda.parsers.FeatureParser(this.yaddaOptions).parse(content);
    let pathParts = relativePath.split('/');
    let basePath = pathParts.slice(0, 2).join('/');
    let fileName = pathParts.slice(-1)[0].split('.')[0]; //remove extension

    let testFolder = pathParts[2];
    let nestedFolderParts = pathParts.slice(3, -1);
    let stepsPath = [basePath, testFolder, 'steps', ...nestedFolderParts].join('/');

    let module = `
      import yadda from '${basePath}/helpers/yadda';
      import * as library from '${stepsPath}/${fileName}-steps';
      import yaddaAnnotations from '${basePath}/helpers/yadda-annotations';
      import testRunner from 'ember-cli-yadda/test-support/${this.testFramework}/test-runner';

      const feature = ${JSON.stringify(feature, null, 2)};

      testRunner(feature, yadda, yaddaAnnotations, library);
    `;

    return module;
  }

  getDestFilePath(relativePath) {
    let ext = path.extname(relativePath);
    if (ext === '.feature' || ext === '.spec' || ext === '.specification') {
      return relativePath.replace(ext, '-test.js');
    }
    return null;
  }
}

module.exports = FeatureParser;
