import steps from './steps';

// step definitions that are shared between features should be moved to the
// tests/acceptance/steps/steps.js file

export default function(assert) {
  return steps(assert)
    .given('this scenario has annotation @notRun', function() {
      assert.ok(false, this.step);
    })
    .given('the config does not specify the @notRun annotation', function() {
      assert.ok(false, this.step);
    })
    .when('I look at the test results', function() {
      assert.ok(false, this.step);
    })
    .then('the assert in the given step should not be shown as a failure', function() {
      assert.ok(false, this.step);
    });
}
