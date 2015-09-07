module.exports = {
  description: 'Adds a feature to the project',
  locals: function(options) {
    console.log(options);
    return {
      featureName: options.entity.name.replace(/-/g, ' ')
    };
  }

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  // afterInstall: function(options) {
  //   // Perform extra work here.
  // }
  // https://github.com/ember-cli/ember-cli/blob/34789821fe7e132812f9fb6809b2969be98cd977/lib/models/blueprint.js
  fileMapTokens: function(options) {
    return {
      __token__ : {}
    }
  }
};
