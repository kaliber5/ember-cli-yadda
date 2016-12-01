function testFeature(feature) {
  describe(`Feature: ${feature.title}`, () => {
    if (feature.annotations.ignore) {
      this.skip();
    } else {
      feature.scenarios.forEach(function(scenario) {
        describe(`Scenario: ${scenario.title}`, function() {
          if (feature.annotations.ignore) {
            this.skip();
          } else {
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
          }
        });
      });
    }
  });
}