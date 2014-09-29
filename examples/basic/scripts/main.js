require([
  'marionette',
  './views/panels'
], function (Marionette, Panels) {
  var app = new Marionette.Application();

  app.addRegions({
    container: '.content'
  });

  app.addInitializer(function () {
    app.container.show(new Panels());
  });

  app.start();
});
