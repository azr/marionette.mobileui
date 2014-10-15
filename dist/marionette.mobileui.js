/*! marionette.mobileui - v0.2.0
 *  Release on: 2014-10-15
 *  Copyright (c) 2014 Stéphane Bachelier
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
        this.currentPanel.$el.toggleClass(this.panelActiveClass);
      }
  
      // add classes
      this.$el.toggleClass(this.panelOpenedClass);
  
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
      this.$el.toggleClass(this.panelOpenedClass);
      this.currentPanel.$el.toggleClass(this.panelActiveClass);
      this.currentPanel = null;
      this.triggerMethod('close:panel');
    }
  });
  
  Panels.triggerMethod = Marionette.triggerMethod;
  
  ui.views.Panels = Panels;

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
