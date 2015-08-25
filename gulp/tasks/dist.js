var config = require('../config')
var gulp = require('gulp')

var buildTaskFactory = require('./build')

gulp.task('dist', ['stylus'], function(){
  return buildTaskFactory({
    dist: true
  })
})
