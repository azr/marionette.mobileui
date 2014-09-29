define([
  'marionette',
  'hbs!templates/panels/content'
],
function (Marionette, template) {
  'use strict';

  return Marionette.ItemView.extend({
    template: template,

    ui: {
      iconLeft: '.icon-bars',
      iconRight: '.icon-more-vertical'
    },

    events: {
      'click @ui.iconLeft': 'showLeftPanel',
      'click @ui.iconRight': 'showRightPanel'
    },

    showLeftPanel: function (e) {
      e.stopImmediatePropagation();
      this.trigger('panel:show', 'left');
    },

    showRightPanel: function (e) {
      e.stopImmediatePropagation();
      this.trigger('panel:show', 'right');
    }
  });
});
