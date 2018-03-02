/* eslint-env qunit */
/* globals yadda, library, moduleForComponent */
import { Promise as EmberPromise } from 'rsvp';
function testFeature(feature) { // eslint-disable-line no-unused-vars
  moduleForComponent('"+fileName+"', `Feature: ${feature.title}`, {
     unit:true,
     needs: feature.annotations.needs? feature.annotations.needs.split(',') : [],
  });

  feature.scenarios.forEach(function(scenario) {
    test(`Scenario: ${scenario.title}`, function(assert) {
      let self = this;
      return new EmberPromise(function(resolve, reject) {
        yadda.Yadda(library.default(assert), self).yadda(scenario.steps, { ctx: {} }, function next(err, result) {
          err ? reject(err) : resolve(result);
        });
      });
    });
  });
}
