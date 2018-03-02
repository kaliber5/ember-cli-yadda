function testFeature(feature) {

  let featureAction = yaddaAnnotations.runFeature(feature.annotations);
  if (typeof featureAction === 'function') {
    featureAction.call(this, feature);
  } else {

    describe(`Feature: ${feature.title}`, function()  {
      beforeEach(function() {
        this.application = startApp();
      });
      afterEach(function() {
        destroyApp(this.application);
      });

      feature.scenarios.forEach(function(scenario) {

        let scenarioAction = yaddaAnnotations.runScenario(feature.annotations, scenario.annotations);
        if (typeof scenarioAction === 'function') {
          scenarioAction.call(this, scenario);
        } else {

          it(`Scenario: ${scenario.title}`, function() {
            let self = this;
            return new Ember.RSVP.Promise(function(resolve, reject) {
              yadda.Yadda(library.default(), self).yadda(scenario.steps, { ctx: {} }, function next(err, result) {
                err ? reject(err) : resolve(result);
              });
            });
          });

        }
      });
    });
  }
};
