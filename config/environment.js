/*jshint node:true*/
'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    //merged with the consuming application's ENV
    yadda: {
      language: 'English'
    },
    browserify: {
      tests: true
    }
 };
};
