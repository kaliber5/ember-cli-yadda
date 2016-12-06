function testFeature(feature) {
  describe(`Feature: ${feature.title}`, () => {
    beforeEach(function() {
      this.application = startApp();
    });
    afterEach(function() {
      destroyApp(this.application);
    });
    
    feature.scenarios.forEach(function(scenario) {
      it(`Scenario: ${scenario.title}`, function() {
        let self = this;
        return new Ember.RSVP.Promise(function(resolve) { yadda.Yadda(library.default(), self).yadda(scenario.steps, { ctx: {} }, resolve); });
      });
    });
  });
};