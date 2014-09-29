module.exports = {
  example: {
    files: [{
      src: 'dist/<%= pkg.name.replace(/.js$/, "") %>.js',
      dest: 'examples/scripts/<%= pkg.name.replace(/.js$/, "") %>.js'
    }, {
      src: 'dist/<%= pkg.name.replace(/.js$/, "") %>.css',
      dest: 'examples/styles/<%= pkg.name.replace(/.js$/, "") %>.css'
    }]
  }
};
