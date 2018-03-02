import ENV from '../../config/environment';
import { skip } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

// this logic could be anything, but in this case...
// if @ignore, then return skip (for backwards compatibility)
// if no annotations are set in the config, run everything without an annotation (for backwards compatibility)
// if have annotations in config, then only run those that have a matching annotation
function checkAnnotations(annotations) {

  // if ignore is set then we want to skip for backwards compatibility
  if (annotations.ignore) {
    return ignoreIt;
  }

  // if have annotations set in config, the only run those that have a matching annotation
  if (ENV.annotations && ENV.annotations.length >= 0) {

    for (let annotation in annotations) {
      if (ENV.annotations.indexOf(annotation) >= 0) {
        // have match, so test it
        return 'testIt';  // return something other than a function
      }
    }

    // no match, so don't run it
    return logIt;

  } else {
    // no annotations set, so run it for backwards compatibility
    // unless it has annotations, then don't run it
    if (Object.keys(annotations).length) {
      // has annotation, so don't run it
      return logIt;
    } else {
      // no annotations, so test it
      return 'testIt';  // return something other than a function
    }
  }
}

// call back functions
function ignoreIt(testElement) {
  skip(`${testElement.title}`, function(/*assert*/) {});
}

function logIt(testElement) {
  console.info(`Not running or skipping: "${testElement.title}"`); // eslint-disable-line no-console
}

// exported functions
function runFeature(annotations) {
  return checkAnnotations(annotations);
}

function runScenario(featureAnnotations, scenarioAnnotations) {
  return checkAnnotations(scenarioAnnotations);
}

function setupFeature(featureAnnotations) {
  return setupApplicationTest;
}

function setupScenario(featureAnnotations, scenarioAnnotations) {

}

export {
  runFeature,
  runScenario,
  setupFeature,
  setupScenario
};
