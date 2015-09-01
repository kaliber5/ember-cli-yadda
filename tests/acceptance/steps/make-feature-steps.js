import steps from './steps';

export default function(assert) {
  return steps(assert)
    .then('I should find a file', function(next) {
      assert.ok(true, this.step);
      next();
    });
}
