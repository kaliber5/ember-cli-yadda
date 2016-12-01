function testFeature(feature) {
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
      if (scenario.annotations.ignore) {
        skip(`Scenario: ${scenario.title}`, function(assert) { });
      } else {
        test(`Scenario: ${scenario.title}`, function(assert) {
          return new Ember.RSVP.Promise(function (resolve) { yadda.Yadda(library.default(assert), this).yadda(scenario.steps, { ctx: {} }, resolve); });
        });
      }
    });
  }
};