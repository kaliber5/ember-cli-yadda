import Ember from 'ember';
import { module, test } from 'qunit';
import { createInstance } from 'yadda';
import * as library from './steps'
import startApp from './start-app';

export default function(feature) {
  module(`Feature: ${feature.title}`, {
    beforeEach: function() {
      this.application = startApp();
    },
    afterEach: function() {
      Ember.run(this.application, 'destroy');
    }
  });

  feature.scenarios.forEach(function(scenario) {
    test(`Scenario: ${scenario.title}`, function(assert) {
      expect(scenario.steps.length);
      createInstance(library.default(assert)).run(scenario.steps);
    });
  });
};
