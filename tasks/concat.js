module.exports = {
  options: {
    banner: '<%= banner %>',
    stripBanners: true
  },
  js: {
    src: 'dist/<%= pkg.name.replace(/.js$/, "") %>.js',
    dest: 'dist/<%= pkg.name.replace(/.js$/, "") %>.js'
  },
  css: {
    src: '.tmp/styles/*.css',
    dest: 'dist/<%= pkg.name.replace(/.js$/, "") %>.css'
  }
};
