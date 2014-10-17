var Panels = Marionette.LayoutView.extend({
  regions: {
    left: '.panel--left',
    right: '.panel--right',
    content: '.panel--content'
  },

  panelOpenedClass: 'panel--opened',  // to mark that one panel is opened
  panelActiveClass: 'active',         // to animage open panel
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
      this.currentPanel.$el.removeClass(this.panelActiveClass);
    }

    // add classes
    this.$el.addClass(this.panelOpenedClass);

    var region = this.regionManager.get(name);
    region.$el.addClass('active');
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
    this.$el.removeClass(this.panelOpenedClass);
    this.currentPanel.$el.removeClass(this.panelActiveClass);
    this.currentPanel = null;
    this.triggerMethod('close:panel');
  }
});

Panels.triggerMethod = Marionette.triggerMethod;
