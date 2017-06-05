function testFeature(feature) {
  if (feature.annotations.ignore) {
    skip(`Feature: ${feature.title}`, function(assert) { });
  } else {
    moduleForAcceptance(`Acceptance Feature: ${feature.title}`, {
      beforeEach: function() {
        authenticateSession(this.application);

        server.loadFixtures();
      },
    });

    feature.scenarios.forEach(function(scenario) {
      if (scenario.annotations.ignore) {
        skip(`Scenario: ${scenario.title}`, function(assert) { });
      } else {
        test(`Scenario: ${scenario.title}`, function(assert) {
          return new Ember.RSVP.Promise((resolve) => {
            yadda.Yadda(library(assert, this.application), this).yadda(scenario.steps, { ctx: {} }, resolve);
          });
        });
      }
    });
  }
};
