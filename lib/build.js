define([
  'marionette'
], function (Marionette) {
  'use strict';

  var ui = {
    views: {},
    helpers: {}
  };

  // @include ./scripts/panels/index.js
  ui.views.Panels = Panels;

  // @include ./scripts/overlay/view.js
  ui.views.Overlay = Overlay;

  // @include ./scripts/overlay/helper.js
  ui.helpers.overlay = overlay;

  // attach to marionette
  Marionette.mobileui = ui;

  return ui;
});
