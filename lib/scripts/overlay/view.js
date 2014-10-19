var Overlay = Marionette.ItemView.extend({
  template: false,
  className: 'fullscreen--overlay',

  triggers: {
    click: 'click'
  },

  onClick: function () {
    this.destroy();
  }
});
