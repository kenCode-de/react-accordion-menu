var config = require('../config')
var gulp = require('gulp')

gulp.task('watch', ['default'], function() {
  gulp.watch(config.paths.test, ['test'])
})