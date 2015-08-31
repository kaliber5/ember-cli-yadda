module.exports = {
  description: 'Adds a feature to the project',
  locals: function(options) {
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
};
