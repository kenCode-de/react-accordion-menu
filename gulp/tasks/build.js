var config = require('../config')
var gulp = require('gulp')
  , gutil = require('gulp-util')
  , gulpif = require('gulp-if')
  , browserify = require('browserify')
  , watchify = require('watchify')
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
      cache: {}, packageCache: {}, fullPaths: true
    })

browserifyStream.exclude('react')

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
  console.log( '-- development', development )
  console.log( '-- dist', dist )
  return browserifyStream.bundle()
    .on('error', function(err){
      gutil.log('Browserify Error')
      gutil.log(err.message)
      this.emit('end')
      if( !development ){
        throw err
      }
    })
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(gulpif(dist === true, uglify()))
    .pipe(gulp.dest(config.files.dist))
}

gulp.task('build', task)

module.exports = taskFactory