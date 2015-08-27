var config = require('../config')
var gulp = require('gulp')
  , gutil = require('gulp-util')
  , gulpif = require('gulp-if')
  , rename = require('gulp-rename')
  , browserify = require('browserify')
  , watchify = require('watchify')
  , reactify = require('reactify')
  , browserifyShim = require('browserify-shim')
  , source = require('vinyl-source-stream')
  , buffer = require('vinyl-buffer')
  , uglify = require('gulp-uglify')
  , package = require('../../package.json')

var development = undefined
var dist = undefined
var browserifyStream = browserify({
      entries: config.entryFiles.main,
      insertGlobals: false,
      // watchify requires these options
      cache: {}, packageCache: {}, fullPaths: false
    })

browserifyStream.transform(reactify)
browserifyStream.transform(browserifyShim)
browserifyStream.external('react')

browserifyStream.on('log', gutil.log)


function task(){
  if( development === true ){
    browserifyStream = watchify(browserifyStream)
    browserifyStream.on('update', bundle)
  }
  return bundle()
}

function taskFactory(options){
  development = options.development
  dist = options.dist
  return task()
}

function bundle(){
  return browserifyStream.bundle()
    .on('error', function(err){
      gutil.log('Browserify Error')
      gutil.log(err.message)
      this.emit('end')
      if( !development ){
        throw err
      }
    })
    .pipe(source(config.files.module+'.js'))
    .pipe(buffer())
    .pipe(gulp.dest(config.files.dist))
    .pipe(gulp.dest(config.files.example+'/js'))
    .pipe(uglify())
    .pipe(rename(config.files.module+'.min.js'))
    .pipe(gulp.dest(config.files.dist))
    .pipe(gulp.dest(config.files.example+'/js'))

}

gulp.task('build', task)

module.exports = taskFactory
