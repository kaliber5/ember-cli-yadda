module.exports = {
  description: 'Adds a feature to the project',

  locals: function(options) {
    return {
      // normalizedEntityName has been dasherized, featureName removes the dashes.
      featureName: options.entity.name.replace(/-/g, ' '),
      // lose the last section of the path /folder1/folder2/featureName
      // dasherize if path contains any spaces
      // do not forget the trailing slash
      folder: options.args[1].split('/').slice(0, -1).join('/').replace(/\s/g, '-') + '/',
      // relative path to go back up to the tests/acceptance/steps folder
      foldersUp: (function () {
        var path = options.args[1].split('/').slice(0, -1).join('/');
        if (path === '') {
          return './';
        }
        return (path + '/').replace(/.+?\//g, '../');
      }())
    };
  },

  normalizeEntityName: function(name) {
    // use the last section of the path /folder1/folder2/featureName
    // featureName can contain spaces when the arg is enclosed by quotes
    return name.split('/').pop().replace(/\s/g, '-');
  },

  fileMapTokens: function(options) {
    return {
      __folder__: function(options) {
        return options.locals.folder;
      }
    };
  }
};
