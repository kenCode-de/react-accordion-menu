var config = require('../config')
var gulp = require('gulp')

gulp.task('watch', ['default','watchify'], function() {
  gulp.watch(config.files.test, ['test'])
})