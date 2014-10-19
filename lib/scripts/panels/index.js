var Panels = Marionette.LayoutView.extend({
  className: 'ui_panels',

  regions: {
    left: '.ui_panel--left',
    right: '.ui_panel--right',
    content: '.ui_panel--content'
  },

  panelOpenedClass: 'ui_panel--opened',  // to mark that one panel is opened
  panelActiveClass: 'active',         // to animage open panel
  swipeablePanels: ['left', 'right'],

  initialize: function () {
    this.addEventListeners();
  },

  addEventListeners: function () {
    var regions = this.regionManager.getRegions();
    var events = {
      'panel:close': _.bind(this.closePanel, this),
      show: _.bind(this.onRegionInjection, this)
    };

    for (var name in regions) {
      for (var event in events) {
        this.listenTo(regions[name], event, events[event]);
      }
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
    var region = this.regionManager.get(name);

    var isDifferentView = this.currentPanel || this.currentPanel !== region;

    // hide currentPanel if not
    if (this.currentPanel && isDifferentView) {
      this.currentPanel.$el.removeClass(this.panelActiveClass);
    }

    // add classes
    this.$el.addClass(this.panelOpenedClass);

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
  },

  // trigger if a view has been injected in a region which means that an
  // operation `region.show(view)` has been made.
  onRegionInjection: function (region) {
    this.triggerMethod('region:show', region);
  }
});

Panels.triggerMethod = Marionette.triggerMethod;
