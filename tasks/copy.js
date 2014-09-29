module.exports = {
  example: {
    files: [{
      src: 'dist/<%= pkg.name.replace(/.js$/, "") %>.js',
      dest: 'examples/scripts/<%= pkg.name.replace(/.js$/, "") %>.js'
    }]
  }
};
