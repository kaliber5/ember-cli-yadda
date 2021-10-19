import { describe, it } from 'mocha';
import { Promise as EmberPromise } from 'rsvp';

// eslint-disable-next-line no-unused-vars
export default function testFeature(feature, yadda, yaddaAnnotations, library) {
  let featureAction = yaddaAnnotations.runFeature(feature.annotations);
  if (typeof featureAction === 'function') {
    featureAction.call(this, feature);
  } else {
    describe(`Feature: ${feature.title}`, function () {
      let setupFeature =
        typeof yaddaAnnotations.setupFeature === 'function'
          ? yaddaAnnotations.setupFeature(feature.annotations)
          : undefined;
      if (typeof setupFeature === 'function') {
        setupFeature.call(this);
      }

      feature.scenarios.forEach(function (scenario) {
        let setupScenario =
          typeof yaddaAnnotations.setupScenario === 'function'
            ? yaddaAnnotations.setupScenario(
                feature.annotations,
                scenario.annotations
              )
            : undefined;
        if (typeof setupScenario === 'function') {
          // if feature has custom setup, wrap it in another module to use its own beforeEach/afterEach hooks
          describe(`Scenario: ${scenario.title}`, function () {
            setupScenario.call(this);
            testScenario(scenario, feature, yadda, yaddaAnnotations, library);
          });
        } else {
          testScenario(scenario, feature, yadda, yaddaAnnotations, library);
        }
      });
    });
  }
}

function testScenario(scenario, feature, yadda, yaddaAnnotations, library) {
  let scenarioAction = yaddaAnnotations.runScenario(
    feature.annotations,
    scenario.annotations
  );
  if (typeof scenarioAction === 'function') {
    scenarioAction.apply(this, arguments);
  } else {
    it(`Scenario: ${scenario.title}`, function () {
      let self = this;
      return new EmberPromise(function (resolve, reject) {
        yadda
          .Yadda(library.default(), self)
          .yadda(scenario.steps, { ctx: {} }, function next(err, result) {
            if (err) {
              reject(err);
            }
            resolve(result);
          });
      });
    });
  }
}
