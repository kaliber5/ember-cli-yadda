import yadda from '../../../helpers/yadda';

export default function(assert) {
  return yadda.localisation.English.library()
    .then('I should see the text "$text"', function(text) {
      assert.equal(this.element.textContent.trim(), text);
    });
}
