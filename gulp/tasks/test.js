var config = require('../config')
var gulp = require('gulp')
var karma = require('gulp-karma')

function test(done){
  return gulp.src(config.paths.test)
    .pipe(karma({
      configFile: process.cwd() + '/karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      this.emit('end')
      throw err
    })
}

gulp.task('test', test)

module.exports = test