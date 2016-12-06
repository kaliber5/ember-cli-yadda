function testFeature(feature) {
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
                  let promise = new Ember.RSVP.Promise(function(resolve) { yadda.Yadda(library.default(), self).yadda(step, context, resolve); });
                  promise.catch(function() {
                    failed = true;
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