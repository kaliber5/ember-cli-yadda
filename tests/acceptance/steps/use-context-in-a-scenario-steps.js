import steps from './steps';

// step definitions that are shared between features should be moved to the
// tests/acceptance/steps/steps.js file

export default function(assert) {
  return steps(assert)
    .given('I add something to the context', function(next) {
      this.ctx.something = 'there';
      assert.ok(true, this.step);
      next();
    })
    .then('it should be there in the next step', function(next) {
      assert.equal(this.ctx.something, 'there', this.step);
      next();
    });
}
