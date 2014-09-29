/*! marionette.mobileui - v0.1.0
 *  Release on: 2014-09-29
 *  Copyright (c) 2014 Stéphane Bachelier
 *  Licensed MIT */
define([
  'marionette'
], function (Marionette) {
  'use strict';

  var mobileui = {};

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
  
      // hide currentPanel if not
      if (this.currentPanel) {
        this.currentPanel.$el.toggleClass(this.panelActiveClass);
      }
  
      var region = this.regionManager.get(name);
      region.$el.toggleClass('active');
      this.currentPanel = region;
  
      var method = _.bind(this.closePanel, this);
      this.content.$el.one('click', method);
    },
  
    closePanel: function () {
      if (!this.currentPanel) {
        return;
      }
      this.currentPanel.$el.toggleClass(this.panelActiveClass);
      this.currentPanel = null;
    }
  });
  
  mobileui.Panels = Panels;

  // attach to marionette
  Marionette.mobileui = mobileui;

  return mobileui;
});
