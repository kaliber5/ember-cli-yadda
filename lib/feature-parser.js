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

    //pull language from original options, if it exists
    this.yaddaLanguage = 'English';
    if (options.yaddaOptions && options.yaddaOptions.language) {
      this.yaddaLanguage = options.yaddaOptions.language;
    }

    //clone options and change change language to be the object
    this.yaddaOptions = Object.assign({}, options.yaddaOptions);
    this.yaddaOptions.language = yadda.localisation[this.yaddaLanguage];
  }

  processString(content, relativePath) {
    let feature = new yadda.parsers.FeatureParser(this.yaddaOptions).parse(
      content
    );
    let pathParts = relativePath.split('/');
    // normalize path to always start from the `tests` folder, as this can be different in Embroider
    pathParts.splice(
      0,
      pathParts.findIndex((p) => p === 'tests')
    );

    let fileName = pathParts.slice(-1)[0].split('.')[0]; //remove extension

    let testFolder = pathParts[1];
    let nestedFolderParts = pathParts.slice(2, -1);
    let relativePathToTests = Array(nestedFolderParts.length + 1).fill('..');
    let stepsPath = [
      ...relativePathToTests,
      testFolder,
      'steps',
      ...nestedFolderParts,
    ].join('/');
    let testPath = relativePathToTests.join('/');

    let module = `
      import yadda from 'yadda';
      import * as library from '${stepsPath}/${fileName}-steps';
      import * as yaddaAnnotations from '${testPath}/helpers/yadda-annotations';
      import testRunner from 'ember-cli-yadda/test-support/${
        this.testFramework
      }/test-runner';

      const feature = ${JSON.stringify(feature, null, 2)};

      yadda.localisation.default = yadda.localisation.${this.yaddaLanguage};

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
