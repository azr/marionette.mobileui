module.exports = {
  options: {
    banner: '<%= banner %>',
    stripBanners: true,
    keepSpecialComments: 0
  },
  css: {
    src: '<%= concat.css.dest %>',
    dest: 'dist/<%= pkg.name.replace(/.js$/, "") %>.min.css'
  }
};
