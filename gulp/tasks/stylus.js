var config = require('../config')
var gulp = require('gulp')
  , stylus = require('gulp-stylus')
  , nib = require('nib')
  , rename = require('gulp-rename')
  , minifyCss = require('gulp-minify-css')

gulp.task('stylus', function(){
  return gulp.src(config.entryFiles.stylus)
    .on('error', function(){
      console.log( 'stylus error' )
      this.emit('end')
    })
    .pipe(stylus({use: [nib()]}))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename(config.files.module + '.css'))
    .pipe(gulp.dest(config.files.dist))
    .pipe(gulp.dest(config.files.example+'/css'))

})
