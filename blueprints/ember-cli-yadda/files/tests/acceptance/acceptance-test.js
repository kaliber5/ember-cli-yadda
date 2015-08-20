import Yadda from 'yadda';
import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '/tests/helpers/start-app';




Yadda.plugins.mocha.StepLevelPlugin.init();

new Yadda.FeatureFileSearch('./').each(function(file) {

  featureFile(file, function(feature) {
    let stepFileName = `../steps/${feature.title}-step.js`
    import * as library from stepFileName;
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
