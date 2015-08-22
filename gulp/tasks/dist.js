var config = require('../config')
var gulp = require('gulp')

var buildTaskFactory = require('./build')

gulp.task('dist', function(){
  return buildTaskFactory({
    dist: true
  })
})
