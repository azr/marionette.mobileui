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
