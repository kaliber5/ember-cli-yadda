import steps from '<%= foldersUp %>steps';

// step definitions that are shared between features should be moved to the
// tests/acceptance/steps/steps.js file

export default function() {
  return steps()
    .then('I should find a file', function(next) {
      // Add your own assert library
      next();
    });
}
