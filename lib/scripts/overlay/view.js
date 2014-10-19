var Overlay = Marionette.ItemView.extend({
  template: false,
  className: 'ui_fullscreen--overlay',

  triggers: {
    click: 'click'
  },

  onClick: function () {
    this.destroy();
  }
});
