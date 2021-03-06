/*! marionette.mobileui - v0.4.3
 *  Release on: 2015-03-01
 *  Copyright (c) 2015 Stéphane Bachelier
 *  Licensed MIT */
define([
  'marionette'
], function (Marionette) {
  'use strict';

  var ui = {
    views: {},
    helpers: {}
  };

  var Panels = Marionette.LayoutView.extend({
    className: 'ui_panels',
  
    regions: {
      left: '.ui_panel--left',
      right: '.ui_panel--right',
      main: '.ui_panel--main'
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
  
    showMainPanel: function () {
      this.showPanel('main');
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
  
      // var method = _.bind(this.closePanel, this);
      // this.main.$el.one('click', method);
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
  
  ui.views.Panels = Panels;

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
  
  ui.views.Overlay = Overlay;

  var overlay = function ($el, options) {
    var method = options && options.method ? options.method : 'append';
    var className = Overlay.prototype.className;
  
    // augment overlay view prototype
    if (options && options.className) {
      className += ' ' + options.className;
    }
  
    // check if the given `method` is a valid jQuery method. No check is made to only use
    // DOM operation to simplify this method.
    var action = $el[method] ? method : 'append'; // default to append
  
    var overlay = new Overlay({className: className});
  
    $el[action](overlay.render().$el);
    return overlay;
  };
  
  ui.helpers.overlay = overlay;

  // attach to marionette
  Marionette.mobileui = ui;

  return ui;
});
