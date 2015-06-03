var gulp = require('gulp');
var jshint = require('gulp-jshint');
var watch = require('gulp-watch');
var util = require('gulp-util');
var config = require('./gulp.config.json');

var env = util.env;
var colors = util.colors;
var log = util.log;

gulp.task('clean', function(cb){
  var rimraf = require('rimraf');
  rimraf(config.build, cb);
});

gulp.task('lint', function() {
  return gulp.src(config.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('server', ['lint'], function(){
  var sources = [
    config.server+ '**/*.*',
    "!"+config.server_tests+'**/*.*'
  ];

  gulp.src(sources)
  .pipe(gulp.dest(config.build +'/server/'));

});

gulp.task('client', ['lint'], function(){
  var sources = [
    config.client+ '**/*.*',
    "!"+config.client_tests+'**/*.*'
  ];

  gulp.src(sources)
  .pipe(gulp.dest(config.build +'/client/'));
});

gulp.task('build', ['client', 'server'], function(){
  //gulp.src(config.server + '**/*.*')
});

gulp.task('watch', function(){
  gulp.watch(config.js, ['lint']);
});

gulp.task('default', ['watch', 'build']);
