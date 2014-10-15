var Overlay = Marionette.ItemView.extend({
  template: false,
  className: 'fullscreen--overlay',

  events: {
    click: 'onClick'
  },

  onClick: function () {
    this.trigger('click');
    this.destroy();
  }
});
