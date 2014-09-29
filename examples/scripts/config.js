var config = function (baseUrl, entryPoint) {
  'use strict';

  require.config({
    baseUrl: baseUrl,
    paths: {
      jquery: '../../bower_components/jquery/dist/jquery',
      backbone: '../../bower_components/backbone/backbone',
      underscore: '../../bower_components/underscore/underscore',
      'handlebars.runtime': '../../bower_components/handlebars/handlebars.runtime.amd',
      marionette: '../../bower_components/backbone.marionette/lib/core/backbone.marionette',
      'backbone.babysitter': '../../bower_components/backbone.babysitter/lib/backbone.babysitter',
      'backbone.wreqr': '../../bower_components/backbone.wreqr/lib/backbone.wreqr',
      hbs: '../../bower_components/require-handlebars-plugin/hbs',
      text: '../../bower_components/requirejs-text/text',
      json: '../../bower_components/requirejs-plugins/src/json',
      'marionette.mobileui': '../../scripts/marionette.mobileui'
    },
    // default
    hbs: {}
  });

  // load main entry point and we do not care about callback
  require([entryPoint]);
};
