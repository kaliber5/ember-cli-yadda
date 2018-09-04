'use strict';

const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;
const emberGenerate = blueprintHelpers.emberGenerate;
const modifyPackages = blueprintHelpers.modifyPackages;

const chai = require('ember-cli-blueprint-test-helpers/chai');
const expect = chai.expect;
const file = chai.file;

const fixture = require('../helpers/fixture');

const testTypes = [
  'acceptance',
  'integration',
  'unit',
];

const frameworkTypes = [
  'qunit',
  'mocha'
];

describe('Acceptance: ember generate ember-cli-yadda', function() {
  setupTestHooks(this);

  beforeEach(function() {
    return emberNew();
  });

  frameworkTypes.forEach((testFramework) => {

    describe(testFramework, function() {

      if (testFramework === 'mocha') {
        beforeEach(function() {
          return modifyPackages([
            { name: 'ember-cli-qunit', delete: true },
            { name: 'ember-cli-mocha', dev: true }
          ]);
        });
      }

      it('adds required files', function() {
        let args = ['ember-cli-yadda'];

        let fixtureFiles = [
          'helpers/yadda-annotations.js'
        ].concat(
          testTypes.map((type) => `${type}/steps/steps.js`)
        );

        return emberGenerate(args)
          .then(() => fixtureFiles.forEach((fileName) => expect(file(`tests/${fileName}`)).to.equal(fixture(`main/${testFramework}/${fileName}`))));
      });
    });
  });
});
