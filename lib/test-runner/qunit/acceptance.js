function testFeature(feature) {

  let runFeature = yaddaAnnotations.runFeature(feature.annotations);
  if (!runFeature) {
    return;
  } else if (runFeature === 'skip') {
    skip(`Feature: ${feature.title}`, function(assert) { });
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

      let runScenario = yaddaAnnotations.runScenario(feature.annotations, scenario.annotations);
      if (!runScenario) {
        return;
      } else if (runScenario === 'skip') {
        skip(`Scenario: ${scenario.title}`, function(assert) { });
      } else {

        test(`Scenario: ${scenario.title}`, function(assert) {
          let self = this;
          return new Ember.RSVP.Promise(function(resolve) {
            yadda.Yadda(library.default(assert), self).yadda(scenario.steps, { ctx: {} }, function next(err, result) {
              if (err) {
                throw err;
              }
              resolve(result);
            });
          });
        });

      }
    });
  }
};
