define([
  'marionette',
  'marionette.mobileui',
  'hbs!templates/panels',
  'views/panels/content',
  'views/panels/left',
  'views/panels/right'
],
function (Marionette, ui, template, ContentView, LeftView, RightView) {
  'use strict';

  return ui.views.Panels.extend({
    template: template,
    className: 'fullscreen',

    onDomRefresh: function () {
      this.content.show(new ContentView());
      this.left.show(new LeftView());
      this.right.show(new RightView());

      this.content.currentView.on('panel:show', this.showPanel, this);
      this.right.currentView.on('panel:close', this.closePanel, this);
    },

    // only for illustration purpose
    onShowPanel: function (name) {
      console.log('onShowPanel', name);
    },

    onClosePanel: function () {
      console.log('onClosePanel');
    }

  });
});
