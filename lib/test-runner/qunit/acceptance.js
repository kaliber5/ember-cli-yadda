function testFeature(feature) {

  // if a runFeature function is provided, use it to determine if should run the feature
  if (typeof(runFeature) === 'function' && !runFeature(feature.annotations)) {
    console.log('not running feature: ', feature.title);
    return;
  }

  if (feature.annotations.ignore) {
    skip(`Feature: ${feature.title}`, function(assert) { });;
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

      // if a runScenario function is provided, use it to determine if should run the scenario
      if (typeof(runScenario) === 'function' && !runScenario(scenario.annotations)) {
        console.log('not running scenario: ', scenario.title);
        return;
      }

      if (scenario.annotations.ignore) {
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
