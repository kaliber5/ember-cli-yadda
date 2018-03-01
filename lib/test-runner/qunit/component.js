function testFeature(feature) {
  moduleForComponent('"+fileName+"', `Feature: ${feature.title}`, {
     unit:true,
     needs: feature.annotations.needs? feature.annotations.needs.split(',') : [],
  });

  feature.scenarios.forEach(function(scenario) {
    test(`Scenario: ${scenario.title}`, function(assert) {
      let self = this;
      return new Ember.RSVP.Promise(function(resolve, reject) {
        yadda.Yadda(library.default(assert), self).yadda(scenario.steps, { ctx: {} }, function next(err, result) {
          err ? reject(err) : resolve(result);
        });
      });
    });
  });
}
