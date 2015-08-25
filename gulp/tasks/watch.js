var config = require('../config')
var gulp = require('gulp')
var testTaskFactory = require('./test')


gulp.task('watch', ['default','watchify'], function() {
  gulp.watch([config.files.js], testTaskFactory({
    development: true
  }))

  gulp.watch([config.files.stylus], ['stylus'])
})