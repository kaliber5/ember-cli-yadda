'use strict';

const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;
const emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;
const modifyPackages = blueprintHelpers.modifyPackages;

const expect = require('ember-cli-blueprint-test-helpers/chai').expect;

const fixture = require('../helpers/fixture');

describe('Acceptance: ember generate and destroy feature', function() {
  setupTestHooks(this);

  beforeEach(function() {
    return emberNew();
  });

  [
    'qunit',
    'mocha'
  ].forEach((testFramework) => {

    describe(testFramework, function() {

      if (testFramework === 'mocha') {
        beforeEach(function() {
          return modifyPackages([
            { name: 'ember-cli-qunit', delete: true },
            { name: 'ember-cli-mocha', dev: true }
          ]);
        });
      }

      it('feature foo', function() {
        let args = ['feature', 'foo'];

        // pass any additional command line options in the arguments array
        return emberGenerateDestroy(args, (file) => {
          expect(file('tests/acceptance/foo.feature')).to.equal(fixture('acceptance/foo.feature'));
          expect(file('tests/acceptance/steps/foo-steps.js')).to.equal(fixture(`acceptance/${testFramework}/foo-steps.js`));
        });
      });
    });
  });
});
