'use strict';

const path = require('path');
const FeatureParser = require('./lib/feature-parser');

module.exports = {
  name: require('./package').name,

  options: {
    autoImport: {
      exclude: ['mocha', 'qunit'],
      webpack: {
        node: {
          fs: 'empty',
        },
      },
    },
  },
  getTestFramework() {
    let dependencies = this.project.dependencies();
    if ('ember-cli-mocha' in dependencies || 'ember-mocha' in dependencies) {
      return 'mocha';
    } else {
      return 'qunit';
    }
  },
  setupPreprocessorRegistry(type, registry) {
    let testFramework = this.getTestFramework();
    let self = this;
    registry.add('js', {
      name: 'ember-cli-yadda',
      ext: ['feature', 'spec', 'specification'],
      toTree(tree) {
        return new FeatureParser(tree, testFramework, self._options);
      },
    });
  },
  blueprintsPath() {
    return path.join(__dirname, 'blueprints', this.getTestFramework());
  },
  included(app) {
    this._super.included.apply(this, arguments);
    let options = app.options['ember-cli-yadda'] || {};
    if (typeof options.persist === 'undefined') {
      options.persist = true;
    }
    this._options = options;
  },
};
