var Panels = Marionette.LayoutView.extend({
  regions: {
    left: '.panel--left',
    right: '.panel--right',
    content: '.panel--content'
  },

  panelActiveClass: 'active',
  swipeablePanels: ['left', 'right'],

  initialize: function () {
    this.addEventListeners();
  },

  addEventListeners: function () {
    var regions = this.regionManager.getRegions();
    var method = _.bind(this.closePanel, this);
    for (var name in regions) {
      this.listenTo(regions[name], 'panel:close', method);
    }
  },

  showLeftPanel: function () {
    this.showPanel('left');
  },

  showRightPanel: function () {
    this.showPanel('right');
  },

  showPanel: function (name) {
    // invalid regions
    if (!this.regions[name]) {
      return;
    }

    this.triggerMethod('before:show:panel', name);

    // hide currentPanel if not
    if (this.currentPanel) {
      this.currentPanel.$el.toggleClass(this.panelActiveClass);
    }

    var region = this.regionManager.get(name);
    region.$el.toggleClass('active');
    this.currentPanel = region;

    var method = _.bind(this.closePanel, this);
    this.content.$el.one('click', method);
    this.triggerMethod('show:panel', name);
  },

  closePanel: function () {
    if (!this.currentPanel) {
      return;
    }
    this.triggerMethod('before:close:panel');
    this.currentPanel.$el.toggleClass(this.panelActiveClass);
    this.currentPanel = null;
    this.triggerMethod('close:panel');
  }
});

Panels.triggerMethod = Marionette.triggerMethod;
