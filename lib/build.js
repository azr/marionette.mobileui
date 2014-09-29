define([
  'marionette'
], function (Marionette) {
  'use strict';

  var mobileui = {};

  // @include ./scripts/panels/index.js
  mobileui.Panels = Panels;

  // attach to marionette
  Marionette.mobileui = mobileui;

  return mobileui;
});
