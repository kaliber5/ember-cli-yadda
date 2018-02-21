import steps from './steps';

// step definitions that are shared between features should be moved to the
// tests/acceptance/steps/steps.js file

export default function(assert) {
  return steps(assert)
  .given('this scenario will not be run', function() {
    assert.ok(false, this.step);
  })
  .given('this scenario has annotation @acceptance', function() {
    assert.ok(true, this.step);
  })
  .given('the config specifies the @acceptance annotation', function() {
    assert.ok(true, this.step);
  })
  .when('I look at the test results', function() {
    assert.ok(true, this.step);
  })
  .then('the assert in the given step should not be shown as a failure', function() {
    assert.ok(false, this.step);
  })
  .then('the assert in the given step should be shown as a success', function() {
    assert.ok(true, this.step);
  });
}
