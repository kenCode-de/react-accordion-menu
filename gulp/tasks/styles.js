var config = require('../config')
var gulp = require('gulp')
  , stylus = require('gulp-stylus')
  , nib = require('nib')
  , rename = require('gulp-rename')

gulp.task('styles', function(){
  return gulp.src(config.entryFiles.stylus)
    .on('error', function(){
      console.log( 'stylus error' )
      this.emit('end')
    })
    .pipe(stylus({use: [nib()]}))
    .pipe(rename(config.files.module + '.css'))
    .pipe(gulp.dest(config.files.dist))
})
