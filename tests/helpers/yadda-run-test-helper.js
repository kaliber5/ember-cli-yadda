import ENV from '../../config/environment';

// this logic could be anything, but in this case...
// if ENV annotation all is true, then only run tests that have no other annotation
// if ENV annotation all is false, then only run tests that have the smoke annotation
function checkAnnotations(annotations) {

  if (ENV.annotations.all) {
    if (annotations.smoke) {
      return false;
    } else {
      return true;
    }
  }

  if (ENV.annotations.smoke) {
    if (annotations.smoke) {
      return true;
    } else {
      return false;
    }
  }

  // don't run if if none of the above apply
  return false;
}

function runFeature(annotations) {
  return checkAnnotations(annotations);
}

function runScenario(annotations) {
  return checkAnnotations(annotations);
}

export { runFeature, runScenario };
