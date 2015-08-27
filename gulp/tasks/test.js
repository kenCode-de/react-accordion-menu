var config = require('../config')
var gulp = require('gulp')
var karma = require('gulp-karma')

var development = false

function task(){
  return gulp.src(config.files.test)
    .pipe(karma({
      configFile: process.cwd() + '/karma.conf.js',
      action: development ? 'watch' : 'run'
    }))
    .on('error', function(err) {
      this.emit('end')
      if( !development ){
        throw err
      }
    })
}

function taskFactory(options){
  development = options.development
  return task()
}

gulp.task('test', task)

module.exports = taskFactory