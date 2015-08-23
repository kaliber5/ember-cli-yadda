import Ember from 'ember';
import { module, test } from 'qunit';
import {Yadda, featureFile, scenarios } from '../helpers/yadda-0.15.2';
import startApp from '/tests/helpers/start-app';

new Yadda.FeatureFileSearch('./').each(function(file) {

  const System = window.System || {};
  System['import'] = function(moduleName) {
      return Ember.RSVP.Promise.resolve(window.require(moduleName));
  };

  featureFile(file, function(feature) {
    const dasherizedFeatureTitle = feature.title.replace(/\s/g, '-');
    const stepFileName = `../steps/${dasherizedFeatureTitle}-step.js`;
    System
    .import(stepFileName)
    .then(library => {
      let yadda = Yadda.createInstance(library);

      module(`Feature: ${feature.title}`, {
        beforeEach: function() {
          this.application = startApp();
        },

        afterEach: function() {
          Ember.run(this.application, 'destroy');
        }
      });

      scenarios(feature.scenarios, function(scenario) {
        test(`Scenario: ${scenario.title}`, yadda.run(scenario));
      });
    });
  });
});
