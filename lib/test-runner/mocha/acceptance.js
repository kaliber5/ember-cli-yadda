function testFeature(feature) {
  let _this = this;
  if (feature.annotations.ignore) {
    describe.skip(`Feature: ${feature.title}`, () => {});
  } else {
    describe(`Feature: ${feature.title}`, function()  {
      beforeEach(function() {
        _this.application = startApp();
      });
      afterEach(function() {
        destroyApp(_this.application);
      });
      
      feature.scenarios.forEach(function(scenario) {
        it(`Scenario: ${scenario.title}`, function() {
          if (scenario.annotations.ignore) {
            this.skip();
          } else {
            let self = this;
            return new Ember.RSVP.Promise(function(resolve) { yadda.Yadda(library.default(), self).yadda(scenario.steps, { ctx: {} }, resolve); });
          }
        });
      });
    });
  }
};