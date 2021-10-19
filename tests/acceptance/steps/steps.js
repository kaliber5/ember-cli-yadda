import yadda from 'yadda';
import { visit } from '@ember/test-helpers';

export default function (assert) {
  return yadda.localisation.default
    .library()
    .given('I type "Ember g feature make-feature"', async function () {
      await visit('/');
      assert.ok(true, this.step);
    })
    .when('I look in the folder', function () {
      assert.ok(true, this.step);
    });
}
