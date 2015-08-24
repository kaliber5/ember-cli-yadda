import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import features from './features';

// const { FeatureFileSearch, parsers: { FeatureParser:FeatureParser } } = require('yadda');

// new FeatureFileSearch('./').each(function(file) {
//
  const System = window.System || {};
  System['import'] = function(moduleName) {
      return Ember.RSVP.Promise.resolve(window.require(moduleName));
  };
//
//   new FeatureParser.parse(file)
features.forEach(function(feature) {
  const dasherizedFeatureTitle = feature.title.replace(/\s/g, '-');
  const stepFileName = `dummy/tests/acceptance/steps/${dasherizedFeatureTitle}-step`;

  System
  .import(stepFileName)
  .then(library => {
    //let yadda = Yadda(library);

    module(`Feature: ${feature.title}`, {
      beforeEach: function() {
        this.application = startApp();
      },

      afterEach: function() {
        Ember.run(this.application, 'destroy');
      }
    });

    feature.scenarios.forEach(function(scenario) {
      console.log(JSON.stringify(scenario));
      test(`Scenario: ${scenario.title}`, function(assert) {
        expect(scenario.steps.length);
        yadda(library.default(assert), scenario);
      });
    });
  });
});
