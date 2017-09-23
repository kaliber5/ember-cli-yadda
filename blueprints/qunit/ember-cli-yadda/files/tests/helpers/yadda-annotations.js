import ENV from '../../config/environment';

// this logic could be anything, but in this case...
// if @ignore, then return skip (for backwards compatibility)
// if no annotations are set in the config, run everything without an annotation (for backwards compatibility)
// if have annotations in config, then only run those that have a matching annotation
function checkAnnotations(annotations) {

  // if ignore is set then we want to skip for backwards compatibility
  if (annotations.ignore) {
    return 'skip';
  }

  // if have annotations set in config, the only run those that have a matching annotation
  if (ENV.annotations && ENV.annotations.length >= 0) {

    for (let annotation in annotations) {
      if (ENV.annotations.indexOf(annotation) >= 0) {
        // have match, so run it
        return 'test';
      }
    }

    // no match, so don't run it
    return false;

  } else {
    // no annotations set, so run it for backwards compatibility
    // unless it has annotations, then don't run it
    if (Object.keys(annotations).length) {
      // has annotation, so don't run it
      return false;
    } else {
      // no annotations, so run it
      return 'test';
    }

  }

}

function runFeature(annotations) {
  return checkAnnotations(annotations);
}

function runScenario(featureAnnotations, scenarioAnnotations) {
  return checkAnnotations(scenarioAnnotations);
}

export { runFeature, runScenario };
