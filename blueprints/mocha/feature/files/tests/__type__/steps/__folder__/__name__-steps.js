import steps from '<%= foldersUp %>steps';
import { expect } from 'chai';

// step definitions that are shared between features should be moved to the
// tests/acceptance/steps/steps.js file

export default function() {
  return steps()
    .then('I should find a file', function() {
      expect(true, this.step).to.be.true;
    });
}
