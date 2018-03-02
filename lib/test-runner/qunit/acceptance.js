/* eslint-env qunit */
/* globals startApp, destroyApp, yadda, yaddaAnnotations, library */
import { Promise as EmberPromise } from 'rsvp';
function testFeature(feature) { // eslint-disable-line no-unused-vars

  let featureAction = yaddaAnnotations.runFeature(feature.annotations);
  if (typeof featureAction === 'function') {
    featureAction.call(this, feature);
  } else {

    module(`Feature: ${feature.title}`, {
      beforeEach: function() {
        this.application = startApp();
      },
      afterEach: function() {
        destroyApp(this.application);
      }
    });

    feature.scenarios.forEach(function(scenario) {

      let scenarioAction = yaddaAnnotations.runScenario(feature.annotations, scenario.annotations);
      if (typeof scenarioAction === 'function') {
        scenarioAction.call(this, scenario);
      } else {

        test(`Scenario: ${scenario.title}`, function(assert) {
          let self = this;
          return new EmberPromise(function(resolve, reject) {
            yadda.Yadda(library.default(assert), self).yadda(scenario.steps, { ctx: {} }, function next(err, result) {
              err ? reject(err) : resolve(result);
            });
          });
        });

      }
    });
  }
}
