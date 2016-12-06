function testFeature(feature) {
  module(`Feature: ${feature.title}`, {
    beforeEach: function() {
      this.application = startApp();
    },
    afterEach: function() {
      destroyApp(this.application);
    }
  });

  feature.scenarios.forEach(function(scenario) {
    test(`Scenario: ${scenario.title}`, function(assert) {
      return new Ember.RSVP.Promise(function (resolve) { yadda.Yadda(library.default(assert), this).yadda(scenario.steps, { ctx: {} }, resolve); });
    });
  });
};