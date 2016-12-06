function testFeature(feature) {
  describe(`Feature: ${feature.title}`, () => {
    if (feature.annotations.ignore) {
      this.skip();
    } else {
      beforeEach(function() {
        this.application = startApp();
      });
      afterEach(function() {
        destroyApp(this.application);
      });
      
      feature.scenarios.forEach(function(scenario) {
        if (scenario.annotations.ignore) {
          this.skip();
        } else {
          it(`Scenario: ${scenario.title}`, function() {
            let self = this;
            return new Ember.RSVP.Promise(function(resolve) { yadda.Yadda(library.default(), self).yadda(scenario.steps, { ctx: {} }, resolve); });
          });
        }
      });
    }
  });
};