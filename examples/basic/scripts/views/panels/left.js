define([
  'marionette',
  'hbs!templates/panels/left'
],
function (Marionette, template) {
  'use strict';

  return Marionette.LayoutView.extend({
    template: template
  });
});
