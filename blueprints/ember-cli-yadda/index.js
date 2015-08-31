module.exports = {
  description: '',
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall: function() {
      var addonContext = this;

      return this.addBowerPackagesToProject([
        { name: 'yadda',           source: 'acuminous/yadda',                     target: '~0.15.1' },
      ]);
    }
};
