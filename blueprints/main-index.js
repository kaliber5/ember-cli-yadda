module.exports = {
  name: 'ember-cli-yadda',
  description: 'ember-cli-yadda',
  normalizeEntityName: function() {
  },
  afterInstall: function() {
    this.addAddonToProject('ember-browserify');
  }
};
