/* eslint-env mocha */
/* globals startApp, destroyApp, yadda, library */
import { Promise as EmberPromise } from 'rsvp';
function testFeature(feature) { // eslint-disable-line no-unused-vars
  if (feature.annotations.ignore) {
    describe.skip(`Feature: ${feature.title}`, () => {});
  } else {
    describe(`Feature: ${feature.title}`, function() {
      feature.scenarios.forEach(function(scenario) {
        if (scenario.annotations.ignore) {
          describe.skip(`Scenario: ${scenario.title}`, () => {});
        } else {
          describe(`Scenario: ${scenario.title}`, function() {
            before(function() {
              this.application = startApp();
            });

            after(function() {
              destroyApp(this.application);
            });

            let context = { ctx: {} };
            let failed = false;
            scenario.steps.forEach(function(step) {
              it(step, function() {
                if (failed === true) {
                  this.test.pending = true;
                  this.skip();
                } else {
                  let self = this;
                  let promise = new EmberPromise(function(resolve, reject) {
                    yadda.Yadda(library.default(), self).yadda(step, context, function next(err, result) {
                      if (err) {
                        failed = true;
                        reject(err);
                      } else {
                        resolve(result);
                      }
                    });
                  });

                  return promise;
                }
              });
            });
          });
        }
      });
    });
  }
}
