import yadda from 'yadda';

export default function (assert) {
  return yadda.localisation.default
    .library()
    .given('I type "Ember g feature make-feature"', function () {
      assert.ok(true, this.step);
    })
    .when('I look in the folder', function () {
      assert.ok(true, this.step);
    });
}
