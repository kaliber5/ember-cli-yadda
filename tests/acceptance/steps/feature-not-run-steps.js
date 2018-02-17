import steps from './steps';

// step definitions that are shared between features should be moved to the
// tests/acceptance/steps/steps.js file

export default function(assert) {
  return steps(assert)
    .given('this scenario has annotation @notRun', function(next) {
      assert.ok(false, this.step);
      next();
    })
    .given('the config does not specify the @notRun annotation', function(next) {
      assert.ok(false, this.step);
      next();
    })
    .when('I look at the test results', function(next) {
      assert.ok(false, this.step);
      next();
    })
    .then('the assert in the given step should not be shown as a failure', function(next) {
      assert.ok(false, this.step);
      next();
    });
}
