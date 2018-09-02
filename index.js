'use strict';

const path = require('path');
const FeatureParser = require('./lib/feature-parser');

module.exports = {
  name: 'ember-cli-yadda',
  options: {
    autoImport:{
      exclude: ['mocha'],
      webpack: {
        node: {
          fs: "empty"
        }
      }
    }
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
      }
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
  treeForAddonTestSupport(tree) {
    // intentionally not calling _super here
    // so that can have our `import`'s be
    // import { yadda } from 'ember-cli-yadda';
    // shamelessly stolen from https://github.com/cibernox/ember-native-dom-helpers/blob/19adea1683fc386baca6eb7c83cd0a147bd4d586/index.js
    // and https://github.com/kaliber5/ember-window-mock/blob/master/index.js#L7-L24

    const Funnel = require('broccoli-funnel');

    let namespacedTree = new Funnel(tree, {
      srcDir: '/',
      destDir: `/${this.moduleName()}`,
      annotation: `Addon#treeForTestSupport (${this.name})`,
    });

    return this.preprocessJs(namespacedTree, '/', this.name, {
      registry: this.registry,
    });
  }
};
