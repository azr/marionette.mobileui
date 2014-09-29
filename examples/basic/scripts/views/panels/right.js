define([
  'marionette',
  'hbs!templates/panels/right'
],
function (Marionette, template) {
  'use strict';

  return Marionette.LayoutView.extend({
    template: template,

    ui: {
      icon: '.icon-left-nav'
    },

    events: {
      'click @ui.icon': 'closePanel'
    },

    closePanel: function (e) {
      e.stopImmediatePropagation();
      this.trigger('panel:close');
    }
  });
});
