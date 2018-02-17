import steps from './steps';

// step definitions that are shared between features should be moved to the
// tests/acceptance/steps/steps.js file

export default function(assert) {
  return steps(assert)
  .given('this scenario will not be run', function(next) {
    assert.ok(false, this.step);
    next();
  })
  .given('this scenario has annotation @acceptance', function(next) {
    assert.ok(true, this.step);
    next();
  })
  .given('the config specifies the @acceptance annotation', function(next) {
    assert.ok(true, this.step);
    next();
  })
  .when('I look at the test results', function(next) {
    assert.ok(true, this.step);
    next();
  })
  .then('the assert in the given step should not be shown as a failure', function(next) {
    assert.ok(false, this.step);
    next();
  })
  .then('the assert in the given step should be shown as a success', function(next) {
    assert.ok(true, this.step);
    next();
  });
}
