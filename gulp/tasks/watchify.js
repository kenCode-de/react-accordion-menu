var gulp = require('gulp')

var buildTaskFactory = require('./build')

gulp.task('watchify', function(){
  return buildTaskFactory({
    development: true
  })
})